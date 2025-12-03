'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { unsubscribe } from '@/lib/api';
import { Alert } from '@/components/ui/Alert';

export default function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleUnsubscribe = async () => {
      try {
        const resolvedParams = await params;
        const data = await unsubscribe(resolvedParams.token);
        setStatus('success');
        setMessage(data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : '구독 취소에 실패했습니다.');
      }
    };

    handleUnsubscribe();
  }, [params]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {status === 'loading' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-700 text-lg">구독을 취소하는 중...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="text-center">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">구독이 취소되었습니다</h2>
              <Alert type="success" message={message} />
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => router.push('/')}
                  className="block w-full px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-all"
                >
                  메인 페이지로 돌아가기
                </button>
                <p className="text-sm text-gray-600">
                  언제든지 다시 구독하실 수 있습니다
                </p>
              </div>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="text-center">
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">오류 발생</h2>
              <Alert type="error" message={message} />
              <button
                onClick={() => router.push('/')}
                className="mt-6 text-primary hover:underline"
              >
                메인 페이지로 돌아가기
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
