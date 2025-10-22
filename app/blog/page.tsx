export default function Blog() {
  return (
    // min-h-screen으로 전체 높이 보장, grid로 3개 영역 분할
    <div className="container mx-auto px-4 py-8">
      <div className="space-x-8">
        <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
      </div>
    </div>
  );
}
