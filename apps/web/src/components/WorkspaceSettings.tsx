'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '../context/WorkspaceContext';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ShieldAlert, ArrowRightLeft, UserMinus, LogOut, Loader2, Users, Mail, Trash2, RotateCcw, FileText, X } from 'lucide-react';
import { apiClient } from '../lib/api';

export default function WorkspaceSettings() {
  const router = useRouter();
  const { user } = useAuth();
  const { 
    activeWorkspace, 
    members, 
    inviteMember, 
    updateMemberRole, 
    kickMember, 
    leaveWorkspace,
    deleteWorkspace,
    fetchMembers
  } = useWorkspace();

  // 멤버 검색 및 필터 State
  const [memberSearch, setMemberSearch] = useState('');
  const [memberRoleFilter, setMemberRoleFilter] = useState<'ALL' | 'OWNER' | 'ADMIN' | 'MEMBER'>('ALL');

  useEffect(() => {
    fetchMembers({
      keyword: memberSearch,
      role: memberRoleFilter === 'ALL' ? undefined : memberRoleFilter
    });
  }, [memberSearch, memberRoleFilter, fetchMembers]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');
  
  const [confirmWsName, setConfirmWsName] = useState('');

  const [invitations, setInvitations] = useState<any[]>([]);
  const [deletedNanos, setDeletedNanos] = useState<any[]>([]);
  const [loadingInvitations, setLoadingInvitations] = useState(false);
  const [loadingDeleted, setLoadingDeleted] = useState(false);

  const loadInvitations = async () => {
    if (!activeWorkspace) return;
    setLoadingInvitations(true);
    try {
      const res = await apiClient.members.listInvitations(activeWorkspace.id);
      setInvitations(res.data || []);
    } catch (err) {
      console.error('Failed to load invitations:', err);
    } finally {
      setLoadingInvitations(false);
    }
  };

  const loadDeletedNanos = async () => {
    if (!activeWorkspace) return;
    setLoadingDeleted(true);
    try {
      const res = await apiClient.nanos.listDeleted(activeWorkspace.id);
      setDeletedNanos(res.data || []);
    } catch (err) {
      console.error('Failed to load deleted nanos:', err);
    } finally {
      setLoadingDeleted(false);
    }
  };

  useEffect(() => {
    if (activeWorkspace) {
      loadInvitations();
      loadDeletedNanos();
    }
  }, [activeWorkspace]);

  const handleRevokeInvite = async (invitationId: string, email: string) => {
    if (!activeWorkspace) return;
    if (confirm(`${email} 님에게 보낸 초대를 철회하시겠습니까?`)) {
      try {
        await apiClient.members.revokeInvitation(activeWorkspace.id, invitationId);
        alert('초대가 철회되었습니다.');
        loadInvitations();
      } catch (err: any) {
        alert(err.response?.data?.message || '초대 철회에 실패했습니다.');
      }
    }
  };

  const handleRestoreNano = async (nanoId: string, title: string) => {
    if (!activeWorkspace) return;
    if (confirm(`'${title}' 문서를 복구하시겠습니까?`)) {
      try {
        await apiClient.nanos.restore(activeWorkspace.id, nanoId);
        alert('문서가 복구되었습니다. 새로고침 후 문서 트리에서 확인해 주세요.');
        loadDeletedNanos();
      } catch (err: any) {
        alert(err.response?.data?.message || '문서 복구에 실패했습니다.');
      }
    }
  };

  const isOwner = activeWorkspace?.role === 'OWNER';

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError('');
    setInviteSuccess('');
    
    if (!inviteEmail) {
      setInviteError('이메일 주소를 입력해주세요.');
      return;
    }

    setInviting(true);
    try {
      await inviteMember(inviteEmail);
      setInviteSuccess(`${inviteEmail} 님에게 초대장을 성공적으로 발송하여 멤버십을 연동했습니다.`);
      setInviteEmail('');
      loadInvitations();
    } catch (err: any) {
      setInviteError(err.response?.data?.message || '초대에 실패했습니다. 유효하지 않은 계정이거나 중복 가입입니다.');
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (targetUserId: string, currentRole: string) => {
    const nextRole = currentRole === 'OWNER' ? 'MEMBER' : 'OWNER';
    const confirmMsg = nextRole === 'OWNER' 
      ? '대상을 OWNER로 지정하시겠습니까? 소유 한도가 검증됩니다.'
      : '방장 권한을 회수하시겠습니까?';
      
    if (confirm(confirmMsg)) {
      try {
        await updateMemberRole(targetUserId, nextRole);
      } catch (err: any) {
        alert(err.response?.data?.message || '권한 변경에 실패했습니다.');
      }
    }
  };

  const handleKick = async (targetUserId: string, targetName: string) => {
    if (confirm(`정말로 ${targetName} 님을 워크스페이스에서 추방하시겠습니까?`)) {
      try {
        await kickMember(targetUserId);
      } catch (err) {
        alert('추방에 실패했습니다.');
      }
    }
  };

  const handleLeave = async () => {
    if (confirm('정말로 이 워크스페이스를 나가시겠습니까?')) {
      try {
        await leaveWorkspace();
      } catch (err: any) {
        alert(err.response?.data?.message || '워크스페이스 나가기에 실패했습니다.');
      }
    }
  };

  const handleDeleteWorkspace = async () => {
    if (!activeWorkspace) return;
    if (!confirmWsName) {
      alert('워크스페이스 이름을 입력해 주세요.');
      return;
    }
    if (confirmWsName !== activeWorkspace.name) {
      alert('입력한 이름이 워크스페이스 이름과 일치하지 않습니다.');
      return;
    }
    if (confirm(`정말로 '${activeWorkspace.name}' 워크스페이스를 삭제하시겠습니까? 30일간 보관함에 보관된 후 영구 삭제됩니다.`)) {
      try {
        await deleteWorkspace(confirmWsName);
        alert('워크스페이스가 삭제 보관함으로 이동되었습니다.');
        router.push('/dashboard');
      } catch (err: any) {
        alert(err.response?.data?.message || '워크스페이스 삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-3xl w-full mx-auto py-4">
      
      {/* 멤버 초대하기 섹션 (OWNER 전용) */}
      {isOwner && (
        <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-luminano-accent" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">동료 초대하기</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            초대받은 팀원은 즉시 워크스페이스 합류 멤버로 연동되어 함께 문서를 편집할 수 있습니다.
          </p>
          
          {inviteError && (
            <div className="p-2.5 bg-red-950/20 text-red-400 border border-red-900/50 rounded-lg text-xs font-semibold">
              {inviteError}
            </div>
          )}
          {inviteSuccess && (
            <div className="p-2.5 bg-emerald-950/20 text-emerald-400 border border-emerald-900/50 rounded-lg text-xs font-semibold">
              {inviteSuccess}
            </div>
          )}

          <form onSubmit={handleInvite} className="flex gap-3">
            <input
              type="email"
              placeholder="teammate@company.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
            />
            <button
              type="submit"
              disabled={inviting}
              className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 text-white dark:text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer border-0 disabled:bg-luminano-accent/60"
            >
              {inviting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '초대 메일 전송'}
            </button>
          </form>
        </div>
      )}

      {/* 멤버 리스트 및 관리 섹션 */}
      <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex justify-between items-center border-b border-luminano-border pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-luminano-accent" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">소속 팀원 관리</h3>
          </div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">총 {members.length}명</span>
        </div>

        {/* 멤버 검색 및 필터 컨트롤 바 */}
        <div className="flex flex-col sm:flex-row gap-3 border-b border-luminano-border pb-4 mb-2">
          <input
            type="text"
            placeholder="이름 또는 이메일 검색..."
            value={memberSearch}
            onChange={(e) => setMemberSearch(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-luminano-border rounded-lg text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-luminano-accent"
          />
          <div className="flex gap-1 text-[10px] font-bold">
            {(['ALL', 'OWNER', 'ADMIN', 'MEMBER'] as const).map((r) => {
              const active = memberRoleFilter === r;
              const textMap = { ALL: '전체', OWNER: '소유자', ADMIN: '관리자', MEMBER: '일반' };
              return (
                <button
                  key={r}
                  onClick={() => setMemberRoleFilter(r)}
                  className={`px-3 py-1.5 rounded transition cursor-pointer border-0 ${
                    active 
                      ? 'bg-luminano-accent text-white dark:text-slate-950 font-bold' 
                      : 'bg-background hover:bg-slate-800/40 text-slate-500'
                  }`}
                >
                  {textMap[r]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col divide-y divide-luminano-border">
          {members.map((m) => {
            const isMe = m.userId === user?.id;
            return (
              <div key={m.userId} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-background rounded-full flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold text-sm">
                    {m.user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {m.user.name} {isMe && <span className="text-xs text-luminano-accent font-semibold">(나)</span>}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-300 font-mono">{m.user.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    m.role === 'OWNER' 
                      ? 'bg-luminano-accent/10 text-luminano-accent border border-luminano-accent/30' 
                      : 'bg-emerald-100 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                  }`}>
                    {m.role}
                  </span>
                  
                  {/* OWNER 권한 액션 패널 */}
                  {isOwner && !isMe && (
                    <div className="flex items-center gap-1.5 ml-2 border-l border-luminano-border pl-3">
                      <button
                        onClick={() => handleRoleChange(m.userId, m.role)}
                        className="p-1.5 text-slate-500 hover:text-luminano-accent rounded-md hover:bg-slate-800/40 transition cursor-pointer border border-transparent bg-transparent"
                        title="역할 위임/변경"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleKick(m.userId, m.user.name)}
                        className="p-1.5 text-slate-500 hover:text-red-400 rounded-md hover:bg-slate-800/40 transition cursor-pointer border border-transparent bg-transparent"
                        title="멤버 추방"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 보낸 초대장 관리 섹션 (OWNER 전용) */}
      {isOwner && (
        <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-luminano-border pb-3">
            <Mail className="w-5 h-5 text-luminano-accent" />
            <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">보낸 초대 대기 목록</h3>
          </div>
          
          {loadingInvitations ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : invitations.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-4">현재 대기 중인 초대 내역이 없습니다.</p>
          ) : (
            <div className="flex flex-col divide-y divide-luminano-border">
              {invitations.map((inv) => (
                <div key={inv.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{inv.targetEmail}</span>
                    <span className="text-[10px] text-slate-500">
                      만료 시간: {new Date(inv.expiresAt).toLocaleString()} | 상태: {inv.status}
                    </span>
                  </div>
                  {inv.status === 'PENDING' && (
                    <button
                      onClick={() => handleRevokeInvite(inv.id, inv.targetEmail)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer border-0"
                    >
                      <X className="w-3.5 h-3.5" />
                      초대 취소
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 휴지통 섹션 (삭제된 문서 복구) */}
      <div className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-luminano-border pb-3">
          <Trash2 className="w-5 h-5 text-luminano-accent" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">휴지통 (삭제된 문서 복구)</h3>
        </div>
        <p className="text-xs text-slate-650 dark:text-slate-400">
          삭제된 문서는 30일 동안 휴지통에 보관되며, 언제든지 하위 계층을 포함하여 전체 복구가 가능합니다.
        </p>

        {loadingDeleted ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
          </div>
        ) : deletedNanos.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">휴지통이 비어 있습니다.</p>
        ) : (
          <div className="flex flex-col divide-y divide-luminano-border">
            {deletedNanos.map((doc) => (
              <div key={doc.id} className="flex justify-between items-center py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">{doc.title}</span>
                    <span className="text-[10px] text-slate-500">
                      삭제 시각: {new Date(doc.deletedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRestoreNano(doc.id, doc.title)}
                  className="px-3 py-1.5 bg-luminano-accent/10 hover:bg-luminano-accent/20 text-luminano-accent border border-luminano-accent/30 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  복구
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 워크스페이스 탈퇴/경고 섹션 */}
      <div className="bg-red-100 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-base text-red-700 dark:text-red-400">위험 구역</h3>
        </div>
        
        {isOwner ? (
          <div className="flex flex-col gap-4">
            <p className="text-xs text-red-700 dark:text-red-400/80">
              현재 회원님은 워크스페이스 최고 관리자(OWNER)입니다. 워크스페이스를 삭제하고 30일 보관함으로 이동시킬 수 있습니다.
              삭제를 원하실 경우 워크스페이스 이름 <strong>{activeWorkspace?.name}</strong>을 아래에 동일하게 입력해 주십시오.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="워크스페이스 이름 입력..."
                value={confirmWsName}
                onChange={(e) => setConfirmWsName(e.target.value)}
                className="flex-1 max-w-xs px-3 py-2 border border-red-300 dark:border-red-900/50 rounded-lg text-sm bg-background text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
              <button
                onClick={handleDeleteWorkspace}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition cursor-pointer border-0"
              >
                워크스페이스 삭제
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <p className="text-xs text-red-700 dark:text-red-400/80 max-w-lg">
              워크스페이스 탈퇴 시 작성하던 문서 이력이나 소속 정보가 모두 삭제됩니다. 다시 합류하려면 초대 링크가 필요합니다.
            </p>
            <button
              onClick={handleLeave}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-transparent"
            >
              <LogOut className="w-3.5 h-3.5" />
              워크스페이스 나가기
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
