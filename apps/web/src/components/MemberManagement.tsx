'use client';

import React, { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';
import { Users, UserPlus, UserMinus, Check, X, Clock, Loader2 } from 'lucide-react';

interface MemberManagementProps {
  workspaceId: string;
  userRole: string;
}

export default function MemberManagement({ workspaceId, userRole }: MemberManagementProps) {
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'JOIN_REQUESTS'>('MEMBERS');
  const [members, setMembers] = useState<any[]>([]);
  const [joinRequests, setJoinRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    loadData();
  }, [workspaceId, activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'MEMBERS') {
        const res = await apiClient.members.list(workspaceId);
        const list = Array.isArray(res.data) ? res.data : (res.data?.members || []);
        setMembers(list);
      } else {
        const res = await apiClient.workspace.getJoinRequests(workspaceId);
        setJoinRequests(Array.isArray(res.data) ? res.data : []);
      }
    } catch (err) {
      console.error('Failed to load member management data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      await apiClient.members.invite(workspaceId, inviteEmail.trim());
      alert('초대 이메일이 발송되었습니다.');
      setInviteEmail('');
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || '초대에 실패했습니다.');
    } finally {
      setInviting(false);
    }
  };

  const handleUpdateRole = async (targetUserId: string, newRole: string) => {
    try {
      await apiClient.members.updateRole(workspaceId, targetUserId, newRole);
      alert('역할이 수정되었습니다.');
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || '역할 수정에 실패했습니다.');
    }
  };

  const handleKick = async (targetUserId: string, memberName: string) => {
    if (!confirm(`정말로 '${memberName}' 멤버를 강퇴하시겠습니까?`)) return;
    try {
      await apiClient.members.kick(workspaceId, targetUserId);
      alert('멤버를 내보냈습니다.');
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || '강퇴 처리에 실패했습니다.');
    }
  };

  const handleProcessJoin = async (requestId: string, action: 'APPROVE' | 'REJECT') => {
    try {
      await apiClient.workspace.processJoinRequest(workspaceId, requestId, action);
      alert(action === 'APPROVE' ? '가입 신청을 승인했습니다.' : '가입 신청을 거절했습니다.');
      loadData();
    } catch (err: any) {
      alert(err.response?.data?.message || '가입 신청 처리에 실패했습니다.');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-luminano-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-luminano-accent" />
            멤버 및 가입 관리
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            워크스페이스에 소속된 멤버 권한 제어 및 가입 신청 건을 관리합니다.
          </p>
        </div>

        {/* 탭 버튼 */}
        <div className="flex gap-2 bg-luminano-point/60 p-1 rounded-xl border border-luminano-border">
          <button
            onClick={() => setActiveTab('MEMBERS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer border-0 ${
              activeTab === 'MEMBERS'
                ? 'bg-luminano-accent text-white dark:text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-200 bg-transparent'
            }`}
          >
            멤버 목록 ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('JOIN_REQUESTS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer border-0 ${
              activeTab === 'JOIN_REQUESTS'
                ? 'bg-luminano-accent text-white dark:text-slate-950 shadow-sm'
                : 'text-slate-500 hover:text-slate-200 bg-transparent'
            }`}
          >
            가입 신청 관리
          </button>
        </div>
      </div>

      {activeTab === 'MEMBERS' && (
        <div className="flex flex-col gap-6">
          {/* 초대 폼 */}
          <form onSubmit={handleInvite} className="flex gap-3 bg-luminano-point border border-luminano-border p-4 rounded-xl">
            <input
              type="email"
              placeholder="새로 초대할 멤버의 이메일을 입력하세요..."
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-luminano-border rounded-lg text-xs bg-background text-foreground focus:outline-none focus:border-luminano-accent"
            />
            <button
              type="submit"
              disabled={inviting}
              className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 text-white dark:text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0"
            >
              {inviting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              멤버 초대
            </button>
          </form>

          {/* 멤버 리스트 테이블 */}
          <div className="border border-luminano-border rounded-xl overflow-hidden bg-luminano-point">
            <table className="w-full text-left text-xs">
              <thead className="bg-background/80 border-b border-luminano-border text-slate-500 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">사용자</th>
                  <th className="py-3 px-4">이메일</th>
                  <th className="py-3 px-4">역할 (Role)</th>
                  <th className="py-3 px-4 text-right">관리 Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-luminano-border">
                {members.map((m: any) => {
                  const displayName = m.user?.name || 
                    `${m.user?.lastName || ''}${m.user?.firstName || ''}`.trim() || 
                    m.email || '멤버';
                  return (
                    <tr key={m.userId} className="hover:bg-background/40 transition">
                      <td className="py-3.5 px-4 font-bold text-foreground flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-luminano-accent/20 text-luminano-accent flex items-center justify-center font-bold text-xs">
                          {displayName.substring(0, 1)}
                        </div>
                        {displayName}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{m.user?.email || m.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] flex items-center gap-1 ${
                          m.role === 'OWNER' ? 'bg-amber-500/15 text-amber-500 border border-amber-500/40' :
                          m.role === 'ADMIN' ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/40' :
                          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40'
                        }`}>
                          {m.role === 'OWNER' ? '👑 OWNER' : m.role === 'ADMIN' ? '🛡️ ADMIN' : '👤 MEMBER'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {m.role !== 'OWNER' && (userRole === 'OWNER' || userRole === 'ADMIN') && (
                          <div className="flex justify-end gap-2">
                            <select
                              value={m.role}
                              onChange={(e) => handleUpdateRole(m.userId, e.target.value)}
                              className="px-2 py-1 bg-background border border-luminano-border rounded text-[11px] text-foreground focus:outline-none"
                            >
                              <option value="MEMBER">MEMBER</option>
                              <option value="ADMIN">ADMIN</option>
                            </select>
                            <button
                              onClick={() => handleKick(m.userId, displayName)}
                              className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-[11px] font-bold transition border-0 cursor-pointer flex items-center gap-1"
                            >
                              <UserMinus className="w-3.5 h-3.5" />
                              강퇴
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'JOIN_REQUESTS' && (
        <div className="flex flex-col gap-4">
          {joinRequests.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-luminano-point rounded-xl border border-luminano-border">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              대기 중인 가입 신청이 없습니다.
            </div>
          ) : (
            <div className="border border-luminano-border rounded-xl overflow-hidden bg-luminano-point">
              <table className="w-full text-left text-xs">
                <thead className="bg-background/80 border-b border-luminano-border text-slate-500 font-semibold uppercase">
                  <tr>
                    <th className="py-3 px-4">신청자</th>
                    <th className="py-3 px-4">이메일</th>
                    <th className="py-3 px-4">신청 메시지</th>
                    <th className="py-3 px-4">상태</th>
                    <th className="py-3 px-4 text-right">승인/거절</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-luminano-border">
                  {joinRequests.map((req: any) => (
                    <tr key={req.id} className="hover:bg-background/40 transition">
                      <td className="py-3.5 px-4 font-bold text-foreground">{req.userName}</td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{req.userEmail}</td>
                      <td className="py-3.5 px-4 text-slate-300">{req.message || '-'}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          req.status === 'PENDING' ? 'bg-amber-500/20 text-amber-400' :
                          req.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {req.status === 'PENDING' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleProcessJoin(req.id, 'APPROVE')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold transition border-0 cursor-pointer flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              승인
                            </button>
                            <button
                              onClick={() => handleProcessJoin(req.id, 'REJECT')}
                              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[11px] font-bold transition border-0 cursor-pointer flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" />
                              거절
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
