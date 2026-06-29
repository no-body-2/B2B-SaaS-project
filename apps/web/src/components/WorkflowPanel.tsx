'use client';

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { ShieldCheck, FileCheck2, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function WorkflowPanel() {
  const { activeWorkspace, approvals, decideApproval, cancelApproval } = useWorkspace();
  const [selectedApprId, setSelectedApprId] = useState<string | null>(null);
  const [opinion, setOpinion] = useState('');
  const [processing, setProcessing] = useState(false);

  const isOwner = activeWorkspace?.role === 'OWNER';
  const selectedAppr = approvals.find((a) => a.id === selectedApprId);

  const handleDecision = async (decision: 'APPROVED' | 'REJECTED') => {
    if (!selectedAppr) return;
    const actionText = decision === 'APPROVED' ? '승인' : '반려';
    if (!confirm(`이 결재 요청을 정말로 ${actionText}하시겠습니까?`)) return;

    setProcessing(true);
    try {
      await decideApproval(selectedAppr.id, decision, opinion);
      setOpinion('');
      alert(`성공적으로 결재가 ${actionText} 처리되었습니다.`);
    } catch (err) {
      alert('결재 처리에 실패했습니다.');
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async (apprId: string) => {
    if (confirm('이 결재 상신을 취소(철회)하시겠습니까?')) {
      setProcessing(true);
      try {
        await cancelApproval(apprId);
        alert('결재 요청이 성공적으로 취소되었습니다.');
      } catch (err) {
        alert('결재 요청 취소에 실패했습니다.');
      } finally {
        setProcessing(false);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/30 text-amber-400 border border-amber-900/50">
            <Clock className="w-3 h-3 animate-pulse" />
            대기 중
          </span>
        );
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/30 text-emerald-400 border border-emerald-900/50">
            <CheckCircle2 className="w-3 h-3" />
            승인 완료
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950/30 text-red-400 border border-red-900/50">
            <XCircle className="w-3 h-3" />
            반려됨
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
            <AlertCircle className="w-3 h-3" />
            취소됨
          </span>
        );
    }
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-xs min-h-[500px]">
      
      {/* 1. 결재 요청 목록 탭 (좌측) */}
      <div className="w-80 border-r border-slate-800 flex flex-col overflow-y-auto bg-slate-900">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-violet-500" />
          <h3 className="font-bold text-sm text-slate-100">
            {isOwner ? '수신 결재 대기 문서' : '내 기안 결재 내역'}
          </h3>
        </div>

        {approvals.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <FileCheck2 className="w-10 h-10 text-slate-700 mb-2" />
            <span className="text-xs font-semibold text-slate-500">결재 요청 내역이 없습니다.</span>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-800">
            {approvals.map((appr) => {
              const isSelected = selectedApprId === appr.id;
              return (
                <div
                  key={appr.id}
                  onClick={() => setSelectedApprId(appr.id)}
                  className={`p-4 flex flex-col gap-2 cursor-pointer transition ${
                    isSelected 
                      ? 'bg-violet-950/20 border-l-4 border-l-violet-600' 
                      : 'hover:bg-slate-850 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-bold text-slate-100 line-clamp-1">
                      {appr.title}
                    </span>
                    {getStatusBadge(appr.status)}
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>기안: {appr.requesterName}</span>
                    <span>{new Date(appr.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. 결재 상세 패널 (우측) */}
      <div className="flex-1 flex flex-col overflow-y-auto bg-slate-950/10">
        {selectedAppr ? (
          <div className="p-8 flex flex-col gap-6">
            
            {/* 결재 정보 요약 */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-violet-400 uppercase">결재 상세 정보</span>
                <h2 className="text-xl font-extrabold text-slate-100">{selectedAppr.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-1">
                  <span>기안자: <strong className="text-slate-350">{selectedAppr.requesterName}</strong></span>
                  <span>기안일: {new Date(selectedAppr.createdAt).toLocaleString()}</span>
                </div>
              </div>
              <div>{getStatusBadge(selectedAppr.status)}</div>
            </div>

            {/* 변경 요청 상세 본문 */}
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">문서 변경 제안서 (수정 내용)</h4>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed shadow-2xs">
                {selectedAppr.content}
              </div>
            </div>

            {/* 결재 상신 사유/코멘트 */}
            {selectedAppr.opinion && selectedAppr.status !== 'PENDING' && (
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">최종 결정 결재 의견</h4>
                <div className="bg-slate-900 rounded-xl p-4 text-xs text-slate-350 border border-slate-800">
                  {selectedAppr.opinion}
                </div>
              </div>
            )}

            {/* 결재 승인/반려 폼 (대기 중 상태 & 역할 분기) */}
            {selectedAppr.status === 'PENDING' && (
              <div className="border-t border-slate-800 pt-6 mt-4">
                {isOwner ? (
                  <div className="flex flex-col gap-4 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xs">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-slate-300">결재 의견 기록 (선택)</label>
                      <textarea
                        value={opinion}
                        onChange={(e) => setOpinion(e.target.value)}
                        placeholder="승인 또는 반려 사유를 적어주세요..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-800 rounded-lg text-xs bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 resize-none"
                      />
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleDecision('REJECTED')}
                        disabled={processing}
                        className="px-4 py-2 bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/50 font-bold rounded-lg text-xs transition cursor-pointer disabled:bg-red-950/10"
                      >
                        {processing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '반려 처리'}
                      </button>
                      <button
                        onClick={() => handleDecision('APPROVED')}
                        disabled={processing}
                        className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg text-xs transition cursor-pointer disabled:bg-violet-600/60"
                      >
                        {processing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '최종 결재 승인'}
                      </button>
                    </div>
                  </div>
                ) : (
                  // 일반 MEMBER이고 자신이 기안한 것일 때
                  <div className="flex justify-end gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xs items-center justify-between">
                    <span className="text-xs text-slate-400 font-semibold">최고 관리자가 현재 이 결재 요청을 검토 중입니다.</span>
                    <button
                      onClick={() => handleCancel(selectedAppr.id)}
                      disabled={processing}
                      className="px-4 py-2 bg-slate-850 text-slate-300 hover:bg-slate-800 rounded-lg text-xs font-semibold transition cursor-pointer disabled:bg-slate-900"
                    >
                      {processing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '상신 취소 (철회)'}
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <ShieldCheck className="w-12 h-12 text-slate-700 mb-3" />
            <h3 className="text-slate-300 font-bold text-base">결재 항목을 선택해주세요</h3>
            <p className="text-slate-500 text-xs mt-1">좌측 리스트에서 상세 내역을 조회할 결재 요청을 클릭하십시오.</p>
          </div>
        )}
      </div>

    </div>
  );
}
