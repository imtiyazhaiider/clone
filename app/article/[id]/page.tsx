export default async function ArticlePage({ params }) {
  const { id } = params;

  const res = await fetch("https://clone-bice-three.vercel.app/news.json");
  const data = await res.json();

  const article = data.articles.find((a) => a.id === id);

  if (!article) {
    return <h1 className="p-10 text-center">Article Not Found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-96 object-cover rounded-lg shadow-md"
      />

      <h1 className="text-4xl font-bold mt-6">{article.title}</h1>

      <p className="text-gray-500 mt-2 text-sm">
        Published on {new Date(article.published).toLocaleDateString("en-IN")}
      </p>

      <p className="mt-6 text-lg leading-relaxed">{article.content}</p>
    </div>
  );
}
