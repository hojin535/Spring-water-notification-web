// API 응답 타입 정의

export interface SubscribeResponse {
  status: 'success' | 'already_subscribed' | 'resent';
  message: string;
  email: string;
}

export interface ConfirmResponse {
  status: 'success' | 'already_confirmed';
  message: string;
  email: string;
}

export interface UnsubscribeResponse {
  status: 'success' | 'already_unsubscribed';
  message: string;
}

export interface ErrorResponse {
  detail: string;
}
