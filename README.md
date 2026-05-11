# 🚀 CI/CD 환경 구축 과제: React Task Dashboard

## 1. 시스템 소개

본 프로젝트는 Github Actions와 AWS S3를 활용하여 **프론트엔드 애플리케이션의 자동화된 CI/CD(지속적 통합/지속적 배포) 파이프라인을 구축**하는 것을 목적으로 개발된 단일 페이지 웹 시스템입니다.
생성형 AI의 보조를 받아 React 기반의 모던한 Todo List(할 일 관리) 대시보드를 구현하였으며, 코드의 변경 사항이 Github `main` 브랜치에 푸시될 때마다 자동으로 빌드되고 AWS S3에 동기화되도록 구성하였습니다.

## 2. 기능 소개 및 UI/UX

- **CRUD 기능 완벽 구현**
    - **Create:** 텍스트 입력 후 '추가' 버튼 또는 Enter 키를 통해 새로운 할 일 등록
    - **Read:** 등록된 작업 목록 및 완료 상태 즉시 조회
    - **Update:** 체크박스 클릭 및 텍스트 클릭 시 취소선 처리를 통한 완료 상태 토글
    - **Delete:** 개별 작업 삭제 기능
- **데이터 영구 보존:** 브라우저의 `localStorage`를 활용하여 새로고침 후에도 데이터가 유지되도록 구현
- **디자인:** 전문적인 IT 개발자 환경에 어울리도록 '딥 블루(Deep Blue)'와 '네이비(Navy)'를 포인트 컬러로 채택하여 세련되고 직관적인 UI 구성

## 3. Github Actions 기반 CI/CD 환경 소개

이 프로젝트는 Github Actions를 통해 자동 배포 파이프라인을 구축했습니다.

- **트리거(Trigger):** `main` 브랜치에 코드가 `push` 될 때 Workflow가 자동 실행됩니다.
- **배포 환경:** `ubuntu-latest` 환경에서 `Node.js 20` 버전을 사용합니다.
- **CI/CD 파이프라인 단계:**
    1. 저장소 코드 Checkout
    2. Node.js 환경 설정
    3. 의존성 패키지 설치 (`npm install`)
    4. React 프로젝트 정적 파일 빌드 (`npm run build`)
    5. AWS 자격 증명 (AWS Academy 환경 특성을 고려하여 `AWS_SESSION_TOKEN`을 GitHub Secrets에 추가로 등록하여 보안 및 인증 해결)
    6. AWS CLI를 통한 S3 버킷 동기화 (`aws s3 sync`)

## 4. AWS 배포 URL

## 5. CI/CD 구축 시연 영상 (YouTube)
