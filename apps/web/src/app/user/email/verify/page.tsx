'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '../../../../lib/api';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

function EmailVerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const doVerify = async () => {
      if (!token) {
        setErrorMsg('인증 토큰이 누락되었습니다. 메일 링크를 다시 확인해주세요.');
        setLoading(false);
        return;
      }

      try {
        await apiClient.user.verifyEmailChange(token);
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 2500);
      } catch (err: any) {
        console.error(err);
        setErrorMsg(err.response?.data?.message || '이메일 인증 변경 처리에 실패했습니다. 이미 처리되었거나 만료된 토큰입니다.');
      } finally {
        setLoading(false);
      }
    };

    doVerify();
  }, [token, router]);

  return (
    <div className="w-full max-w-md bg-luminano-point rounded-2xl shadow-2xl border border-luminano-border p-8 flex flex-col gap-6 text-center">
      <h2 className="text-xl font-bold text-foreground">이메일 주소 변경 인증</h2>
      
      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 p-4">
          <Loader2 className="w-8 h-8 animate-spin text-luminano-accent" />
          <span className="text-xs text-slate-500 font-semibold">인증 토큰을 검증하는 중입니다...</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-red-950/20 text-red-400 border border-red-900/50 rounded-lg text-xs font-semibold flex items-center gap-2 justify-center">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-950/20 text-emerald-400 border border-emerald-900/50 rounded-lg text-sm font-semibold flex flex-col items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          <span>이메일 주소 변경 승인이 완료되었습니다! 잠시 후 대시보드로 자동 이동합니다.</span>
        </div>
      )}

      {!loading && !success && (
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition cursor-pointer border-0"
        >
          대시보드로 돌아가기
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default function EmailVerifyPage() {
  return (
    <div className="flex flex-1 min-h-screen bg-background justify-center items-center p-4">
      <Suspense fallback={
        <div className="flex items-center justify-center p-8 bg-luminano-point border border-luminano-border rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-luminano-accent" />
        </div>
      }>
        <EmailVerifyForm />
      </Suspense>
    </div>
  );
}
