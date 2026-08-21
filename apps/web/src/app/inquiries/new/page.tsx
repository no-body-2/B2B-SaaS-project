'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { inquiryApi } from '../../../lib/api';
import LumiNanoIcon from '../../../components/LumiNanoIcon';
import ThemeToggle from '../../../components/ThemeToggle';
import {
  HelpCircle,
  Lock,
  ArrowLeft,
  Loader2,
  Send,
} from 'lucide-react';

export default function NewInquiryPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !content.trim()) {
      setErrorMsg('제목과 내용을 모두 입력해 주세요.');
      return;
    }

    setSubmitting(true);
    try {
      await inquiryApi.create({
        title: title.trim(),
        content: content.trim(),
        isSecret,
      });
      router.push('/inquiries');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || '문의글 등록에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition">
            <LumiNanoIcon className="w-8 h-8 text-indigo-400" />
            <span className="font-bold text-xl bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              LumiNano
            </span>
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/inquiries" className="flex items-center gap-1.5 font-medium text-slate-300 hover:text-white transition">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            문의사항 게시판
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 text-sm">새 문의글</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/inquiries"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            목록으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-3xl w-full mx-auto p-6 md:p-10">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
            <HelpCircle className="w-6 h-6 text-indigo-400" />
            새 문의글 작성하기
          </h1>

          {errorMsg && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                문의 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요 (예: 기능 제안 / 오류 문의)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition"
                maxLength={100}
                required
              />
            </div>

            {/* Secret Checkbox Option */}
            <div className="flex items-center gap-3 p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <input
                type="checkbox"
                id="secret-checkbox"
                checked={isSecret}
                onChange={(e) => setIsSecret(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700 focus:ring-indigo-500"
              />
              <label htmlFor="secret-checkbox" className="text-sm font-medium text-slate-300 flex items-center gap-2 cursor-pointer select-none">
                <Lock className="w-4 h-4 text-amber-400" />
                비밀글로 등록하기
                <span className="text-xs font-normal text-slate-500">(작성자 본인과 최고 관리자만 내용 열람 가능)</span>
              </label>
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                문의 본문 내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="문의 내용을 상세히 작성해 주세요."
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition resize-none"
                required
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Link
                href="/inquiries"
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition font-medium"
              >
                취소
              </Link>

              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition shadow-lg shadow-indigo-600/30"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    등록하는 중...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    문의글 등록
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
