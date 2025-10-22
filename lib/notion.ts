import { Client } from "@notionhq/client";
import { Post } from "@/types/blog";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN
})

// 노션 API cover 객체에서 이미지 URL을 안전하게 추출하는 헬퍼 함수
const getCoverImageUrl = (cover: any): string => {
  if (!cover) return '';
  
  switch (cover.type) {
    case 'external':
      return cover.external?.url || '';
    case 'file':
      return cover.file?.url || '';
    default:
      return '';
  }
};

// 노션 API 응답을 Post 타입으로 변환하는 헬퍼 함수
const transformNotionPostToPost = (notionPost: any): Post => {
  const properties = notionPost.properties;
  
  // 제목 추출 (title 타입)
  const title = properties.Title?.title?.[0]?.plain_text || '';
  
  // 설명 추출 (rich_text 타입)
  const description = properties.Description?.rich_text?.[0]?.plain_text || '';
  
  // 슬러그 추출 (rich_text 타입)
  const slug = properties.Slug?.rich_text?.[0]?.plain_text || '';
  
  // 태그 추출 (multi_select 타입)
  const tags = properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
  
  // 작성자 추출 (people 타입)
  const author = properties.Author?.people?.[0]?.name || '';
  
  // 날짜 추출 (date 타입)
  const date = properties.Date?.date?.start || '';
  
  // 수정 날짜 추출 (date 타입)
  const modifiedDate = properties["Modified Date"]?.date?.start || '';
  
  // 커버 이미지 추출 (cover 속성)
  const coverImage = notionPost.cover?.external?.url || notionPost.cover?.file?.url || '';
  
  return {
    id: notionPost.id,
    title,
    description,
    coverImage,
    tags,
    author,
    date,
    modifiedData: modifiedDate,
    slug
  };
};

// 서버사이드에서 태그별 포스트 필터링 함수 (성능 최적화)
export const getPublishedPosts = async (tagFilter?: string): Promise<Post[]> => {
  try {
    // 입력값 검증 및 정규화
    const normalizedTagFilter = tagFilter?.trim();
    
    // 기본 필터: Published 상태인 포스트만
    const baseFilter = {
      property: "Status", 
      select: {
        equals: "Published"
      }
    };

    // 태그 필터링 로직: '전체' 또는 빈 값인 경우 모든 Published 포스트 반환
    let finalFilter: any = baseFilter;
    
    if (normalizedTagFilter && normalizedTagFilter !== '전체') {
      // 특정 태그로 필터링하는 경우 AND 조건으로 결합
      finalFilter = {
        and: [
          baseFilter,
          {
            property: "Tags",
            multi_select: {
              contains: normalizedTagFilter
            }
          }
        ]
      };
    }

    // Notion API 호출 (서버사이드에서 실행)
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_SOURCE_ID!,
      filter: finalFilter,
      sorts: [
        {
          property: "Date", 
          direction: "descending"
        }
      ]
    });
    
    // 노션 응답을 Post 타입으로 변환 (에러 처리 포함)
    const posts: Post[] = response.results
      .map(transformNotionPostToPost)
      .filter(post => post.slug && post.title); // 유효한 포스트만 필터링
    
    return posts;
  } catch (error) {
    console.error('노션 API에서 포스트를 가져오는 중 오류 발생:', error);
    console.error('태그 필터:', tagFilter);
    // 에러 발생 시 빈 배열 반환 (서버사이드 안정성 보장)
    return [];
  }
};

// Notion API에서 태그 목록을 가져오는 함수
export const getTagList = async (): Promise<{ id: string; name: string; count: number }[]> => {
  try {
    const response = await notion.dataSources.query({
      data_source_id: process.env.NOTION_SOURCE_ID!,
      filter: {
        property: "Status", 
        select: {
          equals: "Published"
        }
      }
    });
    
    // 모든 포스트에서 태그 추출
    const allTags: string[] = [];
    response.results.forEach((post: any) => {
      const tags = post.properties.Tags?.multi_select?.map((tag: any) => tag.name) || [];
      allTags.push(...tags);
    });
    
    // 태그별 개수 계산
    const tagCountMap = new Map<string, number>();
    allTags.forEach(tag => {
      tagCountMap.set(tag, (tagCountMap.get(tag) || 0) + 1);
    });
    
    // TagFilterItem 형태로 변환
    const tagList = Array.from(tagCountMap.entries()).map(([name, count], index) => ({
      id: `tag-${index + 1}`,
      name,
      count
    }));
    
    // 전체 태그 추가 (모든 포스트 수)
    const totalPosts = response.results.length;
    const result = [
      { id: 'all', name: '전체', count: totalPosts },
      ...tagList.sort((a, b) => b.count - a.count) // 개수 순으로 정렬
    ];
    
    return result;
  } catch (error) {
    console.error('노션 API에서 태그 목록을 가져오는 중 오류 발생:', error);
    // 에러 발생 시 기본 태그 반환
    return [
      { id: 'all', name: '전체', count: 0 }
    ];
  }
};