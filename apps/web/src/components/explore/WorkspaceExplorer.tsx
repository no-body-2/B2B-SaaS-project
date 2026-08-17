// apps/web/src/components/explore/WorkspaceExplorer.tsx

'use client';

import React, { useState } from 'react';

export enum ExploreSortOption {
  POPULAR = 'popular',
  RECENT = 'recent',
  MEMBER_DENSITY = 'member_density',
}

export interface ExploreWorkspaceItem {
  id: string;
  name: string;
  domain: string;
  tags: string[];
  type: string;
  memberCount: number;
  nanoCount: number;
  description?: string;
  isHyped?: boolean;
}

interface WorkspaceExplorerProps {
  initialWorkspaces: ExploreWorkspaceItem[];
  onSearch: (tag: string, sort: ExploreSortOption) => void;
}

export const WorkspaceExplorer: React.FC<WorkspaceExplorerProps> = ({
  initialWorkspaces,
  onSearch,
}) => {
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOption, setSortOption] = useState<ExploreSortOption>(
    ExploreSortOption.POPULAR,
  );

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTag(e.target.value);
  };

  const handleSortChange = (option: ExploreSortOption) => {
    setSortOption(option);
    onSearch(selectedTag, option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedTag, sortOption);
  };

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 헤더 */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">🌐 커뮤니티 워크스페이스 탐색</h2>
            <p className="text-sm text-gray-500 mt-1">
              네이버 카페 스타일의 공개 워크스페이스를 태그와 인기 순위로 탐색해 보세요.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={selectedTag}
              onChange={handleTagChange}
              placeholder="태그 검색 (예: SaaS, B2B)..."
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors cursor-pointer"
            >
              검색
            </button>
          </form>
        </div>

        {/* 정렬 옵션 바 */}
        <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
          <span className="text-xs font-semibold text-gray-500 mr-2">정렬 방식:</span>
          {[
            { label: '🔥 인기순', value: ExploreSortOption.POPULAR },
            { label: '🕒 최신순', value: ExploreSortOption.RECENT },
            { label: '👥 멤버 밀도순', value: ExploreSortOption.MEMBER_DENSITY },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => handleSortChange(item.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                sortOption === item.value
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 워크스페이스 카드 그리드 */}
      {initialWorkspaces.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
          조건에 부합하는 공개 커뮤니티 워크스페이스가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialWorkspaces.map((ws) => (
            <div
              key={ws.id}
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              {ws.isHyped && (
                <div className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-lg tracking-wider">
                  🔥 HYPED
                </div>
              )}

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md">
                    {ws.type || 'PUBLIC'}
                  </span>
                  <span className="text-xs text-gray-400">@{ws.domain}</span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{ws.name}</h3>
                {ws.description && (
                  <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                    {ws.description}
                  </p>
                )}
              </div>

              <div>
                {/* 태그 목록 */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {ws.tags?.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[11px] font-medium"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                {/* 하단 멤버 및 문서 통계 */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-500 font-medium">
                  <span>👥 멤버 {ws.memberCount}명</span>
                  <span>📄 문서 {ws.nanoCount}개</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
