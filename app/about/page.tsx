export default function About() {
  return (
    <div className="space-y-6">
      {/* 페이지 제목 */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          개발자 프로필
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          프론트엔드 개발자로서의 여정과 경험을 소개합니다.
        </p>
      </div>

      {/* 프로필 섹션 */}
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            안녕하세요! 👋
          </h2>
          <div className="prose prose-gray dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              저는 사용자 경험을 중시하는 프론트엔드 개발자입니다. React,
              Next.js, TypeScript를 주로 사용하며, 깔끔하고 직관적인
              인터페이스를 만드는 것을 좋아합니다.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              지속적인 학습과 성장을 통해 더 나은 개발자가 되기 위해 노력하고
              있으며, 팀워크와 소통을 중요하게 생각합니다.
            </p>
          </div>
        </section>

        {/* 간단한 통계 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            개발 통계
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                3+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                년 경력
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                50+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                프로젝트
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                10+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                기술 스택
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
