// apps/web/src/components/analytics/WorkspaceAnalyticsTab.tsx

'use client';

import React from 'react';

export interface TagAnalyticsItem {
  id: string;
  tag: string;
  userCount: number;
  nanoCount: number;
  growthRate: number;
  isHyped: boolean;
  updatedAt: string;
}

interface WorkspaceAnalyticsTabProps {
  analyticsData: TagAnalyticsItem[];
}

export const WorkspaceAnalyticsTab: React.FC<WorkspaceAnalyticsTabProps> = ({
  analyticsData,
}) => {
  if (!analyticsData || analyticsData.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
        등록된 태그 통계 데이터가 없습니다. 야간 배치 스케줄러 실행 후 업데이트됩니다.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">📊 태그 밀도 및 트렌드 통계</h2>
          <p className="text-xs text-gray-500 mt-1">
            매일 자정 분산 배치 스케줄러로 수집된 통계 지표입니다.
          </p>
        </div>
        <span className="px-3 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-full border border-emerald-200">
          ● Redis Lock Multi-Node Sync
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {analyticsData.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-xl border border-gray-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all relative overflow-hidden"
          >
            {item.isHyped && (
              <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-lg tracking-wider">
                🔥 HYPED TREND
              </div>
            )}

            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 rounded-md">
                #{item.tag}
              </span>
              {item.growthRate > 0 && (
                <span className="text-xs font-semibold text-emerald-600">
                  ▲ +{item.growthRate}%
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm pt-2 border-t border-gray-100">
              <div>
                <span className="text-xs text-gray-500">참여 멤버</span>
                <p className="text-lg font-bold text-gray-900">{item.userCount}명</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">생성 문서</span>
                <p className="text-lg font-bold text-gray-900">{item.nanoCount}개</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
