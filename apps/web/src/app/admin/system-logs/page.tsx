'use client';

import React, { useEffect, useState } from 'react';
import { adminApi } from '../../../lib/api';
import {
  Terminal,
  RefreshCw,
  Search,
  Filter,
  ShieldAlert,
  Info,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface LogItem {
  id: string;
  timestamp: string;
  level: string;
  type: string;
  message: string;
  details?: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

export default function AdminSystemLogsPage() {
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getSystemLogs({ limit: 100 });
      setLogs(res.data || []);
    } catch (err) {
      console.error('Failed to fetch system logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesLevel =
      filterLevel === 'ALL' || log.level.toUpperCase() === filterLevel;
    const matchesSearch =
      !searchKeyword ||
      log.message.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      log.type.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (log.ip && log.ip.includes(searchKeyword));
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-400" />
            플랫폼 전체 시스템 로그 & Winston 콘솔 추적
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            로컬 및 프로덕션 환경의 실시간 백엔드 HTTP 요청, 감사 로그(Audit Log), 예외 이력을 한눈에 감시합니다.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-indigo-950/40"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          로그 새로고침
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="로그 메시지, 액션 타입, IP 검색..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-slate-400">로그 레벨:</span>
          {['ALL', 'INFO', 'WARN', 'ERROR'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                filterLevel === lvl
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Log Console Terminal View */}
      <div className="bg-slate-950 border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-slate-300 font-semibold">system.combined.log</span>
          </div>
          <span>Total Entries: {filteredLogs.length}</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
            <span className="text-xs">시스템 로그를 읽어오는 중...</span>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs font-mono">
            [SYSTEM] 조건에 일치하는 로그 항목이 없습니다.
          </div>
        ) : (
          <div className="p-4 font-mono text-xs divide-y divide-slate-900/60 max-h-[600px] overflow-y-auto">
            {filteredLogs.map((log) => (
              <div key={log.id} className="py-2 hover:bg-slate-900/40 transition px-2 rounded flex flex-col gap-1">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-slate-500 text-[11px] shrink-0">{log.timestamp}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase shrink-0 ${
                        log.level === 'ERROR'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : log.level === 'WARN'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span className="text-slate-300 font-semibold truncate">{log.message}</span>
                  </div>

                  <span className="text-[11px] text-slate-500 shrink-0 font-sans">IP: {log.ip}</span>
                </div>

                {log.details && Object.keys(log.details).length > 0 && (
                  <pre className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded border border-slate-800/50 overflow-x-auto mt-1">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
