import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8 min-h-[calc(100vh-200px)]">
        {/* 좌측 사이드바 */}
        <aside className="w-64 shrink-0">
          <Card className="p-6 sticky top-8">
            <nav className="space-y-2">
              <h3 className="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">
                개발자 정보
              </h3>

              {/* 메뉴 목록 */}
              <div className="space-y-1">
                <Link
                  href="/about"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  👨‍💻 프로필
                </Link>

                <Link
                  href="/about/skills"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  🛠️ 기술 스택
                </Link>

                <Link
                  href="/about/experience"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  💼 경력
                </Link>

                <Link
                  href="/about/projects"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  🚀 프로젝트
                </Link>

                <Link
                  href="/about/education"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  🎓 교육
                </Link>

                <Link
                  href="/about/contact"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                >
                  📧 연락처
                </Link>
              </div>

              {/* 추가 정보 섹션 */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-3">
                  빠른 링크
                </h4>
                <div className="space-y-1">
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    📁 GitHub
                  </Link>

                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    💼 LinkedIn
                  </Link>

                  <Link
                    href="/blog"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                  >
                    📝 블로그
                  </Link>
                </div>
              </div>
            </nav>
          </Card>
        </aside>

        {/* 우측 메인 콘텐츠 영역 */}
        <main className="flex-1 min-w-0">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
