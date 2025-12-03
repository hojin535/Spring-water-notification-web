import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: '먹는샘물 위반 알림',
  description: '먹는샘물 위반 사례를 실시간으로 알려드립니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {/* 네비게이션 바 */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* 로고 */}
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">💧</span>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  먹는샘물 위반 알림
                </span>
              </Link>

              {/* 네비게이션 링크 */}
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-primary font-medium transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  위반 현황
                </Link>
                <Link
                  href="/subscribe"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  🔔 알림 구독
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* 메인 콘텐츠 */}
        {children}
      </body>
    </html>
  );
}
