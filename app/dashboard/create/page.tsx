"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticlePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const router = useRouter();

    // Get token and redirect if not logged in
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            router.push("/login");
        } else {
            setToken(storedToken);
        }
    }, [router]);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!token) return;

        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch("http://127.0.0.1:8000/articles/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                setError("Failed to create article. Please try again.");
            }
        } catch (err) {
            setError("Network error. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!token) return <p className="text-center mt-10">Loading...</p>;

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <div className="mb-10">
                <p className="text-gray-600 mt-2">Share your story with the world</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Article Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-3xl font-semibold border-0 border-b-2 border-gray-300 focus:border-black focus:ring-0 px-0 py-3 bg-transparent placeholder-gray-400"
                        placeholder="Share your story..."
                        required
                    />
                </div>

                {/* Content - Large Textarea */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full min-h-[500px] resize-y border border-gray-300 rounded-xl px-5 py-4 text-lg leading-relaxed focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
                        placeholder="Start writing your article here..."
                        required
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-6 border-t">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black text-white px-8 py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? "Publishing..." : "Publish Article"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3.5 text-gray-600 hover:bg-gray-100 rounded-xl transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}