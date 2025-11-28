import Link from "next/link";

export default async function HomePage() {
  const res = await fetch("https://clone-bice-three.vercel.app/news.json", {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const articles = data.articles;

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">Top News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.description}</p>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(article.published).toLocaleDateString("en-IN")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
