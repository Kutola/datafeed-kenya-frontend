export default async function ArticlePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  let article;
  try {
    const res = await fetch(`http://127.0.0.1:8000/articles/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Article not found");
    article = await res.json();
  } catch (error) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <p className="text-[var(--text-secondary)]">The story you're looking for doesn't exist or has been removed.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Article Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter mb-6">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <span>By <span className="text-white font-medium">{article.user?.name || "Anonymous Journalist"}</span></span>
          <span>·</span>
          <span>
            {new Date(article.published_at).toLocaleDateString('en-KE', {
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
      </div>

      {/* Article Content */}
      <div className="prose prose-invert max-w-none">
        <article 
          className="text-[17px] leading-relaxed text-[var(--text-secondary)] whitespace-pre-wrap"
          style={{ fontFamily: 'var(--font-geist-sans)' }}
        >
          {article.content}
        </article>
      </div>

      {/* Footer Actions */}
      <div className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
        <a 
          href="/"
          className="text-[var(--accent)] hover:underline flex items-center gap-2 text-sm font-medium"
        >
          ← Back to all stories
        </a>

        <div className="text-xs text-[var(--text-muted)]">
          Newsfeed Kenya • Independent Journalism
        </div>
      </div>
    </main>
  );
}