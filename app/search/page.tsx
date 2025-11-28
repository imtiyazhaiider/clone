import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  published: string;
}

async function searchNews(query: string): Promise<Article[]> {
  if (!query) return [];

  const res = await fetch("http://localhost:3000/news.json", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.articles.filter((a: Article) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams?.q?.trim() || "";
  const articles = await searchNews(query);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <header className="bg-red-700 text-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white text-red-700 px-2 py-1 rounded font-bold text-lg">
              LH
            </div>
            <span className="text-xl font-bold">LiveHindustan Clone</span>
          </Link>
        </div>
      </header>

      {/* SEARCH RESULTS */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-4">
          Search Results for:{" "}
          <span className="text-red-700">{query || "…"}</span>
        </h1>

        {articles.length === 0 && (
          <p className="text-gray-600">No results found.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <article className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="relative h-44 w-full">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-full bg-gray-300 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-3 space-y-1">
                  <h2 className="text-sm font-bold line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
