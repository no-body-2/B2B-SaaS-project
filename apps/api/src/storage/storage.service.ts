import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { PrismaService } from '../prisma/prisma.service';
import { createId } from '@paralleldrive/cuid2';
import { getS3Config, S3Config } from './storage.config';

@Injectable()
export class StorageService {
  private s3Client: S3Client;
  private config: S3Config;

  constructor(private prisma: PrismaService) {
    this.config = getS3Config();
    this.s3Client = new S3Client({
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
    });
  }

  async uploadFile(file: Express.Multer.File, userId: string, workspaceId?: string) {
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

      // DB FileAttachment에 Metadata 기록
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
      console.error('S3 Upload Error:', error);
      throw new InternalServerErrorException('파일 업로드에 실패하였습니다. 다시 시도해주세요.');
    }
  }
}