'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldCheck, AlertCircle } from 'lucide-react';

function GitHubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { githubLogin } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const isExecutingRef = React.useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setErrorMsg('GitHub 로그인 인증이 취소되었거나 거부되었습니다.');
      setTimeout(() => router.replace('/'), 2000);
      return;
    }

    if (code) {
      if (isExecutingRef.current) return;
      isExecutingRef.current = true;

      const currentRedirectUri =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/github/callback`
          : undefined;

      githubLogin(code, currentRedirectUri)
        .then(() => {
          router.replace('/dashboard');
        })
        .catch((err: any) => {
          console.error('[GitHub OAuth Callback Error]', err);
          const rawMsg = err.response?.data?.message;
          const parsedMsg = Array.isArray(rawMsg) ? rawMsg.join(', ') : rawMsg;
          setErrorMsg(parsedMsg || 'GitHub 로그인 처리 중 오류가 발생했습니다.');
          setTimeout(() => router.replace('/?error=github_auth_failed'), 3000);
        });
    } else {
      router.replace('/');
    }
  }, [searchParams, githubLogin, router]);

  return (
    <div className="w-full max-w-sm p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center space-y-4">
      {errorMsg ? (
        <div className="space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto animate-bounce" />
          <h3 className="text-sm font-bold text-rose-300">인증 실패</h3>
          <p className="text-xs text-slate-400">{errorMsg}</p>
          <p className="text-[11px] text-slate-500">잠시 후 메인 화면으로 이동합니다...</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mx-auto text-slate-300">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100">GitHub 계정 인증 중</h3>
            <p className="text-xs text-slate-400 mt-1">
              GitHub 인증 서버와 토큰을 안전하게 교환하고 있습니다.
            </p>
          </div>
          <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto" />
        </div>
      )}
    </div>
  );
}

export default function GitHubCallbackPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#070a11] text-slate-100 p-4">
      <Suspense
        fallback={
          <div className="w-full max-w-sm p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-center">
            <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto" />
          </div>
        }
      >
        <GitHubCallbackContent />
      </Suspense>
    </div>
  );
}
