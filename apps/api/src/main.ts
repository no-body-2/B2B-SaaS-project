// apps/api/src/main.ts

/**
 * main.ts
 *
 * @description
 * 해당 프로젝트의 중심이 되는 파일
 *
 * @author  <Nobody>
 * @date 2026-05-15
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      // 1. whitelist: DTO에 정의되지 않은 데이터 처리 거부
      whitelist: true,

      // 2. forbidNonWhitelisted: DTO에 없는 정보를 억지로 보낼 시, 에러 발생
      forbidNonWhitelisted: true,

      // 3. transform: Client 측에서 전송된 JSON 텍스트를 DTO 객체로 파싱
      transform: true,

      // 4. stopAtFirstError: 첫 번째 에러 발생 시 나머지 검사를 건너뛰고 에러 반환 -> 연산 비용 절감
      stopAtFirstError: true,

      // TODO: 설정 및 기본 코드 작성 완료 시 에러 응답 정의 및 테스트
      // 5. exceptionFactory: NestJS의 기본 에러 응답을 해당 프로젝트에 맞춰 커스터마이징
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
