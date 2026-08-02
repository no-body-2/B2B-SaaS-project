# LumiNano Workspace Agent Rules

## Git & Feature Development Workflow
- **Short-lived Feature Branch Strategy**:
  - Whenever adding new features, modifying core APIs, or upgrading versions, create a feature branch first (`feature/<feature-name>` or `fix/<bug-name>`).
  - Perform all edits, tests, and builds on the feature branch.
  - After verification passes, merge back into `main` and clean up the feature branch (`git branch -d`).
  - Tag release versions (`vX.Y.Z`) on `main` and push tags to trigger production deployments.
