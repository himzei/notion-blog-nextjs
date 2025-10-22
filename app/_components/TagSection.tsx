import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { TagFilterItem } from '@/types/blog';
import { cn } from '@/lib/utils';

interface TagSectionProps {
  tags: TagFilterItem[];
  currentTag?: string; // 서버사이드에서 현재 활성 태그를 props로 전달
}

export default function TagSection({ tags, currentTag }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.length > 0 ? (
            tags.map(tag => {
              // 서버사이드에서 전달받은 currentTag로 활성 상태 판단
              const isActive =
                currentTag === tag.name || (!currentTag && tag.name === '전체');

              return (
                <Link
                  href={tag.name === '전체' ? '/' : `?tag=${tag.name}`}
                  key={tag.id}
                >
                  <div
                    className={cn(
                      'flex items-center justify-between rounded-md p-1.5 text-sm transition-colors cursor-pointer',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted-foreground/10 text-muted-foreground'
                    )}
                  >
                    <span>{tag.name}</span>
                    <span>{tag.count}</span>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm">태그가 없습니다.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
