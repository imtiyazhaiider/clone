interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  published: string;
}

interface PageProps {
  params: { id: string };
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = params;

  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/news.json`, { cache: "no-store" });
  const data = await res.json();

  const article: Article | undefined = data.articles.find(
    (a: Article) => a.id === id
  );

  if (!article) {
    return (
      <h1 className="text-center p-10 text-2xl text-red-500">
        Article Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={article.image}
        className="w-full h-96 object-cover rounded-lg shadow-md"
        alt={article.title}
      />

      <h1 className="text-4xl font-bold mt-6">{article.title}</h1>

      <p className="text-gray-500 mt-2">
        Published on{" "}
        {new Date(article.published).toLocaleDateString("en-IN")}
      </p>

      <p className="mt-6 text-lg leading-relaxed">{article.content}</p>
    </div>
  );
}
