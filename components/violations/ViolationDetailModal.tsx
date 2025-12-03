'use client';

import { useState, useEffect } from 'react';
import { ViolationDetail, ExplainResponse } from '@/types/violations';
import { explainViolation } from '@/lib/violations-api';

interface ViolationDetailModalProps {
  violation: ViolationDetail;
  onClose: () => void;
}

export function ViolationDetailModal({ violation, onClose }: ViolationDetailModalProps) {
  const [aiExplanation, setAiExplanation] = useState<ExplainResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 모달이 열릴 때 자동으로 AI 설명 로드
  useEffect(() => {
    const loadAIExplanation = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await explainViolation({
          처분명: violation.처분명,
          위반내용: violation.위반내용 || '',
        });
        setAiExplanation(result);
      } catch (err) {
        setError('AI 설명을 불러오는데 실패했습니다.');
        console.error('Error fetching AI explanation:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAIExplanation();
  }, [violation]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 - 고정 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{violation.업체명}</h2>
              <p className="text-purple-100">{violation.제품명}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 본문 - 스크롤 가능 */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* 기본 정보 */}
          <div className="grid md:grid-cols-2 gap-4">
            <InfoItem label="품목" value={violation.품목} />
            <InfoItem label="처분일자" value={violation.처분일자} />
            <InfoItem label="공표마감일자" value={violation.공표마감일자} />
            {violation.업체소재지 && (
              <InfoItem label="업체소재지" value={violation.업체소재지} />
            )}
          </div>

          {/* 처분명 */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">처분명</h3>
            <p className="text-red-700">{violation.처분명}</p>
          </div>

          {/* 위반내용 */}
          {violation.위반내용 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">위반내용</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{violation.위반내용}</p>
            </div>
          )}

          {/* AI 설명 섹션 */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-purple-800 text-lg flex items-center gap-2">
              <span>🤖</span> AI로 쉽게 설명
            </h3>

            {/* 로딩 중 */}
            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3">
                  <svg className="animate-spin h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-600">AI가 설명을 생성하고 있습니다...</span>
                </div>
              </div>
            )}

            {/* 에러 메시지 */}
            {error && !loading && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {error}
              </div>
            )}

            {/* AI 설명 내용 */}
            {!loading && !error && aiExplanation && (
              <>
                <p className="text-gray-700 leading-relaxed">
                  {aiExplanation.easy_explanation}
                </p>

                {/* 관련 전문용어 */}
                {aiExplanation.related_terms && aiExplanation.related_terms.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-purple-700 mb-3">📚 관련 전문용어</h4>
                    <div className="space-y-3">
                      {aiExplanation.related_terms.map((term, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="font-bold text-purple-600">{term.term}</span>
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                              {term.category}
                            </span>
                            {term.risk_level && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                term.risk_level === 'HIGH' ? 'bg-red-100 text-red-700' :
                                term.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                위험도: {term.risk_level}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{term.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* 푸터 - 고정 */}
        <div className="bg-gray-50 p-4 rounded-b-2xl flex justify-end flex-shrink-0 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
