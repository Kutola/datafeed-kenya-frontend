"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Article = {
  id: number;
  title: string;
  content: string;
  published_at: string;
  user_id: number;
};

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
    fetchArticles(storedToken);
  }, []);

  const fetchArticles = async (authToken: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const allArticles = await res.json();
        // Filter to show only articles by current user (we'll improve this later with a dedicated endpoint)
        setArticles(allArticles);
      }
    } catch (error) {
      console.error("Failed to fetch articles");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this article?")) return;

    const res = await fetch(`http://127.0.0.1:8000/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setArticles(articles.filter(a => a.id !== id));
    } else {
      alert("Failed to delete article");
    }
  };

  if (loading) return <p className="text-center py-20">Loading your articles...</p>;
  if (!token) return null;

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Your Dashboard</h1>
          <p className="text-[var(--text-secondary)] mt-1">Manage your stories</p>
        </div>
        <Link
          href="/dashboard/create"
          className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center gap-2"
        >
          ✍️ Write New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-[var(--card)] rounded-3xl border border-[var(--border)]">
          <p className="text-2xl mb-4">You haven't published any articles yet.</p>
          <Link href="/dashboard/create" className="text-[var(--accent)] hover:underline">
            Write your first story →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 hover:border-[var(--accent)]/50 transition-colors"
            >
              <h3 className="font-semibold text-xl leading-tight mb-3 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-[var(--text-secondary)] line-clamp-3 text-[15px] mb-6">
                {article.content}
              </p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">
                  {new Date(article.published_at).toLocaleDateString('en-KE')}
                </span>

                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/edit/${article.id}`}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="text-red-500 hover:text-red-400 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}