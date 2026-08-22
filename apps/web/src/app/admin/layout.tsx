'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LumiNanoLogo } from '../../components/LumiNanoBrand';
import {
  LayoutDashboard,
  Users,
  Building2,
  ScrollText,
  ShieldCheck,
  ExternalLink,
  Activity,
  Terminal,
} from 'lucide-react';
import { adminApi } from '@/lib/api';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'unhealthy' | 'checking'>('checking');

  useEffect(() => {
    adminApi
      .getHealth()
      .then(() => setHealthStatus('healthy'))
      .catch(() => setHealthStatus('unhealthy'));
  }, []);

  const navItems = [
    { label: '대시보드 & Health', href: '/admin', icon: LayoutDashboard },
    { label: '사용자 관리', href: '/admin/users', icon: Users },
    { label: '워크스페이스 관리', href: '/admin/workspaces', icon: Building2 },
    { label: '감사 로그 (Audit)', href: '/admin/audit-logs', icon: ScrollText },
    { label: '전체 시스템 로그', href: '/admin/system-logs', icon: Terminal },
  ];

  return (
    <div className="flex h-screen bg-[#070a11] text-slate-100 font-sans antialiased overflow-hidden">
      {/* 어드민 사이드바 */}
      <aside className="w-64 border-r border-slate-800/80 bg-[#0c101c] flex flex-col justify-between p-5 select-none shrink-0">
        <div className="space-y-8">
          {/* 로고 브랜드 */}
          <div className="px-2">
            <LumiNanoLogo href="/dashboard" size="lg" subTitle="SuperAdmin" subIcon={<ShieldCheck className="w-4 h-4 text-emerald-400" />} />
          </div>

          {/* 내비게이션 메뉴 */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-indigo-200 border border-indigo-500/30 shadow-md shadow-indigo-950/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 사이드바 하단 정보 */}
        <div className="pt-4 border-t border-slate-800/60 space-y-3">
          <div className="px-3 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800/60 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">System DB</span>
            <div className="flex items-center gap-1.5 font-semibold">
              <span
                className={`w-2 h-2 rounded-full ${
                  healthStatus === 'healthy'
                    ? 'bg-emerald-400 shadow-xs shadow-emerald-400'
                    : healthStatus === 'unhealthy'
                    ? 'bg-rose-500 shadow-xs shadow-rose-500'
                    : 'bg-amber-400 animate-pulse'
                }`}
              />
              <span
                className={
                  healthStatus === 'healthy'
                    ? 'text-emerald-400'
                    : healthStatus === 'unhealthy'
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }
              >
                {healthStatus === 'healthy' ? 'Operational' : healthStatus === 'unhealthy' ? 'Degraded' : 'Checking'}
              </span>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition"
          >
            <span>워크스페이스 이동</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800/80 bg-[#0c101c]/80 backdrop-blur-md px-8 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-indigo-400" />
            <h1 className="text-sm font-semibold text-slate-200">
              Platform Control Center
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-slate-300 font-semibold">SUPER_ADMIN Mode</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
