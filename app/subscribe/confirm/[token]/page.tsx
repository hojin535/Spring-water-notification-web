'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { confirmSubscription } from '@/lib/api';
import { Alert } from '@/components/ui/Alert';

export default function ConfirmSubscriptionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const confirm = async () => {
      try {
        const resolvedParams = await params;
        const data = await confirmSubscription(resolvedParams.token);
        setStatus('success');
        setMessage(data.message);

        // 3초 후 메인 페이지로 리다이렉트
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : '구독 확인에 실패했습니다.');
      }
    };

    confirm();
  }, [params, router]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {status === 'loading' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-700 text-lg">구독을 확인하는 중...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">구독 완료!</h2>
              <Alert type="success" message={message} />
              <p className="mt-4 text-sm text-gray-600">
                3초 후 메인 페이지로 이동합니다...
              </p>
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
