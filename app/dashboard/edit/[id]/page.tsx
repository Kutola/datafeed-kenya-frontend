"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const { id } = useParams(); // Gets the article ID from URL

  // Protect route + load article
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
    fetchArticle(storedToken);
  }, []);

  const fetchArticle = async (authToken: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/articles/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (res.ok) {
        const article = await res.json();
        setTitle(article.title);
        setContent(article.content);
      } else {
        alert("Article not found or you don't have permission");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setSaving(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      alert("Article updated successfully!");
      router.push("/dashboard");
    } else {
      alert("Failed to update article");
    }

    setSaving(false);
  };

  if (loading) {
    return <p className="text-center py-20 text-[var(--text-secondary)]">Loading article...</p>;
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight">Edit Article</h1>
        <p className="text-[var(--text-secondary)] mt-2">Make changes to your story</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="Enter a compelling title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-3xl px-5 py-4 h-80 resize-y focus:outline-none focus:border-[var(--accent)] transition-colors"
            placeholder="Write your article here..."
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="flex-1 py-4 border border-[var(--border)] rounded-2xl font-semibold hover:bg-[var(--surface)] transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-70 py-4 rounded-2xl font-semibold text-white transition-colors"
          >
            {saving ? "Updating..." : "Update Article"}
          </button>
        </div>
      </form>
    </main>
  );
}