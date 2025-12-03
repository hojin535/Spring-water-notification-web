import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  const styles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: '✓',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: '✕',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: '⚠',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'ℹ',
    },
  };

  const style = styles[type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        border rounded-lg p-4
        flex items-start gap-3
        animate-fade-in
      `}
      role="alert"
    >
      <span className="text-xl flex-shrink-0">{style.icon}</span>
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
          aria-label="닫기"
        >
          ×
        </button>
      )}
    </div>
  );
}
