// 브랜드 매핑 API 클라이언트 함수

import { Brand, WaterSource, BrandWithWaterSource, ViolationWithBrands, BrandViolationStats } from '@/types/violations';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * 모든 취수원 목록 조회
 */
export async function fetchWaterSources(): Promise<WaterSource[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/water-sources`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching water sources:', error);
    throw error;
  }
}

/**
 * 특정 취수원 조회
 */
export async function fetchWaterSourceById(id: number): Promise<WaterSource> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/water-sources/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching water source:', error);
    throw error;
  }
}

/**
 * 모든 브랜드 목록 조회
 */
export async function fetchBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/brands`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 제품라인이 JSON 문자열인 경우 파싱
    return data.map((brand: any) => ({
      ...brand,
      제품라인: typeof brand.제품라인 === 'string' 
        ? JSON.parse(brand.제품라인 || '[]') 
        : brand.제품라인
    }));
  } catch (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
}

/**
 * 특정 브랜드 조회
 */
export async function fetchBrandById(id: number): Promise<Brand> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/brands/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const brand = await response.json();
    
    // 제품라인 파싱
    return {
      ...brand,
      제품라인: typeof brand.제품라인 === 'string' 
        ? JSON.parse(brand.제품라인 || '[]') 
        : brand.제품라인
    };
  } catch (error) {
    console.error('Error fetching brand:', error);
    throw error;
  }
}

/**
 * 브랜드명으로 검색
 */
export async function searchBrandsByName(brandName: string): Promise<BrandWithWaterSource[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/brands/search?name=${encodeURIComponent(brandName)}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((brand: any) => ({
      ...brand,
      제품라인: typeof brand.제품라인 === 'string' 
        ? JSON.parse(brand.제품라인 || '[]') 
        : brand.제품라인
    }));
  } catch (error) {
    console.error('Error searching brands:', error);
    throw error;
  }
}

/**
 * 특정 취수원이 공급하는 브랜드 목록 조회
 */
export async function fetchBrandsByWaterSource(waterSourceId: number): Promise<Brand[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/water-sources/${waterSourceId}/brands`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((brand: any) => ({
      ...brand,
      제품라인: typeof brand.제품라인 === 'string' 
        ? JSON.parse(brand.제품라인 || '[]') 
        : brand.제품라인
    }));
  } catch (error) {
    console.error('Error fetching brands by water source:', error);
    throw error;
  }
}

/**
 * 취수원명으로 브랜드 조회
 */
export async function fetchBrandsByWaterSourceName(waterSourceName: string): Promise<Brand[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/brands/by-water-source/${encodeURIComponent(waterSourceName)}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data.map((brand: any) => ({
      ...brand,
      제품라인: typeof brand.제품라인 === 'string' 
        ? JSON.parse(brand.제품라인 || '[]') 
        : brand.제품라인
    }));
  } catch (error) {
    console.error('Error fetching brands by water source name:', error);
    throw error;
  }
}

/**
 * 위반사항 + 브랜드 정보 조회 (violations_with_brands 뷰)
 */
export async function fetchViolationsWithBrands(
  limit: number = 100,
  offset: number = 0
): Promise<ViolationWithBrands[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/violations/with-brands?limit=${limit}&offset=${offset}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching violations with brands:', error);
    throw error;
  }
}

/**
 * 특정 위반사항의 연관 브랜드 조회
 */
export async function fetchBrandsForViolation(companyName: string): Promise<Brand[]> {
  try {
    return await fetchBrandsByWaterSourceName(companyName);
  } catch (error) {
    console.error('Error fetching brands for violation:', error);
    return [];
  }
}

/**
 * 브랜드별 위반 통계 조회
 */
export async function fetchBrandViolationStats(): Promise<BrandViolationStats[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/brands/violation-stats`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching brand violation stats:', error);
    throw error;
  }
}
