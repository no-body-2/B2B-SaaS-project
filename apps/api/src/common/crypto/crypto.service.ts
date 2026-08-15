// apps/api/src/common/crypto/crypto.service.ts

/**
 * Crypto Service
 * @description
 * - Global Crypto Service
 *
 * @author <nobody>
 * @date 2026-08-14
 */

import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  // 1. AES-256-GCM Algorithm
  private readonly algorithm = 'aes-256-gcm';

  // 2. Set 256bit (32byte) Master Key
  private readonly key: Buffer;
  private readonly blindIndexSecret: string;

  constructor() {
    const rawKey = process.env.ENCRYPTION_KEY || '00'.repeat(32);
    this.key = Buffer.from(rawKey, 'hex');
    this.blindIndexSecret =
      process.env.BLIND_INDEX_SECRET || 'luminano-default-blind-secret-key';

    if (this.key.length !== 32) {
      throw new InternalServerErrorException(
        'ENCRYPTION_KEY는 반드시 64자 Hex 여야 합니다.',
      );
    }
  }

  /**
   * 1. AES-256-GCM 암호화
   *
   * @param plaintext 평문 데이터
   * @returns "iv:authTag:ciphertext" 문자열
   */
  encrypt(plaintext: string): string {
    if (!plaintext) return '';
    try {
      // 12 Byte Random IV 생성
      const iv = crypto.randomBytes(12);
      const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);

      let encrypted = cipher.update(plaintext, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      // GCM 변조 검증용 Auth Tag 추출
      const tag = cipher.getAuthTag().toString('hex');

      return `${iv.toString('hex')}:${tag}:${encrypted}`;
    } catch (_err) {
      throw new InternalServerErrorException(
        '데이터 암호화 처리 중 오류가 발생했습니다.',
      );
    }
  }

  /**
   * 2. AES-256-GCM 복호화
   *
   * @param ciphertext "iv:authTag:ciphertext" 형태의 암호문
   * @returns 복호화된 원본 평문
   */
  decrypt(ciphertext: string): string {
    if (!ciphertext) return '';
    try {
      const parts = ciphertext.split(':');
      if (parts.length !== 3) {
        throw new BadRequestException('유효하지 않은 암호문 형식입니다.');
      }

      const [ivHex, tagHex, encryptedHex] = parts;
      const iv = Buffer.from(ivHex, 'hex');
      const tag = Buffer.from(tagHex, 'hex');

      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);

      decipher.setAuthTag(tag);

      let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (_err) {
      throw new BadRequestException(
        '암호문 복호화나 무결성 검증에 실패했습니다.',
      );
    }
  }

  /**
   * 3. HMAC-SHA256 Blind Index 생성
   *
   * @param plaintext 검색 대상 평문 데이터
   * @returns DB 조회용 64자 Hex Hash 문자열
   */
  generateBlindIndex(plaintext: string): string {
    if (!plaintext) return '';

    // 앞뒤/내부 연속 공백 제거 및 소문자 정규화 후 HMAC 계산
    const normalized = plaintext.trim().toLowerCase().replace(/\s+/g, ' ');
    return crypto
      .createHmac('sha256', this.blindIndexSecret)
      .update(normalized)
      .digest('hex');
  }
}
