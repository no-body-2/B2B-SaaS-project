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

### 2026-07-01-2

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
- Kubenetes(k3s) & controller 설정 완료 (AWS EC2에 설정)

### 2026-07-25

- 07/24 부터 기존 작업 중이던 AWS EC2 서버의 아키텍처를 Amd -> Arm 으로 변경 후 재작업
- 변경 요인으로는 작업 환경에서의 호환성과 가격 대비 성능을 따져 Arm으로 서버를 재구축 하기로 함
- Amd t3a.medium으로 구현 중 Docker를 통해 생성한 Image에 최적화 및 코드 수정 등의 작업이 필요해 보여 추후 유지보수 및 관리를 위한 목적 또한 결정에 반영됨

### 2026-07-26

- 작업 후 EC2 환경에 yaml 파일들을 작성
- ingress의 버전 호환성에 문제가 있는 것으로 추정
- 타 파일들은 문제가 없으니 ingress의 문제를 해결하고 EC2 배포 단계를 완료할 예정

### 2026-07-27

- EC2 환경에서 `kubectl get pods` 명령어 실행 시 모든 요소들 Running 으로 정상 상태 동작 확인 완료
- 배포 완료
- CD 설정 후 배포 환경에서 문제가 되는 부분들 수정할 것

### 2026-07-28

- 배포 환경에서 api 연결 오류 문제 발견
- 배포 환경 api 연결 문제 수정

### 2026-07-29

- 배포 환경에서 Database 연결 문제 확인
- Database 문제 해결 완료
- UI 문제 발견

### 2026-07-31

- 1.1.0 배포 완료 상태
- 1.1.1 UI 버그 및 몇가지 UI 수정

### 2026-08-01

- 1.1.1 버전에서 브라우저 미리보기 아이콘 수정
- 1.2.0 버전으로 업데이트 (User 항목에 이미지, 닉네임 추가)

### 2026-08-02

- 1.2.0 버전 배포 완료
- 회원가입 Form 및 DTO에 사용자 닉네임 필드 추가 (1.2.1)

### 2026-08-03

- Media Storage AWS 내부에 설정 완료
- apps/api/src/storage 경로에 연결 파일 작성 중
- 작성 완료 및 config 파일을 통한 보안화 완료

### 2026-08-04

- v1.3.0 Release
- Workspace 신규 생성 시 Domain 영문 유효성 검사
- 결재 요청 시 기안자 이름이 Unknown으로 표시되는 문제 해결
- Nano Tree에서 펼치기/접기 등으로 하위 Nano 목록 확인 가능
- Workspace Domain 표기 방식 실제 서비스와 동일하게 개편
- Workspace 권한에 따른 색상 표기 구분
- Workspace 가입 시 자동 새로고침으로 UX 향상
- Dashboard를 통하여 사용자의 정보 및 정보 수정 창으로 이동 가능

### 2026-08-04 -2

- v1.3.1 Release
- api 디렉터리 하위 모듈들에 대해 env 직접 노출 및 예시값 노출 최소화

### 2026-08-06

- Standard Logger -> Winston으로 교체 진행 중

### 2026-08-07

- v1.4.0 Release
- Winston Logger 장착 및 Log 저장 기능 구현 완료

### 2026-08-09

- 이전 작업에서 관리자 페이지 생성 및 기능 장착 완료
- 다만 새로운 배포 버전 (v1.5.0)에서 발견된 CrashloopBackOff 해결 작업 중

### 2026-08-10

- v1.5.1 배포 환경에서 발견된 문제 (DATABASE 연결 오류)
- v1.5.2 Release: DATABASE 연결 오류 해결 및 정상 작동 확인
- v1.6.0 제작 시작 -> Google OAuth2 실서비스와 연동 시작
- v1.6.1 Google Redirect가 적용되지 않는 오류 해결
- Next.js의 환경변수 관리는 Build 시에 적용되는 것들이 있음
- v1.6.3 Google Redirect 후 서비스 로그인이 되지 않는 오류
- v1.6.4 Fix Google OAuth Redirect Error and Release

### 2026-08-11

- v1.7.0 배포
- github OAuth 추가 및 연동
- v1.8.0 제작 시작
- AWS SES 적용으로 실제 이메일 전송 기능 구현
- 현재 심사중으로 12-24시간 이후 다음 작업 진행

### 2026-08-12

- Luminano 프로젝트의 향후 진행 방향 및 취업 목적 포트폴리오 성격에 맞게 수정하기 위한 계획 수립
- 사용해본적 없는 기술이나 더욱 상세한 Test 등의 계획을 10일 정도의 계획으로 맞춰둔 상태
- 다른 일과 병행한다해도 9월 1일 전에 완료할 수 있도록 할 것
- 가벼운 수정 사항들 반영 v1.7.1

