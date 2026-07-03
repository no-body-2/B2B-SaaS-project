'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import LumiNanoIcon from '../components/LumiNanoIcon';
import { Building2, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading, login, register, googleLogin } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 이미 로그인한 경우 대시보드로 자동 이동
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    if (!email || !password || (!isLogin && !name)) {
      setErrorMsg('모든 필수 정보를 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
        router.push('/dashboard');
      } else {
        await register(email, password, name);
        setIsLogin(true);
        setErrorMsg('회원가입이 완료되었습니다. 로그인을 진행해 주세요.');
        setPassword('');
      }
    } catch (err: any) {
      console.error(err);
      const rawMsg = err.response?.data?.message;
      const parsedMsg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
      setErrorMsg(parsedMsg || '인증 처리에 실패했습니다. 입력값을 확인해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg('');
    setSubmitting(true);
    try {
      await googleLogin('mock-google-authorization-code-1234');
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      const rawMsg = err.response?.data?.message;
      const parsedMsg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
      setErrorMsg(parsedMsg || 'Google 로그인 처리 도중 에러가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-luminano-accent" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen bg-background justify-center items-center p-4">
      <div className="w-full max-w-md bg-luminano-point rounded-2xl shadow-2xl border border-luminano-border p-8 flex flex-col gap-6">
        
        {/* 헤더 섹션 */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-luminano-accent/10 overflow-hidden">
            <LumiNanoIcon size={48} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            LumiNano B2B 협업 플랫폼
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isLogin 
              ? '워크스페이스에 로그인하여 문서를 협업하고 실시간으로 채팅하세요.' 
              : '새로운 회사 계정을 생성하고 결재 워크플로우를 가동해 보세요.'}
          </p>
        </div>

        {/* 오류 메시지 */}
        {errorMsg && (
          <div className={`p-3 rounded-lg text-xs font-semibold border ${
            errorMsg.includes('완료') 
              ? 'bg-emerald-950/20 text-emerald-400 border-emerald-900/50' 
              : 'bg-red-950/20 text-red-400 border-red-900/50'
          }`}>
            {errorMsg}
          </div>
        )}

        {/* 폼 양식 */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">이름</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">이메일 주소</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-350">비밀번호</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-luminano-border rounded-lg text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-luminano-accent/20 focus:border-luminano-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-slate-950 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition shadow-md shadow-luminano-accent/10 cursor-pointer border-0"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                {isLogin ? '로그인' : '회원가입 완료'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 구글 로그인 구분선 및 버튼 */}
        <div className="flex flex-col gap-3">
          <div className="relative flex py-1.5 items-center">
            <div className="flex-grow border-t border-luminano-border"></div>
            <span className="flex-shrink mx-4 text-[10px] text-slate-500 font-semibold uppercase">또는</span>
            <div className="flex-grow border-t border-luminano-border"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer border border-luminano-border"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google 계정으로 계속하기
          </button>
        </div>

        {/* 풋터 링크 */}
        <div className="text-center text-xs text-slate-600 dark:text-slate-400 font-medium">
          {isLogin ? (
            <span>
              처음이신가요?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setErrorMsg('');
                }}
                className="text-luminano-accent font-semibold hover:underline bg-transparent border-0 cursor-pointer"
              >
                무료 계정 생성하기
              </button>
            </span>
          ) : (
            <span>
              이미 계정이 있으신가요?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setErrorMsg('');
                }}
                className="text-luminano-accent font-semibold hover:underline bg-transparent border-0 cursor-pointer"
              >
                로그인 화면으로 이동
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
