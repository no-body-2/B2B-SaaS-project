// apps/api/src/user/user.module.ts

/**
 * User Module
 *
 * @description
 * User Service를 제공하는 모듈
 *
 * @author  <Nobody>
 * @date 2026-05-22
 */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
