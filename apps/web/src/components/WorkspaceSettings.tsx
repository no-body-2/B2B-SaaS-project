'use client';

import React, { useState } from 'react';
import { useWorkspace } from '../context/WorkspaceContext';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ShieldAlert, ArrowRightLeft, UserMinus, LogOut, Loader2, Users } from 'lucide-react';

export default function WorkspaceSettings() {
  const { user } = useAuth();
  const { 
    activeWorkspace, 
    members, 
    inviteMember, 
    updateMemberRole, 
    kickMember, 
    leaveWorkspace 
  } = useWorkspace();

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState('');

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

        <div className="flex flex-col divide-y divide-luminano-border">
          {members.map((m) => {
            const isMe = m.userId === user?.id;
            return (
              <div key={m.userId} className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-background rounded-full flex items-center justify-center text-slate-700 dark:text-slate-350 font-bold text-sm">
                    {m.user.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                      {m.user.name} {isMe && <span className="text-xs text-luminano-accent font-semibold">(나)</span>}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-450 font-mono">{m.user.email}</span>
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

      {/* 워크스페이스 탈퇴/경고 섹션 */}
      <div className="bg-red-100 dark:bg-red-955/10 border border-red-200 dark:border-red-900/30 rounded-xl p-6 shadow-md flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-base text-red-700 dark:text-red-400">위험 구역</h3>
        </div>
        
        {isOwner ? (
          <p className="text-xs text-red-700 dark:text-red-400/80">
            현재 회원님은 워크스페이스 최고 관리자(OWNER)입니다. 워크스페이스를 삭제하고 30일 보관함으로 이동시키거나, 대시보드로 돌아가 도메인을 관리하십시오. 
            타인에게 최고 관리자 지위를 위임하기 전까지는 워크스페이스 탈퇴가 불가능합니다.
          </p>
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
