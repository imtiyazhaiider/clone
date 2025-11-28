import Image from "next/image";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  published: string;
}

async function getNews(): Promise<Article[]> {
  const res = await fetch("/news.json", { cache: "no-store" });
  const data = await res.json();
  return data.articles;
}

export default async function HomePage() {
  const articles = await getNews();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <header className="bg-red-700 text-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white text-red-700 px-2 py-1 rounded font-bold text-lg">
              LH
            </div>
            <span className="text-xl font-bold">LiveHindustan Clone</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link href="/category/india">भारत</Link>
            <Link href="/category/world">विश्व</Link>
            <Link href="/category/entertainment">मनोरंजन</Link>
            <Link href="/category/sports">खेल</Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold mb-4">ताज़ा खबरें</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/article/${article.id}`}>
              <article className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h2 className="font-bold text-lg">{article.title}</h2>
                  <p className="text-sm text-gray-600">{article.description}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
