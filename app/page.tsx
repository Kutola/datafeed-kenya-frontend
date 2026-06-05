import Link from "next/link"

export default async function HomePage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/`, { 
    cache: "no-store" 
  });
  const articles = await response.json();

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
          Independent journalism from the heart of Kenya
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <div 
            key={article.id} 
            className="article-card bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                <span>{article.user?.name || "Anonymous"}</span>
                <span>·</span>
                <span>{new Date(article.published_at).toLocaleDateString('en-KE', {
                  weekday: "short",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                }).replace(",", " ·")}
                </span>
              </div>

              <h2 className="text-xl font-semibold leading-tight mb-3 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                <Link href={`/articles/${article.id}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-[var(--text-secondary)] line-clamp-3 text-[15px]">
                {article.content}
              </p>
            </div>

            <div className="border-t border-[var(--border)] px-6 py-4">
              <Link 
                href={`/articles/${article.id}`}
                className="text-sm font-medium text-[var(--accent)] hover:underline inline-flex items-center gap-1"
              >
                Read full story →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <p className="text-center text-[var(--text-muted)] py-20">No articles yet. Be the first to publish!</p>
      )}
    </main>
  );
}
