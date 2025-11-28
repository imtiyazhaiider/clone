interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  published: string;
}

interface PageProps {
  params: { name: string };
}

export default async function CategoryPage({ params }: PageProps) {
  const { name } = params;

  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/news.json`, { cache: "no-store" });
  const data = await res.json();

  const articles: Article[] = data.articles.filter(
    (a: Article) => a.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Category: {name}</h1>

      {articles.length === 0 && (
        <p className="text-center text-gray-500">No articles found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <a
            key={article.id}
            href={`/article/${article.id}`}
            className="border rounded-lg shadow hover:bg-gray-50 transition"
          >
            <img
              src={article.image}
              className="w-full h-48 object-cover rounded-t-lg"
              alt={article.title}
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600 text-sm">{article.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
