export default async function HomePage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/news.json`, { cache: "no-store" });
  const data = await res.json();
  const articles = data.articles;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article: any) => (
          <a
            key={article.id}
            href={`/article/${article.id}`}
            className="border rounded-lg shadow p-4 hover:bg-gray-50 transition"
          >
            <img
              src={article.image}
              alt={article.title}
              className="rounded-lg w-full h-64 object-cover"
            />

            <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
            <p className="text-gray-600 text-sm">{article.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
