// apps/web/src/components/nano/NanoDragDropTree.tsx

'use client';

import React from 'react';

export interface NanoItem {
  id: string;
  title: string;
  parentId: string | null;
  positionStr: string;
}

interface NanoDragDropTreeProps {
  items: NanoItem[];
  onReorder?: (
    sourceId: string,
    targetParentId: string | null,
    prevId: string | null,
    nextId: string | null,
  ) => void;
}

export const NanoDragDropTree: React.FC<NanoDragDropTreeProps> = ({ items }) => {
  // positionStr 사전식 정렬
  const sortedItems = [...items].sort((a, b) =>
    a.positionStr.localeCompare(b.positionStr),
  );

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">📄 Notion 스타일 계층 문서 트리</h3>
          <p className="text-xs text-gray-500 mt-1">
            Lexicographical Fractional Indexing 기반 O(1) 정렬 트리가 적용된 문서 목록입니다.
          </p>
        </div>
        <span className="px-2.5 py-1 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-lg">
          O(1) Fractional Indexing
        </span>
      </div>

      {sortedItems.length === 0 ? (
        <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border border-gray-200 text-sm">
          등록된 Nano 문서가 없습니다.
        </div>
      ) : (
        <div className="space-y-2">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-indigo-50/60 rounded-xl border border-gray-200 hover:border-indigo-300 transition-all cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 select-none">⋮⋮</span>
                <span className="text-sm font-semibold text-gray-800">
                  {item.title}
                </span>
                {item.parentId && (
                  <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-200 text-gray-600 rounded-md">
                    Child of {item.parentId}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono px-2.5 py-1 bg-white text-indigo-700 font-bold rounded-md border border-gray-200 shadow-2xs">
                  pos: {item.positionStr}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
