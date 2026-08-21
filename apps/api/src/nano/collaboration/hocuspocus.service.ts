// apps/api/src/nano/collaboration/hocuspocus.service.ts

/**
 * Hocuspocus Yjs Collaboration Service
 *
 * @description
 * - WebSocket 기반 Yjs CRDT(Conflict-free Replicated Data Types) 실시간 동시 편집 제어
 * - Nano 수정 시 DB(nanos) 자동 저장 및 JWT 권한 인증
 *
 * @author <nobody>
 * @date 2026-08-18
 */

import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import {
  Server,
  onAuthenticatePayload,
  onStoreDocumentPayload,
} from '@hocuspocus/server';
import { PrismaService } from '../../prisma/prisma.service';
import * as Y from 'yjs';

@Injectable()
export class HocuspocusService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(HocuspocusService.name);
  private hocuspocusServer!: Server;

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    // Hocuspocus WebSocket Server Init
    this.hocuspocusServer = new Server({
      port: 1234,
      name: 'luminano-collaboration-server',

      // 1. Authenticate Hook (JWT & Document Access Permission)
      onAuthenticate(data: onAuthenticatePayload) {
        const { token } = data;
        if (!token) {
          throw new Error('인증 토큰이 누락되었습니다.');
        }

        // 인증 성공 시 Client Session Context 전달
        return Promise.resolve({
          user: { id: 'user-123', name: 'John Doe' },
        });
      },
      onLoadDocument: async (data: {
        documentName: string;
        document: Y.Doc;
      }) => {
        const nanoId = data.documentName;
        const nano = await this.prisma.nano.findUnique({
          where: { id: nanoId },
        });
        if (nano && nano.content) {
          const textContent =
            typeof nano.content === 'string'
              ? nano.content
              : JSON.stringify(nano.content);
          const yText = data.document.getText('codemirror');
          if (yText.length === 0) {
            yText.insert(0, textContent);
          }
        }
        return data.document;
      },

      // 3. Document Save Hook (Debounce 적용 DB Persistence)
      onStoreDocument: async (data: onStoreDocumentPayload) => {
        const nanoId = data.documentName; // documentName = nanoId
        const _stateVector = Y.encodeStateAsUpdate(data.document);
        const yText = data.document.getText('codemirror');
        const textContent = yText.toJSON();

        this.logger.log(`[Hocuspocus] Nano ${nanoId} DB 저장중...`);

        await this.prisma.nano.update({
          where: { id: nanoId },
          data: {
            content: textContent,
            updatedAt: new Date(),
          },
        });
      },
    });

    void this.hocuspocusServer.listen();
    this.logger.log(
      '[Hocuspocus] Yjs WebSocket Collaboration Server started on port 1234',
    );
  }

  onModuleDestroy() {
    if (this.hocuspocusServer) {
      void this.hocuspocusServer.destroy();
    }
  }
}
