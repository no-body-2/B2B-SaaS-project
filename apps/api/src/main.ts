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
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('B2B SaaS API')
    .setDescription('B2B SaaS 프로젝트의 내부 API 명세서 ')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'accessToken',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'refreshToken',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  // http://localhost:3000/api-docs 경로로 접근 시 문서 열람 가능
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
