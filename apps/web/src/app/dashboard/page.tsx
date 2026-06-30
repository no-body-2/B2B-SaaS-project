'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import LumiNanoIcon from '../../components/LumiNanoIcon';
import { Building2, Plus, LogOut, Trash2, ArrowRight, Loader2, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user, loading: authLoading, logout, deleteAccount } = useAuth();
  const { 
    workspaces, 
    fetchWorkspaces, 
    selectWorkspace, 
    createWorkspace, 
    loadingWorkspace 
  } = useWorkspace();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wsName, setWsName] = useState('');
  const [wsDomain, setWsDomain] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [creating, setCreating] = useState(false);

  // 세션이 없으면 로그인 페이지로 튕겨냄
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  // 마운트 시 워크스페이스 목록 동기화
  useEffect(() => {
    if (user) {
      fetchWorkspaces();
    }
  }, [user, fetchWorkspaces]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!wsName || !wsDomain) {
      setErrorMsg('워크스페이스 이름과 도메인을 입력해 주세요.');
      return;
    }

    setWsName(wsName.trim());
    setWsDomain(wsDomain.trim());

    setCreating(true);
    try {
      await createWorkspace(wsName, wsDomain);
      setWsName('');
      setWsDomain('');
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || '생성에 실패했습니다. 한도를 초과했거나 중복 도메인입니다.');
    } finally {
      setCreating(false);
    }
  };

  const handleSelect = async (wsId: string) => {
    try {
      await selectWorkspace(wsId);
      router.push(`/workspace/${wsId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말로 탈퇴하시겠습니까? 데이터 복구가 불가능하며 모든 세션 정보가 무효화됩니다.')) {
      try {
        await deleteAccount();
        router.push('/');
      } catch (err) {
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
          <span className="font-bold text-lg tracking-tight text-foreground">LumiNano SaaS</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-350">
            {user.name}님 환영합니다
          </span>
          <button
            onClick={logout}
            className="p-2 text-slate-600 dark:text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-transparent bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </button>
          <button
            onClick={handleDeleteAccount}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800/50 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer border border-transparent bg-transparent"
            title="회원탈퇴"
          >
            <Trash2 className="w-4 h-4" />
            회원탈퇴
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
        {workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-luminano-border rounded-2xl p-16 text-center bg-luminano-point">
            <Building2 className="w-12 h-12 text-slate-500 mb-4" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">소속된 워크스페이스가 없습니다</h3>
            <p className="text-slate-600 dark:text-slate-450 text-sm max-w-sm mt-1.5 mb-6">
              새로운 워크스페이스를 만들거나, 동료에게 초대 링크를 받아 합류할 수 있습니다.
            </p>
            <button
              onClick={() => {
                setErrorMsg('');
                setIsModalOpen(true);
              }}
              className="px-4 py-2 border border-luminano-border hover:bg-slate-800/40 text-slate-700 dark:text-slate-350 rounded-lg text-sm font-semibold transition cursor-pointer bg-transparent"
            >
              워크스페이스 만들기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspaces.map((ws) => (
              <div
                key={ws.id}
                onClick={() => handleSelect(ws.id)}
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
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">@{ws.domain}.luminano.com</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-luminano-accent mt-4 group-hover:translate-x-1 transition duration-200">
                  입장하기
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 새 워크스페이스 생성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-luminano-point rounded-xl border border-luminano-border shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-luminano-border pb-3">
              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-150">
                <Sparkles className="w-5 h-5 text-luminano-accent" />
                <h3 className="font-bold text-lg">워크스페이스 생성</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-350 bg-transparent border-0 cursor-pointer text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-955/20 text-red-400 border border-red-900/50 rounded-lg text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">회사/조직 이름</label>
                <input
                  type="text"
                  placeholder="예: 구글 코리아"
                  value={wsName}
                  onChange={(e) => setWsName(e.target.value)}
                  className="w-full px-3 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">접속 도메인 (영문식별자)</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="google"
                    value={wsDomain}
                    onChange={(e) => setWsDomain(e.target.value)}
                    className="flex-1 px-3 py-2 border border-luminano-border rounded-l-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                  />
                  <span className="px-3 py-2 border border-l-0 border-luminano-border bg-background rounded-r-lg text-xs font-mono text-slate-600 dark:text-slate-400">
                    .luminano.com
                  </span>
                </div>
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
