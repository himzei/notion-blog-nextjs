import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import {
  Youtube,
  Github,
  BookOpen,
  Instagram,
  HandshakeIcon,
  Megaphone,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/features/blog/PostCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TagSection from './_components/TagSection';
import Link from 'next/link';
import { getPublishedPosts, getTagList } from '@/lib/notion';

// mockTags 제거 - 실제 Notion API 데이터 사용

const socialLinks = [
  {
    icon: Youtube,
    href: 'https://www.youtube.com/gymcoding',
  },
  {
    icon: Github,
    href: 'https://github.com/gymcoding',
  },
  {
    icon: BookOpen,
    href: 'https://www.inflearn.com/users/432199/@gymcoding',
  },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/gymcoding',
  },
];

const contactItems = [
  {
    icon: Megaphone,
    title: '광고 및 제휴',
    description: '브랜드 홍보, 컨텐츠 제작, 협업 제안',
    mailto: {
      email: 'bruce.lean17@gmail.com',
      subject: '[광고/제휴] 제안',
      body: '브랜드/제품명:\n제안 내용:\n기간:\n예산:',
    },
  },
  {
    icon: BookOpen,
    title: '강의 문의',
    description: '기술 강의, 워크샵, 세미나 진행',
    mailto: {
      email: 'bruce.lean17@gmail.com',
      subject: '[강의] 문의',
      body: '강의 주제:\n예상 인원:\n희망 일정:\n문의 내용:',
    },
  },
  {
    icon: HandshakeIcon,
    title: '기타 문의',
    description: '채용, 인터뷰, 기타 협업 제안',
    mailto: {
      email: 'bruce.lean17@gmail.com',
      subject: '[기타] 문의',
      body: '문의 종류:\n문의 내용:',
    },
  },
];

interface HomeProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  // URL 쿼리 파라미터에서 태그 필터 추출 (서버사이드에서 처리)
  const resolvedSearchParams = await searchParams;
  const tagFilter = resolvedSearchParams.tag;

  // 서버사이드에서 병렬로 데이터 가져오기 (성능 최적화)
  const [posts, tags] = await Promise.all([
    getPublishedPosts(tagFilter), // 태그 필터링된 포스트 가져오기
    getTagList(), // 태그 목록 가져오기
  ]);

  return (
    // min-h-screen으로 전체 높이 보장, grid로 3개 영역 분할
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        <aside>
          <TagSection tags={tags} currentTag={tagFilter} />
        </aside>
        <div className="space-y-8">
          {/* 섹션 제목 및 필터 정보 */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {tagFilter ? `"${tagFilter}" 태그 포스트` : '블로그 목록'}
            </h2>
            {tagFilter && (
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                필터 초기화
              </Link>
            )}
          </div>

          <Select defaultValue="latest">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="정렬 방식 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">최신순</SelectItem>
              <SelectItem value="oldest">오래된순</SelectItem>
            </SelectContent>
          </Select>

          {/* 블로그 카드 그리드 */}
          <div className="grid gap-4">
            {posts.length > 0 ? (
              posts.map(post => (
                <Link href={`/blog/${post.slug}`} key={post.id}>
                  <PostCard post={post} />
                </Link>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  {tagFilter
                    ? `"${tagFilter}" 태그에 해당하는 포스트가 없습니다.`
                    : '아직 게시된 포스트가 없습니다.'}
                </p>
                {tagFilter && (
                  <Link
                    href="/"
                    className="mt-4 inline-block text-sm text-primary hover:underline"
                  >
                    전체 포스트 보기
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        <aside className="flex flex-col gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-muted rounded-full p-2">
                    <div className="h-36 w-36 overflow-hidden rounded-full">
                      <Image
                        src="/images/profile-light.png"
                        alt="짐코딩"
                        width={144}
                        height={144}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-lg font-bold">짐코딩</h3>
                  <p className="text-primary text-sm">Full Stack Developer</p>
                </div>

                <div className="flex justify-center gap-2">
                  {socialLinks.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="bg-primary/10"
                      size="icon"
                      asChild
                    >
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <item.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>

                <p className="bg-primary/10 rounded p-2 text-center text-sm">
                  코딩 교육 크리에이터 ✨
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>문의하기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {contactItems.map((item, index) => (
                  <a
                    key={index}
                    href={`mailto:${item.mailto.email}?subject=${encodeURIComponent(
                      item.mailto.subject
                    )}&body=${encodeURIComponent(item.mailto.body)}`}
                    className="group bg-primary/5 hover:bg-muted flex items-start gap-4 rounded-lg p-3 transition-colors"
                  >
                    <div className="bg-primary/20 text-primary flex shrink-0 items-center justify-center rounded-md p-1.5">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-muted-foreground text-xs">
                        {item.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
