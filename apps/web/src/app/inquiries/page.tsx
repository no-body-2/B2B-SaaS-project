'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { inquiryApi } from '../../lib/api';
import LumiNanoIcon from '../../components/LumiNanoIcon';
import ThemeToggle from '../../components/ThemeToggle';
import {
  HelpCircle,
  PlusCircle,
  Lock,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

interface InquiryItem {
  id: string;
  title: string;
  content: string;
  isSecret: boolean;
  status: 'PENDING' | 'ANSWERED';
  answer?: string | null;
  answeredAt?: string | null;
  createdAt: string;
  author?: {
    id: string;
    email: string;
    nickname?: string;
    firstName?: string;
    lastName?: string;
  };
}

export default function InquiryListPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await inquiryApi.list();
      setInquiries(res.data || []);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('문의글 목록을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

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
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            문의사항 게시판
          </span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            대시보드로 돌아가기
          </Link>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10">
        {/* Banner Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/20 p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
              고객지원 & 1:1 문의 게시판
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              서비스 이용 관련 질문이나 피드백을 남겨주시면 최고 관리자(SUPER_ADMIN)가 답변해 드립니다.
            </p>
          </div>

          <Link
            href="/inquiries/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl transition shadow-lg shadow-indigo-600/30 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            새 문의글 작성
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
            <p className="text-sm">문의글 목록을 불러오는 중...</p>
          </div>
        ) : errorMsg ? (
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-xl text-sm text-center">
            {errorMsg}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="border border-dashed border-slate-800 rounded-2xl p-12 text-center bg-slate-900/40">
            <HelpCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">등록된 문의사항이 없습니다.</h3>
            <p className="text-xs text-slate-500 mt-1">궁금한 점이 있으시다면 첫 문의글을 남겨보세요!</p>
          </div>
        ) : (
          /* Inquiry Table List */
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="divide-y divide-slate-800/80">
              {inquiries.map((item) => {
                const authorName =
                  item.author?.nickname ||
                  item.author?.firstName ||
                  item.author?.email ||
                  '익명';

                return (
                  <Link
                    key={item.id}
                    href={`/inquiries/${item.id}`}
                    className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-800/50 transition group"
                  >
                    <div className="flex items-start gap-3 min-w-0 pr-4">
                      {item.isSecret ? (
                        <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <MessageSquare className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-medium text-slate-200 group-hover:text-indigo-300 transition truncate">
                            {item.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span>작성자: {authorName}</span>
                          <span>•</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="shrink-0 flex items-center gap-2">
                      {item.status === 'ANSWERED' ? (
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
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
