'use client';

import { useState, useEffect } from 'react';
import { ViolationDetail } from '@/types/violations';
import { fetchViolations, fetchViolationsByCompany } from '@/lib/violations-api';
import { ViolationCard } from '@/components/violations/ViolationCard';
import { ViolationDetailModal } from '@/components/violations/ViolationDetailModal';
import { SearchBar } from '@/components/violations/SearchBar';
import Link from 'next/link';

export default function Home() {
  const [violations, setViolations] = useState<ViolationDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedViolation, setSelectedViolation] = useState<ViolationDetail | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // 초기 데이터 로드
  useEffect(() => {
    loadViolations();
  }, []);

  const loadViolations = async () => {
    setLoading(true);
    setError(null);
    setIsSearching(false);
    
    try {
      // /api/violations/mapped 엔드포인트 사용 (위반내용 포함)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/violations/mapped?limit=50&offset=0`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setViolations(data);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Error loading violations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadViolations();
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const data = await fetchViolationsByCompany(searchTerm);
      setViolations(data);
      if (data.length === 0) {
        setError(`"${searchTerm}"에 대한 검색 결과가 없습니다.`);
      }
    } catch (err) {
      setError('검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error('Error searching violations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    loadViolations();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-12">
      {/* 헤더 섹션 */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-pink-400 bg-clip-text text-transparent">
                먹는샘물 위반 현황
              </h1>
              <p className="text-gray-600 mt-2">
                실시간 위반 사례를 확인하고 안전한 물을 선택하세요
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 검색 바 */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={handleSearch}
          />
          {isSearching && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">
                &quot;{searchTerm}&quot; 검색 결과: {violations.length}건
              </span>
              <button
                onClick={handleReset}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                전체 목록 보기
              </button>
            </div>
          )}
        </div>

        {/* 로딩 상태 */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
              <p className="text-gray-600">데이터를 불러오는 중입니다...</p>
            </div>
          </div>
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={loadViolations}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 위반 목록 */}
        {!loading && violations.length > 0 && (
          <>
            <div className="mb-6 text-right">
              <span className="text-sm text-gray-600">
                총 {violations.length}건의 위반 사례
              </span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {violations.map((violation, index) => (
                <ViolationCard
                  key={index}
                  violation={violation}
                  onClick={() => setSelectedViolation(violation)}
                />
              ))}
            </div>
          </>
        )}

        {/* 빈 상태 */}
        {!loading && !error && violations.length === 0 && !isSearching && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-600 text-lg">현재 등록된 위반 사례가 없습니다.</p>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {selectedViolation && (
        <ViolationDetailModal
          violation={selectedViolation}
          onClose={() => setSelectedViolation(null)}
        />
      )}

      {/* 푸터 */}
      <footer className="mt-16 text-center text-gray-600 text-sm pb-8">
        <p>© 2025 먹는샘물 위반 알림. All rights reserved.</p>
        <p className="mt-2">
          데이터 출처: 기후에너지환경부 (MCEE) | 1시간마다 자동 업데이트
        </p>
      </footer>
    </main>
  );
}
