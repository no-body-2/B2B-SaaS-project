'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Building2, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { user, loading, login, register } = useAuth();
  
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
      setErrorMsg(err.response?.data?.message || '인증 처리에 실패했습니다. 입력값을 확인해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 justify-center items-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-800/80 p-8 flex flex-col gap-6">
        
        {/* 헤더 섹션 */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 bg-violet-650 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-50">
            Flude B2B 협업 플랫폼
          </h1>
          <p className="text-sm text-slate-400">
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
              <label className="text-xs font-semibold text-slate-350">이름</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="홍길동"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-800 rounded-lg text-sm bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-350">이메일 주소</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-800 rounded-lg text-sm bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-350">비밀번호</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-800 rounded-lg text-sm bg-slate-950 text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-600/60 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-2 transition shadow-md shadow-violet-500/10 cursor-pointer"
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

        {/* 풋터 링크 */}
        <div className="text-center text-xs text-slate-400 font-medium">
          {isLogin ? (
            <span>
              처음이신가요?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setErrorMsg('');
                }}
                className="text-violet-400 font-semibold hover:underline bg-transparent border-0 cursor-pointer"
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
                className="text-violet-400 font-semibold hover:underline bg-transparent border-0 cursor-pointer"
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
