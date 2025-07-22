import { useState, useRef, useEffect } from 'react';
import { getOrGenerateFingerprint } from '../lib/finger';
import { getFrom } from '../lib/getFrom';

const host = 'https://api.jsunpack.tech'
// const host = 'http://59.110.60.222:3010'
// const host = 'http://localhost:3010'
interface StreamCompletionOptions {
  content: string;
  onMessage: (content: string) => void;
  onError?: (error: Error) => void;
  onComplete?: () => void;
}

const aiCompletionsStream = async (content: any, controllerRef: any) => {
  const tmpUid = await getOrGenerateFingerprint();
  const from = getFrom();

  const responsePromise = fetch(`${host}/api/ai/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      tmpUid,
      content,
      source: from
    }),
    signal: controllerRef.current.signal,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.body; // 返回 ReadableStream
  });

  return responsePromise; // 返回 promise，以便后续处理流式数据
}


export const useAIStream = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const streamCompletion = async ({
    content,
    onMessage,
    onError,
    onComplete,
  }: StreamCompletionOptions) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 创建 AbortController 以便可以取消请求
      controllerRef.current = new AbortController();

      const body = await aiCompletionsStream(content, controllerRef);

      // 创建 SSE 解析器
      const reader = (body as any).getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // 处理可能的多条消息
        const messages = buffer.split('\n\n');
        buffer = messages.pop() || ''; // 保留不完整的消息

        for (const message of messages) {
          if (message.trim() === '') continue;

          // 提取 data: 后面的内容
          const dataMatch = message.match(/^data: (.*)$/m);
          if (!dataMatch) continue;

          const data = dataMatch[1];
          
          if (data === '[DONE]') {
            onComplete?.();
            return;
          }

          try {
            const parsedData = JSON.parse(data);
            onMessage(parsedData);
          } catch (e) {
            console.error('Failed to parse message:', e);
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err);
        onError?.(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 取消当前请求
  const abort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  };

  // 组件卸载时自动取消请求
  useEffect(() => {
    return () => {
      abort();
    };
  }, []);

  return { streamCompletion, isLoading, error, abort };
};
