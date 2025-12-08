// 위반 현황 데이터 타입 정의

// 위반 목록 아이템 (간략 정보)
export interface Violation {
  순번: string;
  품목: string;
  업체명: string;
  제품명: string;
  처분명: string;
  처분일자: string;
  공표마감일자: string;
  상세URL?: string;
}

// 브랜드 간단 정보 (API 응답용)
export interface BrandInfo {
  id: number;
  브랜드명: string;
  데이터출처?: string;
  활성상태: boolean;
}

// 위반 상세 정보
export interface ViolationDetail extends Violation {
  업체소재지: string;
  업종명: string;
  처분기간: string;
  위반내용: string;
  브랜드목록?: BrandInfo[];  // 해당 업체의 브랜드 목록
}

// AI 설명 응답
export interface ExplainResponse {
  easy_explanation: string;
  related_terms: TermExplanation[];
}

// 전문 용어 설명
export interface TermExplanation {
  term: string;
  category: string;
  explanation: string;
  risk_level: string;
}

// API 요청 타입
export interface ExplainRequest {
  처분명: string;
  위반내용: string;
}

// ============================================
// 브랜드 매핑 관련 타입
// ============================================

// 취수원 정보
export interface WaterSource {
  id: number;
  취수원업체명: string;
  취수원소재지?: string;
  취수원종류?: string;        // '지하수', '암반수' 등
  허가번호?: string;
  데이터출처?: string;
  최종확인일?: string;
  비고?: string;
  created_at?: string;
  updated_at?: string;
}

// 브랜드 정보
export interface Brand {
  id: number;
  water_source_id: number;
  브랜드명: string;
  제조사?: string;
  대표제품명?: string;
  제품라인?: string[];        // JSON 파싱 후 배열
  브랜드로고URL?: string;
  공식홈페이지?: string;
  시장점유율?: number;
  연간생산량?: number;
  데이터출처?: string;
  최종확인일?: string;
  활성상태?: boolean;
  비고?: string;
  created_at?: string;
  updated_at?: string;
}

// 브랜드-취수원 조인 정보
export interface BrandWithWaterSource extends Brand {
  취수원업체명: string;
  취수원소재지?: string;
  취수원종류?: string;
  허가번호?: string;
}

// 위반사항 + 브랜드 정보 (확장)
export interface ViolationWithBrands extends ViolationDetail {
  water_source_id?: number;
  취수원업체명?: string;
  취수원소재지?: string;
  연관브랜드목록?: string;    // 쉼표로 구분된 브랜드명
  연관브랜드수?: number;
  연관브랜드?: Brand[];       // 브랜드 객체 배열 (API에서 추가 조회 시)
}

// 브랜드별 위반 통계
export interface BrandViolationStats {
  brand_id: number;
  브랜드명: string;
  제조사?: string;
  취수원업체명: string;
  총위반건수: number;
  최근위반일?: string;
  최초위반일?: string;
  위반내역?: string;
}
