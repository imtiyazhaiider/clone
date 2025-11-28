import Image from "next/image";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  published: string;
}

async function getArticle(id: string): Promise<Article | null> {
  const res = await fetch("http://localhost:3000/news.json");
  const data = await res.json();
  return data.articles.find((a: Article) => a.id === id) || null;
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticle(params.id);

  if (!article) return <div className="p-10">Article not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <div className="relative h-80 w-full mb-4">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
          unoptimized
        />
      </div>

      <p className="text-gray-600 mb-4">{article.description}</p>
      <p className="text-lg leading-relaxed">{article.content}</p>
    </div>
  );
}
