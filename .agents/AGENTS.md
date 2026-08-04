# LumiNano Workspace Agent Rules

## Git & Feature Development Workflow
- **Standard 4-Step Feature Branch & Release Tagging Strategy**:
  ```bash
  # 1단계: 신규 작업 브랜치 생성 및 이동
  git checkout -b feature/<feature-name>

  # 2단계: 코드 수정 및 테스트 후 커밋
  git add .
  git commit -m "<type>: <description>"

  # 3단계: 작업 완료 후 main 브랜치로 이동 및 병합
  git checkout main
  git merge feature/<feature-name>

  # 4단계: 사용한 작업 브랜치 삭제 & 태그 푸시 배포
  git branch -d feature/<feature-name>
  git tag -a vX.Y.Z -m "Release Version X.Y.Z"
  git push origin main --tags
  ```
