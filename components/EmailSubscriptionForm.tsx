'use client';

import { useState, FormEvent } from 'react';
import { subscribeEmail } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('이메일을 입력해주세요');
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError('올바른 이메일 주소를 입력해주세요');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const data = await subscribeEmail(email);
      setMessage({ type: 'success', text: data.message });
      setEmail('');
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : '오류가 발생했습니다.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          먹는샘물 위반 알림 구독
        </h2>
        <p className="text-gray-600 text-sm">
          새로운 위반 사례가 발견되면 이메일로 알려드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
          placeholder="이메일 주소를 입력하세요"
          disabled={loading}
          error={emailError}
          aria-label="이메일 주소"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={loading}
          className="w-full"
        >
          {loading ? '처리 중...' : '구독하기'}
        </Button>
      </form>

      {message && (
        <div className="mt-4">
          <Alert
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          구독 신청 시 개인정보 처리 방침에 동의하는 것으로 간주됩니다.
        </p>
      </div>
    </div>
  );
}
