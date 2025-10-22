import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 날짜를 한국어 형식으로 포맷팅하는 유틸리티 함수
 * @param date - 포맷팅할 날짜 (문자열 또는 Date 객체)
 * @returns 한국어로 포맷팅된 날짜 문자열
 */
export function formatDateToKorean(date: string | Date): string {
  try {
    return format(new Date(date), 'PPP', { locale: ko });
  } catch (error) {
    console.error('날짜 포맷팅 중 오류 발생:', error);
    return '날짜 정보 없음';
  }
}
