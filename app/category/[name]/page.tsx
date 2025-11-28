import Link from "next/link";

export default async function CategoryPage({ params }) {
  const { name } = params;

  const res = await fetch("https://clone-bice-three.vercel.app/news.json");
  const data = await res.json();

  const articles = data.articles.filter(
    (a) => a.category.toLowerCase() === name.toLowerCase()
  );

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">
        Category: {name.toUpperCase()}
      </h1>

      {articles.length === 0 && <p>No articles found.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={article.image}
              className="w-full h-64 object-cover"
              alt=""
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
