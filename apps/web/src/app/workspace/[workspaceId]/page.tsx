'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWorkspace } from '../../../context/WorkspaceContext';
import { useAuth } from '../../../context/AuthContext';
import WorkspaceSettings from '../../../components/WorkspaceSettings';
import UserProfileSettings from '../../../components/UserProfileSettings';
import { LumiNanoLogo } from '../../../components/LumiNanoBrand';
import { apiClient } from '../../../lib/api';

import NanoEditor from '../../../components/NanoEditor';
import WorkflowPanel from '../../../components/WorkflowPanel';
import ChatPanel from '../../../components/ChatPanel';

import MemberManagement from '../../../components/MemberManagement';
import { 
  FileText, MessageSquare, ShieldCheck, Settings, 
  ChevronLeft, ChevronRight, Plus, Folder, Hash, Lock, Loader2, User, Users, GripVertical, AlertTriangle, RefreshCw
} from 'lucide-react';

type Tab = 'doc' | 'approval' | 'chat' | 'settings' | 'profile' | 'members';

export default function WorkspaceDetailView() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const { 
    activeWorkspace, 
    nanos, 
    activeNano,
    channels, 
    approvals,
    selectWorkspace, 
    startNewNanoCreation,
    createChannel,
    selectNano,
    selectChannel,
    loadingWorkspace 
  } = useWorkspace();

  const workspaceId = params.workspaceId as string;

  const [currentTab, setCurrentTab] = useState<Tab>('doc');
  const [newDocTitle, setNewDocTitle] = useState('');
  const [isCreatingDoc, setIsCreatingDoc] = useState(false);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  const [newChannelName, setNewChannelName] = useState('');
  const [isPrivateChannel, setIsPrivateChannel] = useState(false);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);

  // Drag & Drop Nanos 및 트리 접기/펼치기 상태
  const [draggedNanoId, setDraggedNanoId] = useState<string | null>(null);
  const [dragOverTargetId, setDragOverTargetId] = useState<string | null>(null);
  const [dropAsChild, setDropAsChild] = useState<boolean>(false);
  const [orderedNanos, setOrderedNanos] = useState<any[]>([]);
  const [expandedNanos, setExpandedNanos] = useState<Record<string, boolean>>({});
  const [syncTimedOut, setSyncTimedOut] = useState<boolean>(false);

  // 워크스페이스 직접 진입 / 새로고침 시 자동 selectWorkspace 동기화
  useEffect(() => {
    const isSameWorkspace = activeWorkspace && (activeWorkspace.id === workspaceId || activeWorkspace.domain === workspaceId);
    if (workspaceId && !isSameWorkspace) {
      selectWorkspace(workspaceId);
    }
  }, [workspaceId, activeWorkspace?.id, activeWorkspace?.domain, selectWorkspace]);

  // 무한 동기화 방지 6초 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loadingWorkspace || (!activeWorkspace && workspaceId)) {
      timer = setTimeout(() => {
        setSyncTimedOut(true);
      }, 6000);
    } else {
      setTimeout(() => setSyncTimedOut(false), 0);
    }
    return () => clearTimeout(timer);
  }, [loadingWorkspace, activeWorkspace, workspaceId]);

  // nanos 동기화
  useEffect(() => {
    setTimeout(() => setOrderedNanos(nanos), 0);
  }, [nanos]);

  // 미승인 결재 건수 카운트
  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING').length;

  // V 아이콘 토글 및 동적 하위 Nano 로딩
  const handleToggleExpand = async (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    const isCurrentlyExpanded = expandedNanos[docId] !== false;
    setExpandedNanos((prev) => ({ ...prev, [docId]: !isCurrentlyExpanded }));

    if (!isCurrentlyExpanded) {
      const existingChildren = orderedNanos.filter((n) => n.parentNanoId === docId);
      if (existingChildren.length === 0) {
        try {
          const res = await apiClient.nanos.listChild(workspaceId, docId);
          const childList = Array.isArray(res.data) ? res.data : (res.data?.nanoList || res.data?.items || []);
          if (childList.length > 0) {
            const formatted = childList.map((cn: any) => ({
              id: cn.nanoId || cn.id,
              title: cn.title,
              type: cn.type,
              createdAt: cn.createdAt,
              workspaceId,
              content: cn.content || '',
              parentNanoId: docId,
              order: cn.order || 1,
            }));
            setOrderedNanos((prev) => {
              const existingIds = new Set(prev.map((p) => p.id));
              const newItems = formatted.filter((f: any) => !existingIds.has(f.id));
              return [...prev, ...newItems];
            });
          }
        } catch (err) {
          console.error('Failed to fetch child nanos on expand:', err);
        }
      }
    }
  };

  // 순환 참조 검증 헬퍼 (targetId가 ancestorId 자신 또는 ancestorId의 후손 문서인지 검사)
  const isDescendantOf = (targetId: string, ancestorId: string, nodes: any[]): boolean => {
    if (!targetId || !ancestorId) return false;
    if (targetId === ancestorId) return true;
    let current = nodes.find((n) => n.id === targetId);
    const visited = new Set<string>();
    while (current && current.parentNanoId) {
      if (visited.has(current.id)) break;
      visited.add(current.id);
      if (current.parentNanoId === ancestorId) return true;
      current = nodes.find((n) => n.id === current.parentNanoId);
    }
    return false;
  };

  // Drag & Drop 핸들러 (Re-parenting 및 순서 변경 지원, 순환참조 방지)
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedNanoId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragOverItem = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedNanoId && draggedNanoId !== targetId) {
      setDragOverTargetId(targetId);
      // 순환 참조 검사: 드래그 중인 문서의 하위/후손 문서 위로 드래그 시 하위 이동 차단
      const isCircular = isDescendantOf(targetId, draggedNanoId, orderedNanos);
      if (isCircular) {
        setDropAsChild(false);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - rect.top;
        setDropAsChild(e.shiftKey || offsetY > rect.height * 0.35);
      }
    }
  };

  const handleDragLeaveItem = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverTargetId(null);
    setDropAsChild(false);
  };

  const handleDropItem = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverTargetId(null);
    const isChildDrop = dropAsChild;
    setDropAsChild(false);

    if (!draggedNanoId || draggedNanoId === targetId) return;

    // 프론트엔드 계층 순환 참조 차단 가드
    if (isChildDrop && isDescendantOf(targetId, draggedNanoId, orderedNanos)) {
      alert('🚫 선택한 문서를 자신의 하위(자식/후손) 문서 내부로 이동할 수 없습니다. (순환 참조 방지)');
      setDraggedNanoId(null);
      return;
    }

    const list = [...orderedNanos];
    const draggedItem = list.find((n) => n.id === draggedNanoId);
    const targetItem = list.find((n) => n.id === targetId);

    if (!draggedItem || !targetItem) return;

    if (isChildDrop) {
      // --- [하위 Nano로속하게 변경 Case] targetId의 자식으로 이동 ---
      draggedItem.parentNanoId = targetId;
      setOrderedNanos([...list]);
      setExpandedNanos((prev) => ({ ...prev, [targetId]: true }));

      try {
        await apiClient.nanos.movePosition(workspaceId, draggedNanoId, {
          targetParentNanoId: targetId,
        });
      } catch (err) {
        console.error('Failed to move nano as child:', err);
      }
    } else {
      // --- [같은 레벨 순서 변경 Case] ---
      const dragIdx = list.findIndex((n) => n.id === draggedNanoId);
      const dropIdx = list.findIndex((n) => n.id === targetId);

      if (dragIdx !== -1 && dropIdx !== -1) {
        const [removed] = list.splice(dragIdx, 1);
        removed.parentNanoId = targetItem.parentNanoId || null;
        list.splice(dropIdx, 0, removed);
        setOrderedNanos([...list]);

        const prevNanoId = dropIdx > 0 ? list[dropIdx - 1].id : undefined;
        try {
          await apiClient.nanos.movePosition(workspaceId, draggedNanoId, {
            targetParentNanoId: removed.parentNanoId || undefined,
            prevNanoId,
          });
        } catch (err) {
          console.error('Failed to auto-save nano position:', err);
        }
      }
    }
    setDraggedNanoId(null);
  };

  const handleCreateRootDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim()) return;
    startNewNanoCreation(newDocTitle.trim());
    setCurrentTab('doc');
    setNewDocTitle('');
    setIsCreatingDoc(false);
  };

  const handleCreateChatroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChannelName) return;
    try {
      await createChannel(newChannelName, isPrivateChannel);
      setNewChannelName('');
      setIsPrivateChannel(false);
      setIsCreatingChannel(false);
    } catch (err: any) {
      alert(err.response?.data?.message || '채널 생성에 실패했습니다.');
    }
  };

  const clickNano = async (id: string) => {
    await selectNano(id);
    setCurrentTab('doc');
  };

  const clickChannel = async (id: string) => {
    await selectChannel(id);
    setCurrentTab('chat');

    try {
      const messagesRes = await apiClient.channels.messagesList(workspaceId, id);
      const messagesList = Array.isArray(messagesRes.data)
        ? messagesRes.data
        : (messagesRes.data?.items || []);
      if (messagesList.length > 0) {
        const lastMsg = messagesList[messagesList.length - 1];
        const msgId = lastMsg.messageId || lastMsg.id;
        if (msgId) {
          await apiClient.channels.read(workspaceId, id, {
            lastReadMessageId: msgId,
          });
        }
      }
    } catch (err) {
      console.error('Failed to sync chat read status:', err);
    }
  };

  const _handleMoveNano = async (nanoId: string, direction: 'up' | 'down') => {
    try {
      const index = nanos.findIndex((n) => n.id === nanoId);
      if (index === -1) return;

      if (direction === 'up' && index === 0) return;
      if (direction === 'down' && index === nanos.length - 1) return;

      let prevNanoId: string | undefined = undefined;

      if (direction === 'up') {
        if (index > 1) {
          prevNanoId = nanos[index - 2].id;
        }
      } else {
        prevNanoId = nanos[index + 1].id;
      }

      await apiClient.nanos.movePosition(workspaceId, nanoId, {
        targetParentNanoId: undefined,
        prevNanoId,
      });

      await selectWorkspace(workspaceId);
    } catch (err) {
      console.error(err);
      alert('문서 위치 변경에 실패했습니다.');
    }
  };

  if (syncTimedOut || (!loadingWorkspace && !activeWorkspace && !authLoading)) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background p-6">
        <div className="max-w-md w-full bg-luminano-point border border-luminano-border rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center gap-4 animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-amber-500/15 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              워크스페이스 동기화 지연 / 연결 해제
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              네트워크 연결이 끊겼거나 워크스페이스 정보를 가져올 수 없습니다. 대시보드로 이동하거나 다시 동기화를 시도해 주세요.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full mt-2">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex-1 px-4 py-2 border border-luminano-border hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-xs font-bold transition cursor-pointer text-slate-700 dark:text-slate-300"
            >
              대시보드로 이동
            </button>
            <button
              onClick={() => {
                setSyncTimedOut(false);
                selectWorkspace(workspaceId);
              }}
              className="flex-1 px-4 py-2 bg-luminano-accent text-white dark:text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer border-0 shadow-md flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSameWorkspace = activeWorkspace && (activeWorkspace.id === workspaceId || activeWorkspace.domain === workspaceId);

  if (authLoading || (!isSameWorkspace && (loadingWorkspace || !activeWorkspace))) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-luminano-accent" />
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">워크스페이스 동기화 중...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 h-screen overflow-hidden bg-background text-foreground">
      
      {/* 좌측 통합 사이드바 */}
      <aside className="w-64 flex flex-col border-r border-luminano-border bg-luminano-point overflow-y-auto h-full max-h-screen">
        
        {/* 상단 로고 및 정보 */}
        <div className="p-3.5 border-b border-luminano-border flex items-center justify-between gap-2 relative">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-800/40 rounded-md transition cursor-pointer bg-transparent border-0 shrink-0"
              title="대시보드로 돌아가기"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <LumiNanoLogo size="sm" href="" subTitle={activeWorkspace.name} />
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => setIsSettingsDropdownOpen(!isSettingsDropdownOpen)}
              className="p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-800/40 rounded-md transition cursor-pointer bg-transparent border-0"
              title="설정 메뉴"
            >
              <Settings className="w-4 h-4 animate-hover-spin" />
            </button>

            {isSettingsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50 py-1 text-xs">
                <button
                  onClick={() => {
                    setCurrentTab('profile');
                    setIsSettingsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium cursor-pointer border-0 bg-transparent flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5" />
                  내 설정 & 프로필
                </button>
                {(activeWorkspace.role === 'OWNER' || activeWorkspace.role === 'ADMIN') && (
                  <button
                    onClick={() => {
                      setCurrentTab('settings');
                      setIsSettingsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium cursor-pointer border-0 bg-transparent flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    멤버 및 초대 관리
                  </button>
                )}
                <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                <button
                  onClick={() => {
                    router.push('/dashboard');
                    setIsSettingsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium cursor-pointer border-0 bg-transparent flex items-center gap-2"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  대시보드 이동
                </button>
                <button
                  onClick={() => {
                    logout();
                    setIsSettingsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-650 dark:text-red-400 font-medium cursor-pointer border-0 bg-transparent flex items-center gap-2"
                >
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 탭/메뉴 리스트 */}
        <div className="flex-1 p-3 flex flex-col gap-6">
          
          {/* 가. 문서 관리 영역 (Nano) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-2 text-slate-500 dark:text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <Folder className="w-3.5 h-3.5" />
                협업 문서 (Nanos)
              </span>
              <button
                onClick={() => {
                  startNewNanoCreation();
                  setCurrentTab('doc');
                }}
                className="p-1 hover:bg-slate-800/40 rounded-md transition cursor-pointer text-slate-500 hover:text-luminano-accent bg-transparent border-0 flex items-center gap-1 text-[11px] font-medium"
                title="새 문서 작성 에디터 열기"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {isCreatingDoc && (
              <form onSubmit={handleCreateRootDoc} className="flex gap-1.5 px-2 mt-1">
                <input
                  type="text"
                  placeholder="새 문서 제목..."
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="flex-1 px-2.5 py-1 border border-luminano-border rounded text-xs bg-background focus:outline-none focus:ring-1 focus:ring-luminano-accent text-foreground"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-1 bg-luminano-accent text-white dark:text-slate-950 font-bold rounded text-[10px] cursor-pointer border-0"
                >
                  작성
                </button>
              </form>
            )}

            <div className="flex flex-col gap-0.5 mt-1.5">
              {(() => {
                const renderNanoTree = (nodes: any[], level = 0, visited = new Set<string>()) => {
                  return nodes.map((doc) => {
                    if (visited.has(doc.id)) return null;
                    const nextVisited = new Set(visited);
                    nextVisited.add(doc.id);

                    const children = orderedNanos.filter((n) => n.parentNanoId === doc.id);
                    const hasChildren = children.length > 0;
                    const isExpanded = expandedNanos[doc.id] !== false;
                    const canDrag = !!activeWorkspace;
                    const isDragOver = dragOverTargetId === doc.id;
                    const isSelected = activeNano?.id === doc.id;

                    const isCircular = draggedNanoId ? isDescendantOf(doc.id, draggedNanoId, orderedNanos) : false;

                    return (
                      <React.Fragment key={doc.id}>
                        <div
                          draggable={canDrag}
                          onDragStart={(e) => canDrag && handleDragStart(e, doc.id)}
                          onDragOver={(e) => canDrag && handleDragOverItem(e, doc.id)}
                          onDragLeave={handleDragLeaveItem}
                          onDrop={(e) => canDrag && handleDropItem(e, doc.id)}
                          style={{ paddingLeft: `${level * 14 + 8}px` }}
                          className={`w-full flex items-center justify-between py-1.5 pr-2 rounded-lg text-xs font-semibold tracking-wide text-left transition group relative cursor-pointer ${
                            isSelected
                              ? 'bg-luminano-accent/15 text-luminano-accent font-bold border border-luminano-accent/30'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                          } ${
                            draggedNanoId === doc.id ? 'opacity-40 border border-dashed border-luminano-accent' : ''
                          } ${
                            isDragOver && isCircular
                              ? 'bg-rose-500/15 border-2 border-dashed border-rose-500 ring-2 ring-rose-500/30 text-rose-300'
                              : isDragOver && dropAsChild
                              ? 'bg-indigo-500/20 border-2 border-dashed border-indigo-500 ring-2 ring-indigo-500/40 text-indigo-200'
                              : isDragOver
                              ? 'border-t-2 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40'
                              : ''
                          }`}
                        >
                          <div className="flex items-center gap-1 flex-1 min-w-0">
                            {canDrag && (
                              <GripVertical className="w-3 h-3 text-slate-400 opacity-40 group-hover:opacity-100 cursor-grab shrink-0" />
                            )}

                            {/* 세련된 90도 회전 애니메이션 펼치기/접기 버튼 */}
                            <button
                              onClick={(e) => handleToggleExpand(e, doc.id)}
                              className="p-1 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 rounded-md text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-200 cursor-pointer border-0 bg-transparent shrink-0 flex items-center justify-center"
                              title={isExpanded ? '하위 문서 접기' : '하위 문서 펼치기'}
                            >
                              <ChevronRight
                                className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                                  isExpanded
                                    ? 'rotate-90 text-indigo-500 dark:text-indigo-400 stroke-[2.5]'
                                    : 'rotate-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 stroke-[2]'
                                }`}
                              />
                            </button>

                            <button
                              onClick={() => clickNano(doc.id)}
                              className="flex items-center gap-1.5 flex-1 text-left bg-transparent border-0 cursor-pointer text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-slate-50 font-semibold truncate min-w-0"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span className="truncate">{doc.title}</span>
                            </button>

                            {/* 하위 문서 개수 뱃지 표시 */}
                            {hasChildren && (
                              <span className="px-1.5 py-0.2 bg-slate-200 dark:bg-slate-800 text-[9px] rounded-full text-slate-600 dark:text-slate-400 font-mono font-bold shrink-0">
                                {children.length}
                              </span>
                            )}
                          </div>

                          {/* 드래그 상태 드롭 타겟 가이드 툴팁 */}
                          {isDragOver && isCircular ? (
                            <span className="absolute right-2 text-[9px] font-bold text-rose-300 bg-rose-950 px-1.5 py-0.5 rounded border border-rose-700 animate-bounce">
                              🚫 하위 이동 불가 (순환 참조)
                            </span>
                          ) : isDragOver && dropAsChild ? (
                            <span className="absolute right-2 text-[9px] font-bold text-indigo-400 bg-indigo-950 px-1.5 py-0.5 rounded border border-indigo-700 animate-pulse">
                              📥 하위 문서로 속함
                            </span>
                          ) : null}
                        </div>

                        {/* 하위 문서 펼침 상태 렌더링 */}
                        {hasChildren && isExpanded && renderNanoTree(children, level + 1, nextVisited)}
                      </React.Fragment>
                    );
                  });
                };

                const rootNanos = orderedNanos.filter((n) => !n.parentNanoId);
                return renderNanoTree(rootNanos.length > 0 ? rootNanos : orderedNanos);
              })()}
            </div>
          </div>

          {/* 실시간 채팅 영역 (Channels) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-2 text-slate-500 dark:text-slate-400 font-semibold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                실시간 채널
              </span>
              <button
                onClick={() => setIsCreatingChannel(!isCreatingChannel)}
                className="p-1 hover:bg-slate-800/40 rounded-md transition cursor-pointer text-slate-500 hover:text-luminano-accent bg-transparent border-0"
                title="새 채널 추가"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {isCreatingChannel && (
              <form onSubmit={handleCreateChatroom} className="flex flex-col gap-1.5 px-2 mt-1 bg-background/50 p-2 rounded border border-luminano-border">
                <input
                  type="text"
                  placeholder="채널명..."
                  value={newChannelName}
                  onChange={(e) => setNewChannelName(e.target.value)}
                  className="px-2.5 py-1 border border-luminano-border rounded text-xs bg-background focus:outline-none focus:ring-1 focus:ring-luminano-accent text-foreground"
                  autoFocus
                />
                <label className="flex items-center gap-1.5 text-[10px] text-slate-600 dark:text-slate-400 font-semibold mt-1">
                  <input
                    type="checkbox"
                    checked={isPrivateChannel}
                    onChange={(e) => setIsPrivateChannel(e.target.checked)}
                  />
                  비공개 채널 여부
                </label>
                <button
                  type="submit"
                  className="w-full mt-1.5 py-1 bg-luminano-accent text-white dark:text-slate-950 font-bold rounded text-[10px] cursor-pointer border-0"
                >
                  채널 생성
                </button>
              </form>
            )}

            <div className="flex flex-col gap-0.5 mt-1.5">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => clickChannel(ch.id)}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-left transition cursor-pointer bg-transparent border-0 text-slate-600 hover:bg-slate-800/40 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-550"
                >
                  {ch.isPrivate ? (
                    <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 결재 프로세스 및 멤버 관리 단추 */}
          <div className="flex flex-col gap-1 border-t border-luminano-border pt-4">
            <button
              onClick={() => setCurrentTab('approval')}
              className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                currentTab === 'approval' 
                  ? 'bg-luminano-accent/10 text-luminano-accent border-luminano-accent/30' 
                  : 'text-slate-700 hover:bg-slate-800/40 dark:text-slate-200 bg-transparent border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                결재 워크플로우
              </span>
              {pendingApprovalsCount > 0 && (
                <span className="bg-red-500 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full border-0">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>

            {/* OWNER 및 ADMIN 전용 멤버 관리 버튼 (요구사항 5번) */}
            {(activeWorkspace.role === 'OWNER' || activeWorkspace.role === 'ADMIN') && (
              <button
                onClick={() => setCurrentTab('members')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border ${
                  currentTab === 'members'
                    ? 'bg-luminano-accent/10 text-luminano-accent border-luminano-accent/30'
                    : 'text-slate-700 hover:bg-slate-800/40 dark:text-slate-200 bg-transparent border-transparent'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  멤버 및 가입 관리
                </span>
              </button>
            )}
          </div>

        </div>

      </aside>

      {/* 우측 동적 메인 본문 콘텐츠 */}
      <main className="flex-1 flex flex-col overflow-hidden bg-background h-full max-h-screen">
        
        {currentTab === 'doc' && (
          <NanoEditor />
        )}

        {currentTab === 'approval' && (
          <div className="flex-1 overflow-y-auto p-8">
            <WorkflowPanel />
          </div>
        )}

        {currentTab === 'chat' && (
          <ChatPanel />
        )}

        {currentTab === 'members' && (
          <MemberManagement workspaceId={workspaceId} userRole={activeWorkspace.role || 'MEMBER'} />
        )}

        {currentTab === 'settings' && (
          <div className="flex-1 overflow-y-auto p-8">
            <WorkspaceSettings />
          </div>
        )}

        {currentTab === 'profile' && (
          <div className="flex-1 overflow-y-auto p-8">
            <UserProfileSettings />
          </div>
        )}

      </main>

    </div>
  );
}
