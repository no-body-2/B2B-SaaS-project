'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { adminApi } from '@/lib/api';
import {
  Users,
  Building2,
  FileText,
  HardDrive,
  Activity,
  Megaphone,
  Download,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import SudoModal from '@/components/admin/SudoModal';

interface DashboardStats {
  totalUsers: number;
  totalWorkspaces: number;
  totalFiles: number;
  totalStorageBytes: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Broadcast Notice Modal state
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeType, setNoticeType] = useState<'INFO' | 'MAINTENANCE'>('INFO');
  const [noticeLoading, setNoticeLoading] = useState(false);
  const [noticeSuccess, setNoticeSuccess] = useState(false);

  // Sudo Modal state for Notice Creation
  const [sudoModalOpen, setSudoModalOpen] = useState(false);

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, healthRes] = await Promise.allSettled([
        adminApi.getStats(),
        adminApi.getHealth(),
      ]);

      if (statsRes.status === 'fulfilled') {
        setStats(statsRes.value.data);
      }
      if (healthRes.status === 'fulfilled') {
        setHealth(healthRes.value.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const handleCreateNoticeSubmit = async (sudoVerifiedAt: number) => {
    setNoticeLoading(true);
    try {
      await adminApi.createNotice(
        { title: noticeTitle, content: noticeContent, type: noticeType },
        sudoVerifiedAt,
      );
      setNoticeSuccess(true);
      setNoticeTitle('');
      setNoticeContent('');
      setTimeout(() => {
        setNoticeSuccess(false);
        setNoticeModalOpen(false);
      }, 1500);
    } catch (err: any) {
      alert(err.response?.data?.message || '공지 등록에 실패했습니다.');
    } finally {
      setNoticeLoading(false);
    }
  };

  return (
    <div className="space-[#1.5] max-w-7xl mx-auto space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            플랫폼 종합 대시보드
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            LumiNano 시스템 전체 지표, 서비스 헬스 스태터스 및 전역 관리를 제어합니다.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 rounded-xl border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>새로고침</span>
          </button>

          <a
            href={adminApi.exportUsersCsvUrl}
            download
            className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition"
          >
            <Download className="w-3.5 h-3.5 text-indigo-400" />
            <span>유저 CSV 내보내기</span>
          </a>

          <button
            onClick={() => setNoticeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950/40 flex items-center gap-2 transition"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>전역 공지/점검 발행</span>
          </button>
        </div>
      </div>

      {/* Main Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Users */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">전체 가입 유저</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 tracking-tight">
            {loading ? '-' : stats?.totalUsers.toLocaleString() || '0'}
          </div>
          <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>정상 등록된 계정</span>
          </div>
        </div>

        {/* Card 2: Total Workspaces */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">생성된 워크스페이스</span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 tracking-tight">
            {loading ? '-' : stats?.totalWorkspaces.toLocaleString() || '0'}
          </div>
          <div className="text-[11px] font-medium text-purple-300">
            활성 테넌트 그룹
          </div>
        </div>

        {/* Card 3: Total Files */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">업로드 파일 개수</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-100 tracking-tight">
            {loading ? '-' : stats?.totalFiles.toLocaleString() || '0'}
          </div>
          <div className="text-[11px] font-medium text-cyan-300">
            S3 파일 메타데이터
          </div>
        </div>

        {/* Card 4: Total Storage Bytes */}
        <div className="p-5 rounded-2xl bg-[#0d121f] border border-slate-800/80 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">S3 스토리지를 사용한 용량</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">
            {loading ? '-' : formatBytes(stats?.totalStorageBytes || 0)}
          </div>
          <div className="text-[11px] font-medium text-slate-400">
            AWS S3 저장소 총합
          </div>
        </div>
      </div>

      {/* System Health Section */}
      <div className="p-6 rounded-2xl bg-[#0d121f] border border-slate-800/80 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-slate-100">시스템 헬스 모니터링</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">NestJS Terminus Health Indicator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div>
                <div className="text-xs font-bold text-slate-200">PostgreSQL Database (Prisma)</div>
                <div className="text-[11px] text-slate-400">주 데이터베이스 연결 상태</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-[11px] font-semibold">
              {health?.details?.database?.status === 'up' ? 'UP (Healthy)' : 'Operational'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-indigo-400 animate-ping" />
              <div>
                <div className="text-xs font-bold text-slate-200">Winston Log Engine</div>
                <div className="text-[11px] text-slate-400">Daily Rotate File 수집 상태</div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-[11px] font-semibold">
              Active / Rolling
            </span>
          </div>
        </div>
      </div>

      {/* Broadcast Notice Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-base">
                <Megaphone className="w-5 h-5" />
                <span>전역 공지 / 점검 모드 등록</span>
              </div>
              <button
                onClick={() => setNoticeModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-xs font-medium"
              >
                닫기
              </button>
            </div>

            {noticeSuccess ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
                <div className="text-base font-bold text-slate-100">전역 공지가 성공적으로 등록되었습니다.</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">공지 유형</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNoticeType('INFO')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
                        noticeType === 'INFO'
                          ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      💡 일반 안내 공지 (INFO)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNoticeType('MAINTENANCE')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
                        noticeType === 'MAINTENANCE'
                          ? 'bg-rose-950 border-rose-600 text-rose-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      🚨 시스템 점검 안내 (MAINTENANCE)
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">제목</label>
                  <input
                    type="text"
                    value={noticeTitle}
                    onChange={(e) => setNoticeTitle(e.target.value)}
                    placeholder="공지사항 제목을 입력하세요"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">내용</label>
                  <textarea
                    rows={4}
                    value={noticeContent}
                    onChange={(e) => setNoticeContent(e.target.value)}
                    placeholder="공지 내용을 입력하세요"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setNoticeModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-medium text-slate-400"
                  >
                    취소
                  </button>
                  <button
                    onClick={() => setSudoModalOpen(true)}
                    disabled={!noticeTitle || !noticeContent}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-50"
                  >
                    SUDO 인증 후 등록
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sudo Modal for Notice Creation */}
      <SudoModal
        isOpen={sudoModalOpen}
        onClose={() => setSudoModalOpen(false)}
        onSuccess={handleCreateNoticeSubmit}
        actionTitle="전역 공지사항 등록 권한 인증"
      />
    </div>
  );
}
