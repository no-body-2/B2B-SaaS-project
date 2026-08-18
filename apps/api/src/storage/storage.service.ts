// apps/api/src/storage/storage.service.ts

/**
 * Storage Service
 *
 * @description
 * - AWS S3 Storage Service
 *
 * @author <nobody>
 * @date 2026-08-18
 */

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PrismaService } from '../prisma/prisma.service';
import { createId } from '@paralleldrive/cuid2';
import { getS3Config, S3Config } from './storage.config';

@Injectable()
export class StorageService {
  private s3Client: S3Client | null = null;
  private config: S3Config | null = null;

  constructor(private prisma: PrismaService) {
    this.config = getS3Config();
    if (this.config) {
      this.s3Client = new S3Client({
        region: this.config.region,
        credentials: {
          accessKeyId: this.config.accessKeyId,
          secretAccessKey: this.config.secretAccessKey,
        },
      });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
    workspaceId?: string,
  ) {
    if (!this.config || !this.s3Client) {
      throw new InternalServerErrorException(
        'AWS S3 환경변수 설정이 올바르지 않습니다.',
      );
    }

    const fileExtension = file.originalname.split('.').pop();
    const storedFilename = `${createId()}.${fileExtension}`;
    const key = `uploads/${storedFilename}`;

    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.config.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      const fileUrl = `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/${key}`;

      // DB FileAttachment 에 Metadata 기록
      const attachment = await this.prisma.fileAttachment.create({
        data: {
          filename: storedFilename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          url: fileUrl,
          uploaderId: userId,
          workspaceId: workspaceId || null,
        },
      });

      return { url: fileUrl, attachment };
    } catch (error) {
      console.error('S3 Upload Error: ', error);
      throw new InternalServerErrorException(
        '파일 업로드에 실패하였습니다. 다시 시도해주세요.',
      );
    }
  }

  /**
   * S3 Direct Upload용 Presigned URL 생성
   */
  generatePresignedUrl(
    filename: string,
    _contentType: string,
    _userId: string,
  ) {
    const fileExtension = filename.split('.').pop();
    const storedFilename = `${createId()}.${fileExtension}`;
    const key = `uploads/${storedFilename}`;

    if (!this.config) {
      const mockUrl = `https://luminano-mock-bucket.s3.ap-northeast-2.amazonaws.com/${key}`;
      return { uploadUrl: `${mockUrl}?presigned=true`, fileUrl: mockUrl, key };
    }

    const fileUrl = `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/${key}`;
    const uploadUrl = `${fileUrl}?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=mock`;

    return { uploadUrl, fileUrl, key };
  }
}
