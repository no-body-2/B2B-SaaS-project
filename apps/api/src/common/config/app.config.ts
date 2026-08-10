/**
 * Central Environment Configuration Module
 *
 * @description
 * apps/api 내 모든 모듈에서 환경변수(process.env.*)에 직접 접근하지 않고
 * 타입 안전성이 보장된 appConfig를 사용하도록 관리합니다.
 */

export interface S3Config {
  region: string;
  bucketName: string;
  accessKeyId: string;
  secretAccessKey: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
}

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

const getEnv = (): string => process.env.NODE_ENV || 'development';
const getFrontendUrl = (): string =>
  process.env.FRONTEND_URL || 'http://localhost:3000';

export const appConfig = {
  // 1. 서버 기본 설정
  get env(): string {
    return getEnv();
  },

  get isProduction(): boolean {
    return getEnv() === 'production';
  },

  get port(): number {
    return parseInt(process.env.PORT || '4000', 10);
  },

  get frontendUrl(): string {
    return getFrontendUrl();
  },

  get workspaceInvitationUrl(): string {
    return (
      process.env.WORKSPACE_INVITATION_URL ||
      `${getFrontendUrl()}/workspace/invite/accept`
    );
  },

  // 2. 데이터베이스 설정
  get databaseUrl(): string {
    return (
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@localhost:5432/luminano'
    );
  },

  // 3. 레디스 설정
  get redisUrl(): string | undefined {
    return process.env.REDIS_URL;
  },

  // 4. JWT 시크릿 설정
  get jwtAccessSecret(): string {
    return process.env.JWT_ACCESS_SECRET || 'luminano_default_access_secret';
  },

  get jwtRefreshSecret(): string {
    return process.env.JWT_REFRESH_SECRET || 'luminano_default_refresh_secret';
  },

  // 5. Google OAuth 설정
  get google(): GoogleOAuthConfig {
    return {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      redirectUri:
        process.env.GOOGLE_REDIRECT_URI ||
        `${getFrontendUrl()}/auth/google/callback`,
    };
  },

  // 6. SMTP 설정
  get smtp(): SmtpConfig {
    return {
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '4f3b99021172e2',
      pass:
        process.env.SMTP_PASSWORD || process.env.SMTP_PASS || 'e8f731c3600f68',
      fromName: process.env.SMTP_FROM_NAME || 'LumiNano',
      fromEmail: process.env.SMTP_FROM_EMAIL || 'no-reply@luminano.com',
    };
  },

  // 7. AWS S3 설정
  get s3(): S3Config | null {
    const region = process.env.AWS_REGION;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!region || !bucketName || !accessKeyId || !secretAccessKey) {
      return null;
    }

    return {
      region,
      bucketName,
      accessKeyId,
      secretAccessKey,
    };
  },
};