### 2026-08-13

- Fix Lint Error
- 10일 계획에 몇가지 사항들을 추가하여 프로젝트의 규모 및 안정성을 향상시킬 생각

### 2026-08-14

- v1.8.0 Release
- Crypto Module 신설 및 단위 테스트 통과

### 2026-08-15

- v1.8.0 CI Error Fix
- v1.9.0 Outbox Pattern 적용으로 시스템 안정성 향상
- v1.10.0 분산 락 시스템 적용

### 2026-08-16

- v1.11.0 계층형 Bitmask ACL 및 동적 정책 엔진 적용 완료

### 2026-08-17

- v1.12.0 실 서비스형 (Naver Cafe 등의 기능을 참고하여 구현) 커뮤니티 탐색 & 태그 분석 분산 배치 스케줄러 적용 완료

### 2026-08-18

- v1.13.0 Lexicographical Fractional Indexing D&D 트리 & 테마 스위처 시스템 적용 완료
- v1.14.0 Hocuspocus & markdown editer

---

## TODO

|   구역   |  버전  |    모듈     |                                     할 일                                     |    시기    |                                                              비고                                                               |                                                         완료 여부                                                          |
| :------: | :----: | :---------: | :---------------------------------------------------------------------------: | :--------: | :-----------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------: | --- |
| Backend  | api/v2 |  ChatRoom   |                           chatRoom.title 이름 변경                            | 2026.06.12 |                                       chatRoom.name으로 변경하여 의미 전달을 더 확실하게                                        |                                                             X                                                              |
| Backend  | api/v2 |  Workspace  |                            워크스페이스 속성 추가                             | 2026.07.21 |                                                워크스페이스에 기본적으로 [public                                                | private] 속성을 추가하여 dashboard에서 새로운 워크스페이스 찾기 등의 기능을 통해 Lite User 층 확보를 위한 서비스 작업 추가 | X   |
| Backend  | api/v2 |  Database   |                              미디어 저장소 구축                               | 2026.08.02 |                  S3와 같은 객체 저장소를 이용한 미디어 저장소 구축으로 시스템 내의 동영상, 이미지 등 별도 저장                  |                                                             X                                                              |
|  System  |   .    |     Log     |                     개발 환경 및 관리 환경에서의 Log관리                      | 2026.08.02 |                    유지보수의 편의성을 위하여 EC2 환경에 접근하지 않아도 로그 확인 등이 가능하도록 작업 필요                    |                                                             X                                                              |
|  System  | v1.3.0 |   System    | 최고 관리자 (개발자) 등의 서비스 최종 관리를 위한 전용 Page 및 관리 기능 추가 | 2026.08.02 |                        개발자 및 관리자가 서비스를 최종적으로 관리할 수 있는 전용 Page 및 관리 기능 추가                        |                                                             X                                                              |
| Backend  | api/v2 |    User     |            Google & Github의 OAuth 연동을 실 서비스에도 적용할 것             | 2026.08.02 |             Google OAuth는 현재 로컬 환경에서 테스트 및 작동 확인이 완료 되었지만 배포 버전에서는 아직 미연동 상태              |                                                             X                                                              |
| Backend  | api/v2 |   Mailer    |     현재 MailTrap을 통해 테스트 및 샌드박스 환경을 실 서비스로 변경할 것      | 2026.08.02 | MailTrap의 샌드박스 환경에서만 확인이 가능한 메일 환경을 AWS 등의 플랫폼을 통하여 도메인을 발급 받아 실제 메일 발송을 확인할 것 |                                                             X                                                              |
| Frontend | v1.X.X | Drag & Drop |                     Nano 계층 및 순서 관리 시스템 재정립                      | 2026.08.02 |                        현재 워크스페이스 화면의 좌측 바에서 확인 가능한 Nano 수정 기능을 전면 개편할 것                         |                                                             X                                                              |

### 기타 수정 사항

- Workspace 가입 시 Dashboard 화면 or 컴포넌트 자동 새로고침
- Owner & Admin & Member의 권한에 따른 색상 차이를 두어 UX 향상
- 몇몇 Approval Request에서 기안자가 Unknown 으로 확인되는 현상 수정할 것
- Nano 생성 시 즉시 내용 또한 입력할 수 있는 창을 열어주고 그 내용을 기반으로 초기 버전의 문서를 생성할 것
- 현재 web.luminano.xyz 도메인을 최종 제출 용 버전으로 확정지을 시 www. 으로 수정할 것
