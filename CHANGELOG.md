# 📜 LumiNano Changelog

All notable changes to the **LumiNano B2B SaaS** project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-07-29

### 🚀 Added
- **공개(Public) 워크스페이스 추천 및 가입 요청 시스템**:
  - `Workspace` 스키마에 `isPrivate` (기본값 `true`) 추가 및 `WorkspaceJoinRequest` 마이그레이션 모델 연동.
  - 대시보드 하단에 **[🌐 추천 공개 워크스페이스 탐색]** 섹션 신설 및 [가입 신청] 기능 추가.
- **OWNER / ADMIN 전용 [멤버 및 가입 관리] 전용 페이지**:
  - 워크스페이스 사이드바 결재 메뉴 하단에 멤버 및 가입 신청 통합 관리 탭 신설.
  - 멤버 이메일 초대, 권한 수정(ADMIN/MEMBER), 멤버 강퇴 기능 제공.
  - 공개 워크스페이스 가입 신청자 대기열 조회 및 [승인] / [거절] 기능 연동.
- **Nano 문서 Drag & Drop 순서 및 계층 변경**:
  - `OWNER` 및 `ADMIN` 권한 사용자 대상 사이드바 문서 드래그 핸들 노출.
  - 드래그로 순서 변경 시 상단 **[변경사항 적용]** 버튼 활성화 및 서버 DB position 일괄 동기화.

### 🛠️ Fixed
- **채팅 작성자 본인 메시지 Broadcast 빈 카드 버그 수정**:
  - WebSocket Broadcast 수신 시 `messageId` 파싱 및 `content` 유효성 체크 강화로 빈 카드 생성 문제 해결.
  - REST 전송 응답과 소켓 수신 메시지 간 중복 합병(Deduplication) 처리.
- **한국어 성명 표기법 교정**:
  - `firstName`과 `lastName` 결합 순서를 `${lastName}${firstName}`으로 변경하여 `길동 홍` ➡️ `홍길동` 표기로 교정.
- **워크스페이스 무한 리렌더링 및 화면 깜빡임 오류 해결**:
  - `WorkspaceContext.tsx` 내 `selectWorkspace` 함수 `useCallback` 래핑 및 페이지 단위 `activeWorkspace.id` 가드 로직 추가.

### 🔗 Changed
- **접속 도메인 예시 및 URL 라우팅 고도화**:
  - 워크스페이스 생성 모달 예시 텍스트 `.luminano.com` ➡️ `.luminano.xyz` 전면 교정.
  - CUID ID 접속뿐만 아니라 영문 도메인 슬러그(`/workspace/my-team`) 라우팅 지원.
  - 도메인 생성 시 실시간 중복 도메인 검사 및 `ConflictException` 핸들링 추가.

---

## [1.0.0] - 2026-07-27

### 🚀 Initial Release
- B2B SaaS 멀티 테넌시 워크스페이스 시스템 최초 릴리즈
- Next.js 16 (App Router) & NestJS 모노레포 구축
- PostgreSQL & Prisma 7 데이터베이스 및 K3s 쿠버네티스 CI/CD 자동화 배포 연동
