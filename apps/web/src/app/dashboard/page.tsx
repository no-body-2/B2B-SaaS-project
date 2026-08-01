'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import LumiNanoIcon from '../../components/LumiNanoIcon';
import { apiClient } from '../../lib/api';
import { Building2, Plus, LogOut, Trash2, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading, logout, deleteAccount } = useAuth();
  const { 
    workspaces, 
    fetchWorkspaces, 
    selectWorkspace, 
    createWorkspace, 
    restoreWorkspace
  } = useWorkspace();

  const activeWorkspaces = workspaces.filter((ws) => !ws.deletedAt);
  const deletedWorkspaces = workspaces.filter((ws) => ws.deletedAt);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wsName, setWsName] = useState('');
  const [wsDomain, setWsDomain] = useState('');
  const [wsIsPrivate, setWsIsPrivate] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [creating, setCreating] = useState(false);

  // 추천 공개 워크스페이스 상태
  const [publicWorkspaces, setPublicWorkspaces] = useState<any[]>([]);
  const [loadingPublic, setLoadingPublic] = useState(false);

  // 세션이 없으면 로그인 페이지로 튕겨냄
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // 마운트 시 워크스페이스 목록 및 공개 추천 워크스페이스 동기화
  useEffect(() => {
    if (user) {
      fetchWorkspaces();
      loadPublicWorkspaces();
    }
  }, [user, fetchWorkspaces]);

  const loadPublicWorkspaces = async () => {
    setLoadingPublic(true);
    try {
      const res = await apiClient.workspace.listPublic();
      setPublicWorkspaces(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to load public workspaces:', err);
    } finally {
      setLoadingPublic(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!wsName || !wsDomain) {
      setErrorMsg('워크스페이스 이름과 도메인을 입력해 주세요.');
      return;
    }

    setCreating(true);
    try {
      await createWorkspace(wsName.trim(), wsDomain.trim(), wsIsPrivate);
      setWsName('');
      setWsDomain('');
      setIsModalOpen(false);
      await fetchWorkspaces();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || '생성에 실패했습니다. 한도를 초과했거나 이미 사용 중인 도메인입니다.');
    } finally {
      setCreating(false);
    }
  };

  const handleSelect = async (ws: any) => {
    try {
      const targetSlug = ws.domain || ws.id;
      await selectWorkspace(ws.id);
      router.push(`/workspace/${targetSlug}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequestJoin = async (workspaceId: string) => {
    try {
      await apiClient.workspace.requestJoin(workspaceId, '가입을 요청합니다.');
      alert('가입 신청이 성공적으로 제출되었습니다.');
      loadPublicWorkspaces();
    } catch (err: any) {
      alert(err.response?.data?.message || '가입 신청 제출 실패');
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말로 탈퇴하시겠습니까? 데이터 복구가 불가능하며 모든 세션 정보가 무효화됩니다.')) {
      try {
        await deleteAccount();
        router.push('/');
      } catch (err) {
        console.error(err);
        alert('회원 탈퇴에 실패했습니다.');
      }
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-luminano-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen flex-col bg-background text-foreground">
      
      {/* 글로벌 상단 내비 바 */}
      <header className="sticky top-0 z-40 bg-luminano-point/80 backdrop-blur border-b border-luminano-border py-4 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden">
            <LumiNanoIcon size={36} />
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">LumiNano</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5 bg-slate-800/20 dark:bg-slate-800/40 px-3 py-1.5 rounded-full border border-luminano-border">
            {user.profileImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={user.profileImage}
                alt="User Profile"
                className="w-6 h-6 rounded-full object-cover border border-luminano-accent/50"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-luminano-accent/20 text-luminano-accent font-bold text-xs flex items-center justify-center border border-luminano-accent/40">
                {(user.nickname || user.name || 'U').substring(0, 1)}
              </div>
            )}
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {user.displayName || user.nickname || user.name}님 환영합니다
            </span>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-transparent bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
        </div>
      </header>

      {/* 메인 영역 */}
      <main className="flex-1 max-w-5xl w-full mx-auto py-12 px-6 flex flex-col gap-8">
        
        {/* 대시보드 인트로 */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              내 워크스페이스
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
              협업하고 있는 기업용 워크스페이스를 선택하거나 새로 생성하세요.
            </p>
          </div>
          <button
            onClick={() => {
              setErrorMsg('');
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 text-white dark:text-slate-950 font-bold rounded-lg text-sm flex items-center gap-2 transition shadow-md shadow-luminano-accent/10 cursor-pointer border-0"
          >
            <Plus className="w-4 h-4" />
            새 워크스페이스
          </button>
        </div>

        {/* 워크스페이스 목록 그리드 */}
        {activeWorkspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-luminano-border rounded-2xl p-16 text-center bg-luminano-point">
            <Building2 className="w-12 h-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">소속된 워크스페이스가 없습니다</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mt-1.5 mb-6">
              새로운 워크스페이스를 만들거나, 동료에게 초대 링크를 받아 합류할 수 있습니다.
            </p>
            <button
              onClick={() => {
                setErrorMsg('');
                setIsModalOpen(true);
              }}
              className="px-4 py-2 border border-luminano-border hover:bg-slate-800/40 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold transition cursor-pointer bg-transparent"
            >
              워크스페이스 만들기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeWorkspaces.map((ws) => (
              <div
                key={ws.id}
                onClick={() => handleSelect(ws)}
                className="group relative bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer flex flex-col justify-between min-h-[160px] hover:border-luminano-accent"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    {ws.role && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        ws.role === 'OWNER' 
                          ? 'bg-luminano-accent/10 text-luminano-accent border border-luminano-accent/30' 
                          : 'bg-emerald-100 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
                      }`}>
                        {ws.role}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-foreground group-hover:text-luminano-accent transition mt-2">
                    {ws.name}
                  </h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">@{ws.domain || ws.id}.luminano.xyz</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-luminano-accent mt-4 group-hover:translate-x-1 transition duration-200">
                  입장하기
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🌐 추천 공개 워크스페이스 탐색 섹션 (요구사항 6번) */}
        <div className="mt-8 border-t border-luminano-border pt-8 flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              🌐 추천 공개 워크스페이스 탐색
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              공개(Public)로 설정된 오픈 워크스페이스를 탐색하고 가입 신청을 보낼 수 있습니다.
            </p>
          </div>

          {publicWorkspaces.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 bg-luminano-point/50 rounded-xl border border-luminano-border">
              현재 가입 가능한 추천 공개 워크스페이스가 없습니다.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicWorkspaces.map((pWs) => (
                <div
                  key={pWs.id}
                  className="bg-luminano-point border border-luminano-border rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[170px]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="w-9 h-9 bg-luminano-accent/10 text-luminano-accent rounded-lg flex items-center justify-center font-bold text-sm">
                        🌐
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50">
                        Public
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-1">
                      {pWs.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">@{pWs.domain || pWs.id}.luminano.xyz</span>
                    {pWs.description && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                        {pWs.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-luminano-border flex justify-between items-center">
                    <span className="text-[11px] text-slate-500 font-medium">
                      멤버 {pWs.memberCount || 1}명
                    </span>
                    {pWs.hasRequested ? (
                      <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg">
                        신청 대기 중
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRequestJoin(pWs.id)}
                        className="px-3 py-1.5 bg-luminano-accent hover:bg-luminano-accent/90 text-white dark:text-slate-950 rounded-lg text-xs font-bold transition cursor-pointer border-0"
                      >
                        즉시 가입
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 삭제 보관함 섹션 */}
        {deletedWorkspaces.length > 0 && (
          <div className="mt-8 border-t border-luminano-border pt-8 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <Trash2 className="w-5 h-5" />
                삭제 대기 중인 워크스페이스 (보관함)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                삭제 후 30일 이내인 경우 복구가 가능합니다. 최고 관리자(OWNER)만 복구를 수행할 수 있습니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deletedWorkspaces.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-red-500/5 border border-red-500/25 rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[160px]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/35 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900/50">
                        보관 중
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 mt-2">
                      {ws.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">@{ws.domain || ws.id}.luminano.xyz</span>
                  </div>
                  
                  {ws.role === 'OWNER' ? (
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (confirm(`'${ws.name}' 워크스페이스를 복구하시겠습니까?`)) {
                          try {
                            await restoreWorkspace(ws.id);
                            alert('워크스페이스가 성공적으로 복구되었습니다.');
                            await fetchWorkspaces();
                          } catch (err: any) {
                            alert(err.response?.data?.message || '복구에 실패했습니다.');
                          }
                        }
                      }}
                      className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer border-0"
                    >
                      복구하기
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-600 dark:text-slate-400 text-center italic mt-4 block">
                      복구 권한 없음 (소유자 전용)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 새 워크스페이스 생성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-luminano-point rounded-xl border border-luminano-border shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-luminano-border pb-3">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
                <Sparkles className="w-5 h-5 text-luminano-accent" />
                <h3 className="font-bold text-lg">워크스페이스 생성</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/20 text-red-400 border border-red-900/50 rounded-lg text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">회사/조직 이름</label>
                <input
                  type="text"
                  placeholder="예: Company"
                  value={wsName}
                  onChange={(e) => setWsName(e.target.value)}
                  className="w-full px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">접속 도메인 (영문식별자)</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="example"
                    value={wsDomain}
                    onChange={(e) => setWsDomain(e.target.value)}
                    className="flex-1 px-3 py-2 border border-luminano-border rounded-l-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                  />
                  <span className="px-3 py-2 border border-l-0 border-luminano-border bg-background rounded-r-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                    .luminano.xyz
                  </span>
                </div>
              </div>

              {/* Public / Private 설정 선택지 */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">공개 설정</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWsIsPrivate(true)}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold cursor-pointer transition ${
                      wsIsPrivate
                        ? 'bg-luminano-accent/10 border-luminano-accent text-luminano-accent'
                        : 'border-luminano-border text-slate-500 bg-transparent'
                    }`}
                  >
                    🔒 비공개 (Private)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWsIsPrivate(false)}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold cursor-pointer transition ${
                      !wsIsPrivate
                        ? 'bg-luminano-accent/10 border-luminano-accent text-luminano-accent'
                        : 'border-luminano-border text-slate-500 bg-transparent'
                    }`}
                  >
                    🌐 공개 (Public)
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  {wsIsPrivate
                    ? '초대받은 사용자만 접근 가능합니다.'
                    : '메인 대시보드 추천 목록에 노출되어 가입 신청을 받을 수 있습니다.'}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-2 border-t border-luminano-border pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-luminano-border hover:bg-slate-800/40 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition cursor-pointer bg-transparent"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 bg-luminano-accent hover:bg-luminano-accent/90 text-white dark:text-slate-950 font-bold rounded-lg text-xs transition cursor-pointer border-0 disabled:bg-luminano-accent/60"
                >
                  {creating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : '생성 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
