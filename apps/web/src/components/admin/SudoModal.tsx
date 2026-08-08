'use client';

import React, { useState } from 'react';
import { adminApi } from '@/lib/api';
import { ShieldAlert, KeyRound, X, Loader2 } from 'lucide-react';

interface SudoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (sudoVerifiedAt: number) => void;
  actionTitle?: string;
}

export default function SudoModal({
  isOpen,
  onClose,
  onSuccess,
  actionTitle = '민감 작업 수행',
}: SudoModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await adminApi.verifySudo(password);
      const sudoVerifiedAt = res.data.sudoVerifiedAt;
      sessionStorage.setItem('sudoVerifiedAt', String(sudoVerifiedAt));
      onSuccess(sudoVerifiedAt);
      setPassword('');
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || '비밀번호 재인증에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-base">
            <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
            <span>SUDO 보안 재인증</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-slate-100">{actionTitle}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              민감한 시스템 작업을 안전하게 진행하기 위해 현재 SuperAdmin 계정의 비밀번호를 재입력해 주세요. (인증은 5분간 유지됩니다.)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-300">비밀번호 확인</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                autoFocus
                className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-medium transition"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading || !password}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-lg shadow-rose-950/30 flex items-center gap-2 transition"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>SUDO 인증 완료</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
