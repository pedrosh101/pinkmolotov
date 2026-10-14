import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../../components/navbar";
import { artworks } from "../../../../data/artworks";

// Gera as rotas /obra/obra-1, /obra/obra-2 etc. em build time.
export function generateStaticParams() {
  return artworks.map((art) => ({ slug: art.slug }));
}

export default async function ObraPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = artworks.find((art) => art.slug === slug);

  if (!artwork) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full bg-neutral-50 pt-40 px-6 pb-20 md:px-16 bg-cover bg-center bg-fixed font-kyiv"
        style={{ backgroundImage: "url('/fundo-rosa.png')" }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row">
          <div className="flex flex-1 items-start justify-center">
            <Image
              src={artwork.image}
              alt={artwork.title}
              width={1200}
              height={1600}
              priority
              className="h-auto max-h-[80vh] w-full object-contain shadow-xl"
            />
          </div>

          <div className="flex-1 md:max-w-sm">
            <Link href="/" className="mb-6 inline-block text-sm text-neutral-500 hover:underline">
              ← Voltar
            </Link>
            <h1 className="mb-4 text-3xl font-bold">{artwork.title}</h1>
            <p className="whitespace-pre-line leading-relaxed text-neutral-700">
              {artwork.description}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}