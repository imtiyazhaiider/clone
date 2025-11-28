import fs from "fs";
import path from "path";

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const filePath = path.join(process.cwd(), "public", "news.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const article = data.articles.find((a: any) => a.id == params.id);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-3xl text-red-600 font-bold">Article Not Found</h1>
      </div>
    );
  }

  // Convert published date
  const published = new Date(article.published).toLocaleDateString("en-IN", {
    dateStyle: "medium",
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{article.title}</h1>

      <p className="text-gray-500 mb-4">Published: {published}</p>

      <img
        src={article.image}
        alt={article.title}
        className="rounded-lg w-full mb-6"
      />

      <p className="text-lg leading-7">{article.content}</p>
    </div>
  );
}
