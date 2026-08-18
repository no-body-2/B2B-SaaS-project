// apps/api/src/nano/utils/fractional-indexing.util.ts

/**
 * Lexicographical Fractional Indexing Utility
 *
 * @description
 * - ASCII 문자열 기반 두 문자열 사이의 중간값 생성
 * - 0(1) DB Write로 Frontend에서의 Drag & Drop 순서 변경 지원
 *
 * @author <nobody>
 * @date 2026-08-18
 */

export class FractionalIndexingUtil {
  private static readonly BASE_CHARSET =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // 자릿수 감소 시 하한 기준
  private static readonly FIRST_CHAR = '0';
  // 자릿수 증가 시 상한 기준
  private static readonly LAST_CHAR = 'z';

  // 두 순서 문자열 (prev, next) 사이의 중간 positionStr 생성
  static generatePosition(prev: string | null, next: string | null): string {
    // 기준에 따라 문자열 생성 및 반환
    if (!prev && !next) {
      return 'a0';
    }

    if (!prev && next) {
      return this.decrementString(next);
    }

    if (prev && !next) {
      return this.incrementString(prev);
    }

    if (prev && next) {
      // 값의 유효성 검증
      if (prev >= next) {
        throw new Error(`prev (${prev})는 next (${next})보다 작아야 합니다`);
      }
      return this.midpoint(prev, next);
    }

    return 'a0';
  }

  // 문자열 증가
  private static incrementString(str: string): string {
    const lastChar = str[str.length - 1];

    // 마지막 문자가 'z'보다 작은 경우 다음 ASCII 문자 사용
    if (lastChar < this.LAST_CHAR) {
      const nextChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
      return str.substring(0, str.length - 1) + nextChar;
    }

    // 마지막 문자가 'z'인 경우 자릿수 확장
    return str + '0';
  }

  // 문자열 감소
  private static decrementString(str: string): string {
    const lastChar = str[str.length - 1];

    // 마지막 문자가 '0'보다 큰 경우 이전 ASCII 문자 사용
    if (lastChar > this.FIRST_CHAR) {
      const prevChar = String.fromCharCode(lastChar.charCodeAt(0) - 1);
      return str.substring(0, str.length - 1) + prevChar;
    }

    // 마지막 문자가 '0'인 경우: 앞부분 문자열을 감소시키고 'z'를 덧붙임
    if (str.length > 1) {
      return (
        this.decrementString(str.substring(0, str.length - 1)) + this.LAST_CHAR
      );
    }
    return '00';
  }

  // 중간값 계산
  private static midpoint(prev: string, next: string): string {
    let p = 0;

    // 공통 접두사 계산
    while (p < prev.length && p < next.length && prev[p] === next[p]) {
      p++;
    }

    // 공통 접두사 추출
    const prefix = prev.substring(0, p);

    // 차이가 발생한 지점의 문자 추출
    const prevChar = prev[p] || this.FIRST_CHAR;
    const nextChar = next[p] || this.LAST_CHAR;

    // 문자들의 ASCII 코드 값 추출
    const prevCode = prevChar.charCodeAt(0);
    const nextCode = nextChar.charCodeAt(0);

    // 두 문자의 차이가 1보다 큰 경우 EX: 0, 2 -> 1
    if (nextCode - prevCode > 1) {
      const midCode = Math.floor((prevCode + nextCode) / 2);
      return prefix + String.fromCharCode(midCode);
    }

    // 두 문자열이 연속된 경우, 중간값 'V'를 추가하여 자릿수 확장
    return prev + 'V';
  }
}
