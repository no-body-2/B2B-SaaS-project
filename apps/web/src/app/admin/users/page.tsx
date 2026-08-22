'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { adminApi, setAccessToken } from '@/lib/api';
import { useRouter } from 'next/navigation';
import {
  Users,
  Search,
  Download,
  Shield,
  UserCheck,
  UserX,
  UserCog,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import SudoModal from '@/components/admin/SudoModal';

interface UserItem {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string | null;
  systemRole: string;
  provider: string;
  createdAt: string;
  deletedAt: string | null;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Sudo Modal Pending Action State
  const [sudoModalOpen, setSudoModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'ROLE' | 'STATUS' | 'IMPERSONATE';
    userId: string;
    targetRole?: string;
  } | null>(null);

  const fetchUsers = useCallback(async (currentPage = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers({ page: currentPage, limit: 10, search: searchQuery });
      setUsers(res.data.items);
      setTotalCount(res.data.totalCount);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page, search);
  }, [page, search, fetchUsers]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsers(1, search);
  };

  const triggerSudoAction = (action: { type: 'ROLE' | 'STATUS' | 'IMPERSONATE'; userId: string; targetRole?: string }) => {
    setPendingAction(action);
    setSudoModalOpen(true);
  };

  const handleSudoSuccess = async (sudoVerifiedAt: number) => {
    if (!pendingAction) return;

    try {
      if (pendingAction.type === 'ROLE' && pendingAction.targetRole) {
        await adminApi.updateUserRole(pendingAction.userId, pendingAction.targetRole, sudoVerifiedAt);
        alert('사용자 시스템 권한이 성공적으로 수정되었습니다.');
      } else if (pendingAction.type === 'STATUS') {
        await adminApi.toggleUserStatus(pendingAction.userId, sudoVerifiedAt);
        alert('사용자 상태(정지/복구)가 성공적으로 전환되었습니다.');
      } else if (pendingAction.type === 'IMPERSONATE') {
        const res = await adminApi.impersonateUser(pendingAction.userId, sudoVerifiedAt);
        const { accessToken, targetUser } = res.data;
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
        alert(`[대행 로그인 성공] ${targetUser.email || targetUser.firstName} 님으로 전환합니다.`);
        router.push('/dashboard');
        return;
      }
      fetchUsers(page, search);
    } catch (err: any) {
      alert(err.response?.data?.message || '작업 수행 중 오류가 발생했습니다.');
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <Users className="w-6 h-6 text-indigo-400" />
            <span>전체 사용자 관리</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            등록된 사용자를 조회하고 SuperAdmin 권한 설정, 계정 정지 및 대행 로그인을 제어합니다. (총 {totalCount}명)
          </p>
        </div>

        <a
          href={adminApi.exportUsersCsvUrl}
          download
          className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center gap-2 transition self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-indigo-400" />
          <span>전체 유저 CSV 내보내기</span>
        </a>
      </div>

      {/* Search Filter */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이메일 또는 이름으로 검색하세요"
            className="w-full pl-10 pr-4 py-2.5 bg-[#0d121f] border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
        >
          검색
        </button>
      </form>

      {/* Data Table */}
      <div className="bg-[#0d121f] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold select-none">
                <th className="p-4">사용자 (Email / Name)</th>
                <th className="p-4">System Role</th>
                <th className="p-4">인증 방식</th>
                <th className="p-4">가입일시</th>
                <th className="p-4">상태</th>
                <th className="p-4 text-right">제어 (SUDO 연동)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-indigo-500" />
                    사용자 정보를 불러오는 중입니다...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    조건에 일치하는 사용자가 없습니다.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isSuperAdmin = u.systemRole === 'SUPER_ADMIN';
                  const isSuspended = u.deletedAt !== null;

                  return (
                    <tr key={u.id} className="hover:bg-slate-900/40 transition">
                      <td className="p-4">
                        <div className="font-semibold text-slate-100">{u.firstName} {u.lastName || ''}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email || 'Email 미등록'}</div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                            isSuperAdmin
                              ? 'bg-purple-950/80 border-purple-800 text-purple-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          {u.systemRole}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                          {u.provider}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-mono text-[11px]">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                            isSuspended
                              ? 'bg-rose-950 text-rose-400 border border-rose-800'
                              : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          }`}
                        >
                          {isSuspended ? <UserX className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                          {isSuspended ? '정지됨 (Soft Deleted)' : '정상 (Active)'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* Role Toggle Button */}
                          <button
                            onClick={() =>
                              triggerSudoAction({
                                type: 'ROLE',
                                userId: u.id,
                                targetRole: isSuperAdmin ? 'USER' : 'SUPER_ADMIN',
                              })
                            }
                            className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium transition flex items-center gap-1"
                            title="SuperAdmin 권한 변경"
                          >
                            <Shield className="w-3 h-3 text-purple-400" />
                            <span>{isSuperAdmin ? 'USER로 변경' : 'SUPER_ADMIN 승격'}</span>
                          </button>

                          {/* Suspend/Restore Button */}
                          <button
                            onClick={() =>
                              triggerSudoAction({
                                type: 'STATUS',
                                userId: u.id,
                              })
                            }
                            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition flex items-center gap-1 ${
                              isSuspended
                                ? 'border-emerald-800 bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300'
                                : 'border-rose-800/80 bg-rose-950/60 hover:bg-rose-900 text-rose-300'
                            }`}
                          >
                            {isSuspended ? '계정 복구' : '계정 정지'}
                          </button>

                          {/* Impersonate Button */}
                          <button
                            onClick={() =>
                              triggerSudoAction({
                                type: 'IMPERSONATE',
                                userId: u.id,
                              })
                            }
                            className="px-2.5 py-1.5 rounded-lg border border-indigo-800 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 text-[11px] font-semibold transition flex items-center gap-1"
                            title="사용자 대행 로그인"
                          >
                            <UserCog className="w-3 h-3" />
                            <span>대행 로그인</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>
            페이지 {page} / {totalPages} (총 {totalCount}건)
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

      {/* Sudo Modal for Actions */}
      <SudoModal
        isOpen={sudoModalOpen}
        onClose={() => setSudoModalOpen(false)}
        onSuccess={handleSudoSuccess}
        actionTitle={
          pendingAction?.type === 'ROLE'
            ? '사용자 권한 수정 SUDO 인증'
            : pendingAction?.type === 'STATUS'
            ? '사용자 상태 변경 SUDO 인증'
            : '사용자 대행 로그인 SUDO 인증'
        }
      />
    </div>
  );
}
