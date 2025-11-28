import Image from "next/image";
import Link from "next/link";

interface Article {
  content: string;
  source: any;
  title: string;
  description: string;
  url: string;
  image: string;
  published: string;
}



async function getNews(): Promise<Article[]> {
  const API = process.env.CURRENTS_API_KEY;
  const res = await fetch(
    `https://api.currentsapi.services/v1/search?keywords=india&language=en&apiKey=${API}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.news || [];
}

/** ⭐ Dynamic Metadata for SEO */
export async function generateMetadata({
  params,
}: {
  params: { index: string };
}) {
  const articles = await getNews();
  const idx = parseInt(params.index, 10);
  const article = articles[idx];

  if (!article) {
    return {
      title: "Article Not Found",
      description: "This news article is unavailable.",
    };
  }

  return {
    title: article.title,
    description: article.description || "Latest news article",
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: { index: string };
}) {
  const { index } = params;
  const articles = await getNews();

  const idx = parseInt(index, 10);
  const article = articles[idx];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-sm text-gray-700 mb-4">
            यह खबर उपलब्ध नहीं है या हटाई जा चुकी है।
          </p>
          <Link
            href="/"
            className="text-red-600 font-semibold text-sm hover:underline"
          >
            ⬅️ होम पेज पर वापस जाएं
          </Link>
        </div>
      </div>
    );
  }

  const published = article.published;
     new Date(article.published).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
     "";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* TOP NAVBAR */}
      <header className="bg-red-700 text-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white text-red-700 px-2 py-1 rounded font-bold text-lg">
              LH
            </div>
            <h1 className="font-bold text-xl">LiveHindustan Clone</h1>
          </Link>
        </div>
      </header>

      {/* ARTICLE CONTENT */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <article className="bg-white rounded-lg shadow overflow-hidden">
          {/* IMAGE */}
          {article.image && (
            <div className="relative h-72 sm:h-96 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}

          {/* TEXT CONTENT */}
          <div className="p-5 space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {article.title}
            </h1>

            <div className="text-xs text-gray-500">
              {article.source?.name}
              {published && <span> • {published}</span>}
            </div>

            {article.description && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {article.description}
              </p>
            )}

            <p className="text-gray-800 text-sm leading-relaxed">
              {article.content ||
                "Full content is not provided by the NewsAPI free plan. This is placeholder content to simulate a complete article as seen on real news sites."}
            </p>

            {/* LINK TO ORIGINAL NEWS */}
            {article.url && (
              <a
                href={article.url}
                target="_blank"
                className="inline-block mt-2 text-red-600 font-semibold text-sm hover:underline"
              >
                🔗 पूरी खबर पढ़ें (Original Source)
              </a>
            )}
          </div>
        </article>

        {/* BACK BUTTON */}
        <div className="mt-4">
          <Link
            href="/"
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            ⬅️ ताज़ा खबरों पर वापस जाएं
          </Link>
        </div>
      </main>
    </div>
  );
}
