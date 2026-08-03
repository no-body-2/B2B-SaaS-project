export interface S3Config {
  region: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export function getS3Config(): S3Config | null {
  const region = process.env.AWS_REGION;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !bucketName || !accessKeyId || !secretAccessKey) {
    console.warn(
      '[StorageService] AWS S3 환경변수(AWS_REGION, AWS_S3_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)가 설정되지 않았습니다. 파일 업로드 기능이 비활성화됩니다.',
    );
    return null;
  }

  return {
    region,
    bucketName,
    accessKeyId,
    secretAccessKey,
  };
}
