'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiClient } from '../../../../lib/api';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

function AcceptInviteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token) {
      setErrorMsg('초대 토큰이 존재하지 않습니다. 이메일 링크를 확인해 주세요.');
    }
  }, [token]);

  const handleAccept = async () => {
    if (!token) return;
    setLoading(true);
    setErrorMsg('');

    try {
      await apiClient.members.acceptInvite({ token });
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || '초대 수락 처리에 실패했습니다. 만료되었거나 유효하지 않은 토큰입니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-luminano-point rounded-2xl shadow-2xl border border-luminano-border p-8 flex flex-col gap-6 text-center">
      <h2 className="text-xl font-bold text-foreground">워크스페이스 초대장 수령</h2>
      <p className="text-sm text-slate-600 dark:text-slate-400">
        팀이 보낸 메일을 통해 문서를 공유하고 실시간 협업에 참여하세요.
      </p>

      {errorMsg && (
        <div className="p-3 bg-red-950/20 text-red-400 border border-red-900/50 rounded-lg text-xs font-semibold flex items-center gap-2 justify-center">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {success ? (
        <div className="p-4 bg-emerald-950/20 text-emerald-400 border border-emerald-900/50 rounded-lg text-sm font-semibold flex flex-col items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          <span>초대를 성공적으로 수락하여 워크스페이스에 합류했습니다! 잠시 후 대시보드로 이동합니다.</span>
        </div>
      ) : (
        <button
          onClick={handleAccept}
          disabled={loading || !token}
          className="w-full py-3 bg-luminano-accent hover:bg-luminano-accent/90 disabled:bg-luminano-accent/60 text-slate-950 font-bold rounded-lg text-sm flex items-center justify-center gap-2 transition cursor-pointer border-0"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              초대 수락 및 합류하기
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <div className="flex flex-1 min-h-screen bg-background justify-center items-center p-4">
      <Suspense fallback={
        <div className="flex items-center justify-center p-8 bg-luminano-point border border-luminano-border rounded-2xl">
          <Loader2 className="w-6 h-6 animate-spin text-luminano-accent" />
        </div>
      }>
        <AcceptInviteForm />
      </Suspense>
    </div>
  );
}
