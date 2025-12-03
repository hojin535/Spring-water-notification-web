// 위반 현황 API 클라이언트 함수

import { Violation, ViolationDetail, ExplainResponse, ExplainRequest } from '@/types/violations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * 위반 목록 조회
 * @param limit 반환할 최대 레코드 수
 * @param offset 건너뛸 레코드 수
 * @returns 위반 목록
 */
export async function fetchViolations(
  limit: number = 100,
  offset: number = 0
): Promise<Violation[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/violations?limit=${limit}&offset=${offset}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching violations:', error);
    throw error;
  }
}

/**
 * 업체명으로 위반 내역 조회
 * @param companyName 업체명
 * @returns 해당 업체의 위반 목록
 */
export async function fetchViolationsByCompany(
  companyName: string
): Promise<ViolationDetail[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/violations/company/${encodeURIComponent(companyName)}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching violations by company:', error);
    throw error;
  }
}

/**
 * AI 기반 위반 설명 요청
 * @param request 처분명과 위반내용
 * @returns AI 생성 설명 및 관련 전문용어
 */
export async function explainViolation(
  request: ExplainRequest
): Promise<ExplainResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/violations/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error explaining violation:', error);
    throw error;
  }
}
