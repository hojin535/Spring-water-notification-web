'use client';

import { ViolationDetail } from '@/types/violations';

interface ViolationCardProps {
  violation: ViolationDetail;
  onClick: () => void;
}

export function ViolationCard({ violation, onClick }: ViolationCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] border border-gray-100"
    >
      {/* 업체명 및 제품명 */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{violation.업체명}</h3>
        {/* <p className="text-sm text-gray-600">{violation.제품명}</p> */}
      </div>

      {/* 품목 뱃지 */}
      <div className="mb-3">
        <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
          {violation.품목}
        </span>
      </div>

      {/* 처분명 */}
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-700 line-clamp-2">
          {violation.처분명}
        </p>
      </div>

      {/* 브랜드/제품명 정보 */}
      {(violation.브랜드목록 && violation.브랜드목록.length > 0) || violation.제품명 ? (
        <div className="mb-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
          <p className="text-xs text-orange-600 mb-2 font-semibold flex items-center gap-1">
            <span>🏷️</span> {violation.브랜드목록 && violation.브랜드목록.length > 0 ? '관련 브랜드' : '제품명'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {violation.브랜드목록 && violation.브랜드목록.length > 0 ? (
              <>
                {violation.브랜드목록.slice(0, 3).map((brand) => (
                  <span
                    key={brand.id}
                    className="inline-block px-2.5 py-1 bg-white text-orange-700 text-xs font-medium rounded-full border border-orange-300 shadow-sm"
                  >
                    {brand.브랜드명}
                  </span>
                ))}
                {violation.브랜드목록.length > 3 && (
                  <span className="inline-block px-2.5 py-1 bg-orange-600 text-white text-xs font-medium rounded-full">
                    +{violation.브랜드목록.length - 3}개
                  </span>
                )}
              </>
            ) : (
              <span className="inline-block px-2.5 py-1 bg-white text-orange-700 text-xs font-medium rounded-full border border-orange-300 shadow-sm">
                {violation.제품명}
              </span>
            )}
          </div>
        </div>
      ) : null}

      {/* 위반내용 미리보기 */}
      {violation.위반내용 && (
        <div className="mb-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1 font-semibold">위반내용</p>
          <p className="text-xs text-gray-700 line-clamp-3">
            {violation.위반내용}
          </p>
        </div>
      )}

      {/* 날짜 정보 */}
      <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-200 pt-3">
        <div>
          <span className="font-medium">처분일:</span> {violation.처분일자}
        </div>
        <div>
          <span className="font-medium">공표마감:</span> {violation.공표마감일자}
        </div>
      </div>

      {/* 상세보기 안내 */}
      <div className="mt-3 text-center">
        <span className="text-xs text-purple-600 font-medium">
          클릭하여 상세보기 →
        </span>
      </div>
    </div>
  );
}
