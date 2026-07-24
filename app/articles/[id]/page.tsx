import Link from "next/link";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${params.id}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p className="text-[var(--text-secondary)]">Article not found.</p>
        <Link href="/" className="text-[var(--accent)] hover:underline mt-4 inline-block">
          ← Back to all stories
        </Link>
      </main>
    );
  }

  const article = await response.json();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/" className="text-[var(--accent)] hover:underline text-sm mb-8 inline-block">
        ← Back to all stories
      </Link>

      <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
        {article.title}
      </h1>

      <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] mb-10 border-b border-[var(--border)] pb-6">
        <span className="font-medium">{article.user?.name || "Anonymous Journalist"}</span>
        <span>·</span>
        <span>
          {article.published_at
            ? new Date(article.published_at).toLocaleDateString("en-KE", {
                weekday: "short",
                day: "numeric",
                month: "long",
                year: "numeric",
              })
            : "Unknown date"}
        </span>
      </div>

      <div className="prose prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed text-[17px] whitespace-pre-wrap">
        {article.content}
      </div>
    </main>
  );
}