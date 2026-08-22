// apps/api/src/admin/admin.controller.ts

/**
 * Admin Controller
 *
 * @description
 * - Super Admin (System Developer) 전용 라우터 컨트롤러
 *
 * @author <nobody>
 * @date 2026-08-08
 */

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SystemRolesGuard } from '../common/guards/system-roles.guard';
import { SudoModeGuard } from '../common/guards/sudo-mode.guard';
import { SystemRoles } from '../common/decorators/system-roles.decorator';
import { SudoMode } from '../common/decorators/sudo-mode.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { Response, Request } from 'express';

@Controller('admin')
@UseGuards(JwtAuthGuard, SystemRolesGuard)
@SystemRoles('SUPER_ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * 1. 대시보드 요약 통계 조회
   */
  @Get('stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  /**
   * 2. 유저 목록 조회
   */
  @Get('users')
  async getUsers(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.adminService.getUsers(
      Number(page) || 1,
      Number(limit) || 10,
      search,
    );
  }

  /**
   * 3. 유저 CSV 스트리밍 다운로드
   */
  @Get('users/csv')
  async exportUsersCsv(@Res() res: Response) {
    return this.adminService.exportUsersCsv(res);
  }

  /**
   * 4. 유저 권한 수정
   */
  @Patch('users/:userId/role')
  @SudoMode()
  @UseGuards(SudoModeGuard)
  async updateUserRole(
    @CurrentUser('userId') adminId: string,
    @Param('userId') targetUserId: string,
    @Body('systemRole') systemRole: string,
    @Req() req: Request,
  ) {
    return this.adminService.updateUserSystemRole(
      adminId,
      targetUserId,
      systemRole,
      req.ip,
      req.get('user-agent'),
    );
  }

  /**
   * 5. 유저 정지 / 복구
   */
  @Patch('users/:userId/status')
  @SudoMode()
  @UseGuards(SudoModeGuard)
  async toggleUserStatus(
    @CurrentUser('userId') adminId: string,
    @Param('userId') targetUserId: string,
    @Req() req: Request,
  ) {
    return this.adminService.toggleUserStatus(
      adminId,
      targetUserId,
      req.ip,
      req.get('user-agent'),
    );
  }

  /**
   * 6. 워크스페이스 목록 조회
   */
  @Get('workspaces')
  async getWorkspaces(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string,
  ) {
    return this.adminService.getWorkspaces(
      Number(page) || 1,
      Number(limit) || 10,
      search,
    );
  }

  /**
   * 7. 워크스페이스 정지 / 복구
   */
  @Delete('workspaces/:workspaceId')
  @SudoMode()
  @UseGuards(SudoModeGuard)
  async toggleWorkspaceStatus(
    @CurrentUser('userId') adminId: string,
    @Param('workspaceId') workspaceId: string,
    @Req() req: Request,
  ) {
    return this.adminService.toggleWorkspaceStatus(
      adminId,
      workspaceId,
      req.ip,
      req.get('user-agent'),
    );
  }

  /**
   * 8. 감사 로그 목록 조회
   */
  @Get('audit-logs')
  async getAuditLogs(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('action') action?: string,
  ) {
    return this.adminService.getAuditLogs(
      Number(page) || 1,
      Number(limit) || 15,
      action,
    );
  }

  /**
   * 9. SUDO 비밀번호 재인증
   */
  @Post('sudo')
  async verifySudo(
    @CurrentUser('userId') adminId: string,
    @Body('password') password: string,
    @Req() req: Request,
  ) {
    return this.adminService.verifySudoPassword(
      adminId,
      password,
      req.ip,
      req.get('user-agent'),
    );
  }

  /**
   * 10. 유저 대행 로그인 (Impersonation)
   */
  @Post('users/:userId/impersonate')
  @SudoMode()
  @UseGuards(SudoModeGuard)
  async impersonateUser(
    @CurrentUser('userId') adminId: string,
    @Param('userId') targetUserId: string,
    @Req() req: Request,
  ) {
    return this.adminService.impersonateUser(
      adminId,
      targetUserId,
      req.ip,
      req.get('user-agent'),
    );
  }

  /**
   * 11. 전역 공지 및 점검 등록
   */
  @Post('notice')
  @SudoMode()
  @UseGuards(SudoModeGuard)
  async createNotice(
    @CurrentUser('userId') adminId: string,
    @Body()
    body: { title: string; content: string; type: 'INFO' | 'MAINTENANCE' },
    @Req() req: Request,
  ) {
    return this.adminService.createSystemNotice(
      adminId,
      body.title,
      body.content,
      body.type,
      req.ip,
      req.get('user-agent'),
    );
  }

  /**
   * 12. 전체 시스템 로그 실시간 조회 (SUPER_ADMIN)
   */
  @Get('system-logs')
  async getSystemLogs(
    @Query('limit') limit?: string,
    @Query('level') level?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 100;
    return this.adminService.getSystemLogs(limitNum, level);
  }
}
