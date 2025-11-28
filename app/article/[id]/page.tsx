export default async function ArticlePage({ params }: { params: { id: string } }) {
  const API = process.env.NEWS_API_KEY;

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const articles = data.articles || [];

  const article = articles[parseInt(params.id)];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl text-red-600 font-bold">Article Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      {article.urlToImage && (
        <img
          src={article.urlToImage}
          className="rounded-lg w-full mb-6"
          alt=""
        />
      )}

      <p className="text-gray-600 mb-4">{article.author}</p>
      <p className="text-lg leading-7">{article.content || article.description}</p>

      <a
        href={article.url}
        target="_blank"
        className="block mt-6 text-blue-600 underline"
      >
        Read full article →
      </a>
    </div>
  );
}
