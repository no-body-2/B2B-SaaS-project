# B2B SaaS Platform Project: Nano

## About
### What is this?
- B2B SaaS 플랫폼을 개발하는 프로젝트입니다.
- Nano 라는 이름에 맞게 최소의 복잡도와 최대의 안정성을 목표로 개발합니다.
- 1차로 MVP 패턴의 구현을 목표로 api/v1을 개발하고 api/v2에서 현 기능의 최적화 및 새로운 기능 추가를 목표로 합니다.

### Who make this?
- 이 프로젝트는 1인 개발 프로젝트입니다.
- Gemini를 도구로서 사용하지만 바이브코딩과는 거리가 멀게 작업한 프로젝트입니다.

### How to make this?
- Backend 부분은 **NestJS**, Frontend 부분은 **Next.js**를 사용합니다.
- Database는 **PostgreSQL**를 사용하고 ORM으로 **Prisma**를 사용합니다.
- Package Manager는 **pnpm**을 사용합니다.
- IDE는 **WebStorm**을 사용합니다.

### Why?
- 이 프로젝트는 스스로 어느 정도의 수준까지 개발할 수 있을 지 확인하기 위한 프로젝트입니다.
- 소프트웨어 아키텍처 등에 관하여 학습한 후 소프트웨어 개발 과정 전반에 대한 이해를 위한 프로젝트입니다.

---

## Backend
### 2026-06-15
- Api v1 완공
### 2026-06-22
- 작업 스케줄러 및 node mailer, Web Socket 메서드 추가 완료
### 2026-07-01
- Frontend와 연동

## Frontend
### 2026-07-01
- Mock -> Backend Api 호출 구조로 변경

## Project
### 2026-07-15
- Google OAuth2 완전 연동
- MailTrap SMTP (Sandbox) 적용으로 메일 전송 기능 확인 완료

### 2026-07-21
- Dockerfile을 통한 Backend 컨테이너화 성공

### 2026-07-22
- Backend run (with Docker) Error 수정
- Frontend Docker 컨테이너화 및 실행 성공

### 2026-07-23
- AWS VPC, Subnet, Internet Gateway, Routing Table 설정 완료
- AWS EC2, 및 구매한 도메인 [luminano.xyz] 연결 완료

---

## TODO
|구역|버전|모듈|할 일|시기|비고| 완료 여부 |
|:-:|:-:|:-:|:-:|:-:|:-----:|:-:|
|Backend|api/v2|ChatRoom|chatRoom.title 이름 변경|2026.06.12|chatRoom.name으로 변경하여 의미 전달을 더 확실하게|X|
|Backend|api/v2|Workspace|워크스페이스 속성 추가|2026.07.21|워크스페이스에 기본적으로 [public | private] 속성을 추가하여 dashboard에서 새로운 워크스페이스 찾기 등의 기능을 통해 Lite User 층 확보를 위한 서비스 작업 추가|X|