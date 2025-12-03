import type { SubscribeResponse, ConfirmResponse, UnsubscribeResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * 이메일 구독 신청
 */
export async function subscribeEmail(email: string): Promise<SubscribeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || '구독 신청에 실패했습니다.');
  }

  return response.json();
}

/**
 * 구독 확인
 */
export async function confirmSubscription(token: string): Promise<ConfirmResponse> {
  const response = await fetch(`${API_BASE_URL}/api/subscribe/confirm/${token}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || '구독 확인에 실패했습니다.');
  }

  return response.json();
}

/**
 * 구독 취소
 */
export async function unsubscribe(token: string): Promise<UnsubscribeResponse> {
  const response = await fetch(`${API_BASE_URL}/api/unsubscribe/${token}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || '구독 취소에 실패했습니다.');
  }

  return response.json();
}
