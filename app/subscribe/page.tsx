import { EmailSubscriptionForm } from '@/components/EmailSubscriptionForm';
import Link from 'next/link';

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-pink-400 bg-clip-text text-transparent">
            먹는샘물 위반 알림
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            실시간으로 위반 사례를 확인하고 이메일로 알림을 받으세요
          </p>
          <p className="text-gray-600">
            먹는샘물 제조업체의 위반 정보를 투명하게 공개합니다
          </p>
        </div>

        {/* 구독 폼 */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <EmailSubscriptionForm />
        </div>

        {/* 메인 페이지로 돌아가기 */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            위반 현황 보러 가기
          </Link>
        </div>

        {/* 기능 소개 */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-3">🔔</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">실시간 알림</h3>
            <p className="text-sm text-gray-600">
              새로운 위반 사례가 발견되면 즉시 이메일로 알려드립니다
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">투명한 정보</h3>
            <p className="text-sm text-gray-600">
              공공 데이터를 기반으로 정확한 위반 정보를 제공합니다
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">간편한 관리</h3>
            <p className="text-sm text-gray-600">
              언제든지 구독을 취소하거나 설정을 변경할 수 있습니다
            </p>
          </div>
        </div>

        {/* 푸터 */}
        <footer className="mt-16 text-center text-gray-600 text-sm">
          <p>© 2025 먹는샘물 위반 알림. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
