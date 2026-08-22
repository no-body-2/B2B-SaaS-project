'use client';

import React, { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../context/AuthContext';
import { inquiryApi } from '../../../lib/api';
import LumiNanoIcon from '../../../components/LumiNanoIcon';
import ThemeToggle from '../../../components/ThemeToggle';
import {
  HelpCircle,
  Lock,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Loader2,
  Trash2,
  ShieldCheck,
  Send,
  User as UserIcon,
} from 'lucide-react';

interface InquiryDetail {
  id: string;
  title: string;
  content: string;
  isSecret: boolean;
  status: 'PENDING' | 'ANSWERED';
  answer?: string | null;
  answeredAt?: string | null;
  createdAt: string;
  authorId: string;
  author?: {
    id: string;
    email: string;
    nickname?: string;
    firstName?: string;
    lastName?: string;
    systemRole?: string;
  };
}

export default function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const inquiryId = resolvedParams.id;
  const router = useRouter();
  const { user } = useAuth();

  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // SUPER_ADMIN 답변 작성 상태
  const [answerInput, setAnswerInput] = useState('');
  const [answering, setAnswering] = useState(false);
  const [answerError, setAnswerError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const fetchDetail = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await inquiryApi.getDetail(inquiryId);
      setInquiry(res.data);
      if (res.data?.answer) {
        setAnswerInput(res.data.answer);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        err.response?.data?.message ||
          '문의글을 불러올 수 없습니다. 비밀글인 경우 작성자 본인 및 관리자만 열람 가능합니다.',
      );
    } finally {
      setLoading(false);
    }
  }, [inquiryId]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // SUPER_ADMIN 답변 등록 핸들러
  const handleAnswerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAnswerError('');

    if (!answerInput.trim()) {
      setAnswerError('답변 내용을 입력해 주세요.');
      return;
    }

    setAnswering(true);
    try {
      await inquiryApi.answer(inquiryId, answerInput.trim());
      await fetchDetail();
    } catch (err: any) {
      console.error(err);
      setAnswerError(
        err.response?.data?.message || '답변 등록에 실패했습니다. 권한을 확인해 주세요.',
      );
    } finally {
      setAnswering(false);
    }
  };

  // 문의글 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('정말로 이 문의글을 삭제하시겠습니까?')) return;

    setDeleting(true);
    try {
      await inquiryApi.delete(inquiryId);
      router.push('/inquiries');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || '문의글 삭제에 실패했습니다.');
    } finally {
      setDeleting(false);
    }
  };

  const isSuperAdmin = (user as any)?.systemRole === 'SUPER_ADMIN';
  const isAuthor = (user as any)?.userId === inquiry?.authorId || user?.id === inquiry?.authorId;
  const canDelete = isAuthor || isSuperAdmin;

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
          <span className="text-slate-400 text-sm">상세보기</span>
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

      {/* Main Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <p className="text-sm">문의글을 가져오는 중...</p>
          </div>
        ) : errorMsg ? (
          <div className="border border-rose-500/30 bg-rose-500/10 p-8 rounded-2xl text-center">
            <Lock className="w-12 h-12 text-rose-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-rose-200">접근 제한 안내</h3>
            <p className="text-sm text-rose-300/80 mt-2 max-w-md mx-auto">{errorMsg}</p>
            <Link
              href="/inquiries"
              className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl transition"
            >
              <ArrowLeft className="w-4 h-4" />
              목록으로 돌아가기
            </Link>
          </div>
        ) : inquiry ? (
          <div className="space-y-6">
            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  {inquiry.status === 'ANSWERED' ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      답변 완료
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      답변 대기
                    </span>
                  )}

                  {inquiry.isSecret && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-amber-400/10 text-amber-400 text-xs font-medium rounded-md border border-amber-400/20">
                      <Lock className="w-3 h-3" />
                      비밀글
                    </span>
                  )}
                </div>

                {canDelete && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    삭제하기
                  </button>
                )}
              </div>

              {/* Title & Metadata */}
              <h1 className="text-xl sm:text-2xl font-bold text-white mt-5">
                {inquiry.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-slate-400 mt-3 pb-6 border-b border-slate-800/80">
                <span className="flex items-center gap-1">
                  <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                  작성자: {inquiry.author?.nickname || inquiry.author?.firstName || inquiry.author?.email || '익명'}
                </span>
                <span>•</span>
                <span>작성일: {new Date(inquiry.createdAt).toLocaleString()}</span>
              </div>

              {/* Content Body */}
              <div className="py-6 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                {inquiry.content}
              </div>
            </div>

            {/* Official Answer Section */}
            {inquiry.answer && (
              <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-4 mb-4">
                  <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-400" />
                    최고 관리자(SUPER_ADMIN) 공식 답변
                  </h3>

                  {inquiry.answeredAt && (
                    <span className="text-xs text-slate-400">
                      답변일시: {new Date(inquiry.answeredAt).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {inquiry.answer}
                </div>
              </div>
            )}

            {/* SUPER_ADMIN Answer Editor Box */}
            {isSuperAdmin && (
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  SUPER_ADMIN 답변 작성 / 수정
                </h3>

                {answerError && (
                  <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
                    {answerError}
                  </div>
                )}

                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                  <textarea
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="사용자 문의에 대한 공식 답변을 작성해 주세요."
                    rows={5}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:border-amber-500 transition resize-none"
                    required
                  />

                  <div className="flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={answering}
                      className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm rounded-xl transition shadow-lg shadow-amber-500/20"
                    >
                      {answering ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          답변 등록 중...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          공식 답변 등록/수정
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
}
