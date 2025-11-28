import Link from "next/link";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

async function getNews() {
  const res = await fetch("/news.json", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.articles;
}

export default async function CategoryPage({ params }: { params: { name: string } }) {
  const articles = await getNews();
  const filtered = articles.filter((a: any) => a.category === params.name.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{params.name.toUpperCase()} News</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((article: { id: Key | null | undefined; image: string | StaticImport; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
          <Link key={article.id} href={`/article/${article.id}`}>
            <div className="bg-white rounded-lg shadow p-3 hover:shadow-xl transition">
              <div className="relative h-40 w-full">
                <Image
                  src={article.image}
                  alt={String(article.title) || "Article image"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h2 className="font-bold mt-2">{article.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
