// apps/web/src/hooks/useAiSseStream.ts

/**
 * AI SSE Stream Hook
 *
 * @description
 * - Frontend에서 SSE 이벤트 수신을 하기 위한 Hook
 *
 * @author <nobody>
 * @date 2026-08-20
 */

'use client';

import { useState, useEffect } from 'react';

interface UseAiSseStreamResult {
  streamedText: string;
  isStreaming: boolean;
  error: string | null;
}

export function useAiSseStream(jobId: string | null): UseAiSseStreamResult {
  const [streamedText, setStreamedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    setIsStreaming(true);
    setStreamedText('');
    setError(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const eventSource = new EventSource(`${apiBaseUrl}/api/v1/ai/stream/${jobId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as {
          token: string;
          isDone: boolean;
        };
        setStreamedText((prev) => prev + data.token);

        if (data.isDone) {
          setIsStreaming(false);
          eventSource.close();
        }
      } catch (_err) {
        setError('SSE 파싱 에러');
      }
    };

    eventSource.onerror = () => {
      setError('SSE 커넥션 에러 발생');
      setIsStreaming(false);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [jobId]);
  return { streamedText, isStreaming, error };
}
