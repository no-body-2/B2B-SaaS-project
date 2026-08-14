// apps/api/src/common/crypto/crypto.service.spec.ts

/**
 * Crypto Service Test
 *
 * @description
 * - crypto-module 기반 암호/복호화 테스트
 *
 * @author <nobody>
 * @date 2026-08-14
 */

import { CryptoService } from './crypto.service';

describe('CryptoService Unit Test', () => {
  let service: CryptoService;

  beforeEach(() => {
    process.env.ENCRYPTION_KEY =
      '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
    process.env.BLIND_INDEX_SECRET = 'test-secret';
    service = new CryptoService();
  });

  it('1. 평문 암호화 후 복호화 시, 원본 문자열과 일치해야 한다.', () => {
    const plainText = 'Jung Young Hun';
    const encryptedText = service.encrypt(plainText);
    const decryptedText = service.decrypt(encryptedText);

    expect(decryptedText).toBe(plainText);
  });

  it('2. 동일한 평문을 암호화하더라도, 매번 무작위 IV 적용으로 다른 문자열이 생성되어야 한다.', () => {
    const plainText = 'Jung Young Hun';
    const encryptedText1 = service.encrypt(plainText);
    const encryptedText2 = service.encrypt(plainText);

    expect(encryptedText1).not.toBe(encryptedText2);
  });

  it('3. 암호문 데이터 변조 시, 복호화 과정에서 예외가 발생해야 한다.', () => {
    const plainText = 'Jung Young Hun';
    const encryptedText = service.encrypt(plainText);
    const parts = encryptedText.split(':');

    // AuthTag 변조
    const tampered = `${parts[0]}:${'a'.repeat(32)}:${parts[2]}`;

    expect(() => service.decrypt(tampered)).toThrow();
  });

  it('4. 동일한 평문은 앞뒤 공백 및 대소문자가 다르더라도 동일한 Blind Index를 생성해야 한다.', () => {
    const idx1 = service.generateBlindIndex('Jung Young Hun');
    const idx2 = service.generateBlindIndex('jung young hun');
    const idx3 = service.generateBlindIndex('   Jung  Young  Hun   ');

    expect(idx1).toBe(idx2);
    expect(idx1).toBe(idx3);
  });

  it('5. 서로 다른 평문은 서로 다른 Blind Index를 생성해야 한다.', () => {
    const idx1 = service.generateBlindIndex('Jung Young Hun');
    const idx2 = service.generateBlindIndex('Jung Young Hun2');
    const idx3 = service.generateBlindIndex('Jung Young Hun3');

    expect(idx1).not.toBe(idx2);
    expect(idx1).not.toBe(idx3);
    expect(idx2).not.toBe(idx3);
  });
});
