'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { adminApi } from '@/lib/api';
import {
  ScrollText,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Clock,
  Laptop,
  UserCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface AuditLogItem {
  id: string;
  adminId: string;
  action: string;
  targetId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  details: any;
  createdAt: string;
  admin?: {
    email: string | null;
    firstName: string;
  };
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const fetchAuditLogs = useCallback(async (currentPage = 1, filter = '') => {
    setLoading(true);
    try {
      const res = await adminApi.getAuditLogs({ page: currentPage, limit: 15, action: filter });
      setLogs(res.data.items);
      setTotalCount(res.data.totalCount);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuditLogs(page, actionFilter);
  }, [page, actionFilter, fetchAuditLogs]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchAuditLogs(1, actionFilter);
  };

  const getActionBadgeColor = (action: string) => {
    if (action.includes('ROLE')) return 'bg-purple-950/80 border-purple-800 text-purple-300';
    if (action.includes('DELETE') || action.includes('SUSPEND'))
      return 'bg-rose-950/80 border-rose-800 text-rose-300';
    if (action.includes('RESTORE') || action.includes('SUCCESS'))
      return 'bg-emerald-950/80 border-emerald-800 text-emerald-300';
    if (action.includes('IMPERSONATE')) return 'bg-indigo-950/80 border-indigo-800 text-indigo-300';
    return 'bg-slate-900 border-slate-800 text-slate-300';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2.5">
            <ScrollText className="w-6 h-6 text-emerald-400" />
            <span>시스템 감사 로그 (Audit Logs)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            SuperAdmin 및 관리자의 모든 조치(Action) 및 세부 이력을 사후 추적이 가능하도록 기록합니다. (총 {totalCount}건)
          </p>
        </div>
      </div>

      {/* Action Filter */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            placeholder="액션 명칭으로 필터링 (예: USER_ROLE_UPDATE, IMPERSONATE)"
            className="w-full pl-10 pr-4 py-2.5 bg-[#0d121f] border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
        >
          필터 검색
        </button>
      </form>

      {/* Audit Log Cards List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center text-slate-500 bg-[#0d121f] rounded-2xl border border-slate-800">
            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-500" />
            감사 로그 데이터를 조회 중입니다...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 bg-[#0d121f] rounded-2xl border border-slate-800 text-xs">
            기록된 감사 로그가 없습니다.
          </div>
        ) : (
          logs.map((log) => {
            const isExpanded = expandedLogId === log.id;
            return (
              <div
                key={log.id}
                className="p-4 rounded-2xl bg-[#0d121f] border border-slate-800/80 shadow-md space-y-3 transition hover:border-slate-700"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full border text-xs font-mono font-bold ${getActionBadgeColor(
                        log.action,
                      )}`}
                    >
                      {log.action}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                      <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>{log.admin?.email || log.admin?.firstName || log.adminId}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Laptop className="w-3 h-3 text-slate-500" />
                      {log.ipAddress || 'IP N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-800/50 text-xs">
                  <div className="text-slate-400">
                    Target Resource ID: <span className="font-mono text-slate-200">{log.targetId || 'N/A'}</span>
                  </div>

                  {log.details && (
                    <button
                      onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                      className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                    >
                      <span>세부 JSON {isExpanded ? '접기' : '펼치기'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                {/* Details Drawer */}
                {isExpanded && log.details && (
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-300 overflow-x-auto">
                    <pre>{JSON.stringify(log.details, null, 2)}</pre>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-[#0d121f] rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
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
  );
}
