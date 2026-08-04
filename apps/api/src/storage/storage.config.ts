import { appConfig, S3Config } from '../common/config/app.config';

export type { S3Config };

export function getS3Config(): S3Config | null {
  const config = appConfig.s3;
  if (!config) {
    console.warn(
      '[StorageService] AWS S3 환경변수(AWS_REGION, AWS_S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)가 설정되지 않았습니다. 파일 업로드 기능이 비활성화됩니다.',
    );
    return null;
  }
  return config;
}
