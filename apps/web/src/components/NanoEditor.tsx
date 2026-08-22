'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { apiClient } from '../lib/api';
import { FileText, Save, Trash2, Calendar, Lock, Unlock, ShieldAlert, Sparkles, Loader2, Plus, ChevronRight, CornerDownRight, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function NanoEditor() {
  const { 
    activeWorkspace, 
    activeNano, 
    isCreatingNewNano,
    initialNewNanoTitle,
    createNano,
    cancelNewNanoCreation,
    updateNano, 
    deleteNano, 
    fetchApprovals,
    selectNano,
    selectWorkspace
  } = useWorkspace();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  // 하위 문서 (Child Nano) 관리 State
  const [childNanos, setChildNanos] = useState<any[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(false);
  const [newChildTitle, setNewChildTitle] = useState('');
  const [creatingChild, setCreatingChild] = useState(false);

  // 결재 상신 모달 상태 (MEMBER 전용 가드)
  const [isApprModalOpen, setIsApprModalOpen] = useState(false);
  const [apprTitle, setApprTitle] = useState('');
  const [apprOpinion, setApprOpinion] = useState('');
  const [submittingAppr, setSubmittingAppr] = useState(false);

  const isOwner = activeWorkspace?.role === 'OWNER' || activeWorkspace?.role === 'ADMIN';

  const fetchChildren = useCallback(async () => {
    if (!activeWorkspace || !activeNano) return;
    setLoadingChildren(true);
    try {
      const res = await apiClient.nanos.listChild(activeWorkspace.id, activeNano.id);
      const childList = Array.isArray(res.data) 
        ? res.data 
        : (res.data?.nanos || res.data?.nanoList || res.data?.items || []);
      setChildNanos(childList.map((n: any) => ({
        id: n.nanoId || n.id,
        title: n.title,
        type: n.type,
        createdAt: n.createdAt,
      })));
    } catch (err) {
      console.error('Failed to load child nanos:', err);
    } finally {
      setLoadingChildren(false);
    }
  }, [activeWorkspace, activeNano]);

  useEffect(() => {
    if (activeNano) {
      setTimeout(() => {
        setTitle(activeNano.title);
        setContent(activeNano.content || '');
        setIsEditMode(false);
        setIsApprModalOpen(false);
        
        if (activeWorkspace) {
          fetchChildren();
        }
      }, 0);
    } else {
      setTimeout(() => {
        setTitle('');
        setContent('');
      }, 0);
    }
  }, [activeNano, activeWorkspace, fetchChildren]);

  const handleCreateChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildTitle.trim() || !activeWorkspace || !activeNano) return;
    
    setCreatingChild(true);
    try {
      await apiClient.nanos.create(activeWorkspace.id, {
        type: 'PAGE',
        title: newChildTitle.trim(),
        content: { blockStyle: 'default', markdown: '' },
        parentNanoId: activeNano.id,
      });
      setNewChildTitle('');
      await fetchChildren();
      await selectWorkspace(activeWorkspace.id);
    } catch (err) {
      console.error(err);
      alert('하위 문서 생성에 실패했습니다.');
    } finally {
      setCreatingChild(false);
    }
  };

  const handleSaveClick = async () => {
    if (!activeWorkspace || !activeNano) return;

    if (isOwner) {
      // OWNER: 즉각적인 다이렉트 수정 저장
      setSaving(true);
      try {
        await updateNano(activeNano.id, title, content);
        setIsEditMode(false);
        alert('문서가 즉시 업데이트되었습니다.');
      } catch (_err) {
        alert('저장에 실패했습니다.');
      } finally {
        setSaving(false);
      }
    } else {
      // 일반 MEMBER: 결재 상신 모달 오픈
      setApprTitle(`[수정 상신] ${activeNano.title} -> ${title}`);
      setApprOpinion('');
      setIsApprModalOpen(true);
    }
  };

  const handleApprSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeWorkspace || !activeNano) return;

    setSubmittingAppr(true);
    try {
      await apiClient.workflows.createApproval(activeWorkspace.id, activeNano.id, {
        title: title, // 수정제안 문서 새 제목
        content: { blockStyle: 'default', markdown: content || '' }, // 수정 제안된 문서 본문 스냅샷 수록
        comment: apprOpinion || '문서 수정 결재 요청',
      });
      await fetchApprovals();
      setIsApprModalOpen(false);
      setIsEditMode(false);
      alert('문서 수정 제안이 최고 관리자(OWNER)의 결재선으로 성공적으로 상신되었습니다.');
    } catch (_err) {
      alert('결재 요청 상신에 실패했습니다.');
    } finally {
      setSubmittingAppr(false);
    }
  };

  const handleDelete = async () => {
    if (!activeWorkspace || !activeNano) return;
    if (confirm('이 문서를 완전히 삭제하시겠습니까? 하위 문서와의 부모 연결도 해제됩니다.')) {
      try {
        await deleteNano(activeNano.id);
        alert('문서가 삭제되었습니다.');
      } catch (_err) {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    if (isCreatingNewNano) {
      setTimeout(() => {
        setTitle(initialNewNanoTitle || '');
        setContent('');
      }, 0);
    }
  }, [isCreatingNewNano, initialNewNanoTitle]);

  const handleCreateNewNanoSubmit = async () => {
    if (!title.trim()) {
      alert('문서 제목을 입력해 주세요.');
      return;
    }
    setSaving(true);
    try {
      await createNano(title.trim(), content, null);
      alert('새 문서가 성공적으로 생성 및 저장되었습니다.');
    } catch (_err) {
      alert('문서 생성에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (isCreatingNewNano) {
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-background h-full">
        {/* Creation Header Toolbar */}
        <div className="p-4 border-b border-luminano-border flex justify-between items-center shadow-xs bg-luminano-point z-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h2 className="text-base font-bold text-foreground">
              ✨ 새 Nano 문서 작성 에디터
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={cancelNewNanoCreation}
              className="px-3 py-1.5 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-lg text-xs font-semibold transition cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={handleCreateNewNanoSubmit}
              disabled={saving}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition shadow-md flex items-center gap-2 cursor-pointer border-0"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              문서 생성 및 저장
            </button>
          </div>
        </div>

        {/* Creation Editor Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              문서 제목 <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              placeholder="문서 제목을 입력하세요 (예: 2026년 3분기 사업 기안서)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-sm font-bold text-slate-100 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              문서 본문 내용 (Markdown 지원)
            </label>
            <textarea
              placeholder="문서 초안 내용을 작성하세요... (Markdown 양식을 지원합니다)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={16}
              className="w-full px-4 py-3 bg-slate-900/40 border border-slate-800 rounded-xl text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
            />
          </div>

          <div className="bg-indigo-950/30 border border-indigo-800/40 p-3.5 rounded-xl text-xs text-indigo-300 flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0 text-indigo-400" />
            <span>
              상단 <strong>&lsquo;문서 생성 및 저장&rsquo;</strong> 버튼을 클릭하면 작성하신 제목과 본문이 워크스페이스 DB에 정식 등록 및 보존됩니다.
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!activeNano) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-background">
        <FileText className="w-12 h-12 text-slate-500 mb-3" />
        <h3 className="text-slate-800 dark:text-slate-200 font-bold text-base">선택된 문서가 없습니다</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs mt-1">좌측 사이드바에서 편집하거나 조회할 협업 문서를 골라보세요.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      
      {/* 상단 액션 툴바 */}
      <div className="p-4 border-b border-luminano-border flex justify-between items-center shadow-xs bg-luminano-point z-10">
        <div className="flex items-center gap-3">
          {isEditMode ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-1.5 border border-luminano-border rounded-lg text-sm font-bold bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-luminano-accent"
            />
          ) : (
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-luminano-accent shrink-0" />
              {activeNano.title}
            </h2>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Lock / Unlock 아이콘 전용 토글 버튼 */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`p-2 border rounded-lg transition cursor-pointer flex items-center justify-center ${
              isEditMode 
                ? 'bg-luminano-accent/15 border-luminano-accent text-luminano-accent shadow-xs' 
                : 'bg-background border-luminano-border text-slate-500 hover:text-slate-200 hover:border-slate-600'
            }`}
            title={isEditMode ? '편집 잠금 (읽기 전용 모드 전환)' : '편집 잠금 해제 (수정 모드 전환)'}
          >
            {isEditMode ? (
              <Unlock className="w-4 h-4 text-luminano-accent animate-pulse" />
            ) : (
              <Lock className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {isEditMode && (
            <button
              onClick={handleSaveClick}
              disabled={saving}
              className="px-3.5 py-1.5 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-white dark:text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0 shadow-sm"
            >
              {saving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : isOwner ? (
                <Save className="w-3.5 h-3.5" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5" />
              )}
              {isOwner ? '변경사항 저장' : '수정 승인 요청'}
            </button>
          )}

          {!isEditMode && isOwner && (
            <button
              onClick={handleDelete}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/40 transition cursor-pointer border border-transparent bg-transparent"
              title="문서 삭제"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 에디터 메인 프레임 */}
      <div className="flex-1 overflow-y-auto p-8 max-w-4xl w-full mx-auto flex flex-col gap-6 h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] min-h-0">
        
        {/* 문서 정보 뱃지 메타데이터 */}
        <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400 border-b border-luminano-border pb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-luminano-accent" />
            작성일: {new Date(activeNano.createdAt).toLocaleString()}
          </span>
        </div>

        {/* 편집기 본체 */}
        {isEditMode ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="마크다운 형식으로 새로운 협업 지식을 기입해 주세요..."
            className="flex-1 w-full min-h-[450px] p-6 border border-luminano-border rounded-xl text-sm font-mono bg-luminano-point text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent resize-none leading-relaxed shadow-inner"
          />
        ) : (
          <>
            <div className="bg-luminano-point border border-luminano-border rounded-xl p-8 min-h-[350px] text-sm text-foreground leading-relaxed shadow-sm markdown-body">
              {activeNano.content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {activeNano.content}
                </ReactMarkdown>
              ) : (
                <span className="text-slate-500 italic">문서 본문이 비어있습니다. 편집을 눌러 내용을 기술하십시오.</span>
              )}
            </div>
            
            {/* 하위 문서 목록 및 생성부 */}
            <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4 mt-2">
              <div className="flex justify-between items-center border-b border-luminano-border pb-3">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <CornerDownRight className="w-4 h-4 text-luminano-accent" />
                  하위 문서 (Sub-pages)
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">총 {childNanos.length}개</span>
              </div>
              
              {loadingChildren ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-luminano-accent" />
                </div>
              ) : childNanos.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">연동된 하위 문서가 없습니다.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {childNanos.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => selectNano(child.id)}
                      className="flex items-center justify-between p-3 rounded-lg border border-luminano-border hover:border-luminano-accent bg-background text-left transition cursor-pointer text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-50 text-xs font-bold"
                    >
                      <span className="truncate">{child.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  ))}
                </div>
              )}
              
              <form onSubmit={handleCreateChild} className="flex gap-2 border-t border-luminano-border pt-4 mt-2">
                <input
                  type="text"
                  placeholder="새 하위 문서 제목..."
                  value={newChildTitle}
                  onChange={(e) => setNewChildTitle(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-luminano-border rounded-lg text-xs bg-background text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-luminano-accent"
                />
                <button
                  type="submit"
                  disabled={creatingChild || !newChildTitle.trim()}
                  className="px-3.5 py-1.5 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-white dark:text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1 transition cursor-pointer border-0"
                >
                  {creatingChild ? <Loader2 className="w-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                  추가
                </button>
              </form>
            </div>
          </>
        )}

      </div>

      {/* 일반 MEMBER용 문서 수정 결재 상신 모달 */}
      {isApprModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="w-full max-w-lg bg-luminano-point rounded-xl border border-luminano-border shadow-2xl p-6 flex flex-col gap-4">
            
            <div className="flex justify-between items-center border-b border-luminano-border pb-3">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
                <Sparkles className="w-5 h-5 text-luminano-accent" />
                <h3 className="font-bold text-lg">결재 상신 요청 (수정 가드)</h3>
              </div>
              <button
                onClick={() => setIsApprModalOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 bg-luminano-accent/10 text-luminano-accent border border-luminano-accent/30 rounded-lg text-xs flex gap-2 items-start leading-relaxed font-semibold">
              <ShieldAlert className="w-4 h-4 shrink-0 text-luminano-accent" />
              <span>
                현재 유저님은 일반 MEMBER 권한입니다. 문서 본문의 즉각 편집이 불가능하므로, 변경 제안 사항에 대해 최고 관리자(OWNER)의 승인을 수득하는 결재 요청을 전송합니다.
              </span>
            </div>

            <form onSubmit={handleApprSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">결재 제목 (자동 지정)</label>
                <input
                  type="text"
                  value={apprTitle}
                  onChange={(e) => setApprTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-luminano-border rounded-lg text-xs bg-background text-foreground focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">수정 요청 사유</label>
                <textarea
                  value={apprOpinion}
                  onChange={(e) => setApprOpinion(e.target.value)}
                  placeholder="예: 최신 API 규격 갱신 건으로 기존 문서를 업데이트하고자 상신합니다."
                  rows={4}
                  className="w-full px-3 py-2 border border-luminano-border rounded-lg text-xs bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent resize-none"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3 mt-2 border-t border-luminano-border pt-3">
                <button
                  type="button"
                  onClick={() => setIsApprModalOpen(false)}
                  className="px-4 py-2 border border-luminano-border hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer bg-transparent"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submittingAppr}
                  className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 text-white dark:text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer border-0 disabled:bg-luminano-accent/60"
                >
                  {submittingAppr ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '최종 결재 올리기'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
