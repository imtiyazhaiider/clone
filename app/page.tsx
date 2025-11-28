export default async function HomePage() {
  const API = process.env.NEWS_API_KEY;

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const articles = data.articles || [];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article: any, index: number) => (
          <a
            key={index}
            href={`/article/${index}`}
            className="border rounded-lg shadow p-4 hover:bg-gray-100 transition"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                className="rounded-lg w-full h-64 object-cover mb-3"
                alt=""
              />
            )}

            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600 text-sm">{article.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
