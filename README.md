# Notion Blog with Next.js

Notion API를 사용하여 블로그를 구축한 Next.js 프로젝트입니다.

## 환경 설정

### 1. Notion Integration 설정

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 새 Integration을 생성합니다.
2. Integration Token을 복사합니다.
3. Notion 데이터베이스에 Integration을 공유합니다.

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
# Notion API 설정
NOTION_TOKEN=your_notion_integration_token_here
NOTION_DATABASE_ID=your_notion_database_id_here
```

**중요**:

- `NOTION_TOKEN`: [Notion Integrations](https://www.notion.so/my-integrations)에서 생성한 Integration Token
- `NOTION_DATABASE_ID`: Notion 데이터베이스 URL에서 추출 (32자리 문자열)
- 환경변수 설정 후 개발 서버를 재시작해야 합니다

### 3. Notion 데이터베이스 구조

데이터베이스에 다음 속성들이 필요합니다:

- `Status` (Status): Published/Draft 상태 관리
- `Modified Date` (Last edited time): 수정일시

## Getting Started

환경변수 설정 후 개발 서버를 실행합니다:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
