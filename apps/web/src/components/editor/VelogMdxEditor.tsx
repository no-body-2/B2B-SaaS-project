// apps/web/src/components/editor/VelogMdxEditor.tsx

'use client';

import React, { useState } from 'react';

interface VelogMdxEditorProps {
  initialContent?: string;
  onSave?: (content: string) => void;
}

export const VelogMdxEditor: React.FC<VelogMdxEditorProps> = ({
  initialContent = '',
  onSave,
}) => {
  const [content, setContent] = useState(initialContent);
  const [isUploading, setIsUploading] = useState(false);

  // 이미지 드래그 앤 드롭 S3 Presigned Direct Upload
  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // 1. API 서버에서 Presigned URL 획득
      const res = await fetch('/api/v1/storage/presigned-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      if (!res.ok) {
        throw new Error('Presigned URL 발급 실패');
      }

      const { uploadUrl, fileUrl } = (await res.json()) as {
        uploadUrl: string;
        fileUrl: string;
      };

      // 2. 브라우저가 S3로 Direct Upload (API 서버 대역폭 0점유)
      await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      });

      // 3. 마크다운 이미지 구문 추가
      const imageMarkdown = `\n![${file.name}](${fileUrl})\n`;
      setContent((prev) => prev + imageMarkdown);
    } catch (_err) {
      alert('이미지 업로드 실패');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
      {/* 좌측: 마크다운 에디터 입력창 */}
      <div className="w-1/2 flex flex-col border-r border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            ✏️ Markdown Input
          </span>
          {isUploading && (
            <span className="text-xs font-semibold text-indigo-600 animate-pulse">
              ⚡ S3 Direct Uploading...
            </span>
          )}
        </div>

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            onSave?.(e.target.value);
          }}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
              void handleImageUpload(file);
            }
          }}
          placeholder="Velog 스타일 마크다운을 작성하세요. 이미지를 드롭하면 S3로 직송됩니다..."
          className="w-full h-full p-4 font-mono text-sm border-0 focus:outline-hidden resize-none bg-gray-50/50 rounded-xl"
        />
      </div>

      {/* 우측: 실시간 마크다운 프리뷰 */}
      <div className="w-1/2 flex flex-col p-6 bg-white overflow-y-auto space-y-4">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
          👁️ Real-time Preview
        </span>
        <div className="prose prose-indigo max-w-none text-sm text-gray-800 space-y-2">
          {content ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <p className="text-gray-400 italic">프리뷰가 여기에 표시됩니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};
