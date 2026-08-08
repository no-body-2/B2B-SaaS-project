'use client';

import React, { useEffect, useState } from 'react';
import { adminApi } from '@/lib/api';
import {
  Building2,
  Search,
  Users,
  Globe,
  Lock,
  Unlock,
  Trash2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import SudoModal from '@/components/admin/SudoModal';

interface WorkspaceItem {
  id: string;
  name: string;
  domain: string | null;
  isPrivate: boolean;
  createdAt: string;
  deletedAt: string | null;
  _count?: {
    members: number;
  };
}

export default function AdminWorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Sudo Action State
  const [sudoModalOpen, setSudoModalOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);

  const fetchWorkspaces = async (currentPage = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const res = await adminApi.getWorkspaces({ page: currentPage, limit: 10, search: searchQuery });
      setWorkspaces(res.data.items);
      setTotalCount(res.data.totalCount);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch workspaces:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspaces(page, search);
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchWorkspaces(1, search);
  };

  const triggerToggleWorkspace = (id: string) => {
    setSelectedWorkspaceId(id);
    setSudoModalOpen(true);
  };

  const handleSudoSuccess = async (sudoVerifiedAt: number) => {
    if (!selectedWorkspaceId) return;

    try {
      await adminApi.toggleWorkspaceStatus(selectedWorkspaceId, sudoVerifiedAt);
      alert('워크스페이스 상태(정지/복구)가 변경되었습니다.');
      fetchWorkspaces(page, search);
    } catch (err: any) {
      alert(err.response?.data?.message || '워크스페이스 제어 실패');
    } finally {
      setSelectedWorkspaceId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-purple-400" />
            <span>전체 워크스페이스 관리</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            등록된 워크스페이스 테넌트를 관리하고 멤버 수, 공개 여부 및 상태를 관리합니다. (총 {totalCount}개)
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="워크스페이스 이름으로 검색하세요"
            className="w-full pl-10 pr-4 py-2.5 bg-[#0d121f] border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-purple-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition"
        >
          검색
        </button>
      </form>

      {/* Table */}
      <div className="bg-[#0d121f] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold select-none">
                <th className="p-4">워크스페이스명</th>
                <th className="p-4">도메인</th>
                <th className="p-4">소속 멤버 수</th>
                <th className="p-4">공개 범위</th>
                <th className="p-4">생성일시</th>
                <th className="p-4">상태</th>
                <th className="p-4 text-right">제어 (SUDO 연동)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-500" />
                    워크스페이스 정보를 불러오는 중입니다...
                  </td>
                </tr>
              ) : workspaces.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    등록된 워크스페이스가 없습니다.
                  </td>
                </tr>
              ) : (
                workspaces.map((w) => {
                  const isDeleted = w.deletedAt !== null;

                  return (
                    <tr key={w.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4 font-bold text-slate-100">{w.name}</td>
                      <td className="p-4 font-mono text-[11px] text-slate-400">
                        {w.domain ? `@${w.domain}` : '도메인 미설정'}
                      </td>
                      <td className="p-4 font-semibold text-purple-300">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-purple-400" />
                          {w._count?.members ?? 0} 명
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-900 border border-slate-800 text-slate-400">
                          {w.isPrivate ? <Lock className="w-3 h-3 text-amber-400" /> : <Unlock className="w-3 h-3 text-emerald-400" />}
                          {w.isPrivate ? '비공개 (Private)' : '공개 (Public)'}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">
                        {new Date(w.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            isDeleted
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}
                        >
                          {isDeleted ? '정지/삭제됨' : '정상 가동'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => triggerToggleWorkspace(w.id)}
                          className={`px-3 py-1.5 rounded-lg border text-[11px] font-medium transition flex items-center gap-1.5 ml-auto ${
                            isDeleted
                              ? 'border-emerald-800 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300'
                              : 'border-rose-800/80 bg-rose-950/60 hover:bg-rose-900 text-rose-300'
                          }`}
                        >
                          {isDeleted ? <RotateCcw className="w-3 h-3" /> : <Trash2 className="w-3 h-3" />}
                          <span>{isDeleted ? '워크스페이스 복구' : '워크스페이스 비활성화'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            페이지 {page} / {totalPages} (총 {totalCount}개)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <SudoModal
        isOpen={sudoModalOpen}
        onClose={() => setSudoModalOpen(false)}
        onSuccess={handleSudoSuccess}
        actionTitle="워크스페이스 상태 전환 SUDO 인증"
      />
    </div>
  );
}
