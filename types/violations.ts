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

// 위반 상세 정보
export interface ViolationDetail extends Violation {
  업체소재지: string;
  업종명: string;
  처분기간: string;
  위반내용: string;
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
