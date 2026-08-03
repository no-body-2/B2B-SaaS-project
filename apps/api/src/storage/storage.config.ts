export interface S3Config {
  region: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export function getS3Config(): S3Config {
  const region = process.env.AWS_REGION;
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!region || !bucketName || !accessKeyId || !secretAccessKey) {
    throw new Error(
      '[StorageError] AWS S3 환경변수가 설정되지 않았습니다. 환경변수를 다시 확인해주세요.',
    );
  }

  return {
    region,
    bucketName,
    accessKeyId,
    secretAccessKey,
  };
}
