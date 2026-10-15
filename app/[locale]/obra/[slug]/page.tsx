import { notFound } from "next/navigation";
import Image from "next/image";

import { getTranslations } from "next-intl/server";
import Navbar from "../../../../components/navbar";

import DetailsGallery from "../../../../components/DetailsGallery";
import { Link } from "../../../../i18n/navigation";
import { routing } from "../../../../i18n/routing";
import { artworks, resolveText } from "../../../../data/artworks";

type Props = { params: Promise<{ locale: string; slug: string }> };


export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    artworks.map((art) => ({ locale, slug: art.slug })),
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const artwork = artworks.find((art) => art.slug === slug);
  if (!artwork) return {};
  return { title: `${resolveText(artwork.title, locale)} | Pink Molotov` };
}

export default async function ObraPage({ params }: Props) {
  const { locale, slug } = await params;
  const artwork = artworks.find((art) => art.slug === slug);

  if (!artwork) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Artwork" });
  const title = resolveText(artwork.title, locale);

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen w-full bg-neutral-50 pt-40 px-6 pb-20 md:px-16 bg-cover bg-center bg-fixed font-kyiv"
        style={{ backgroundImage: "url('/fundo-rosa.png')" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12 md:flex-row">
          <div className="flex flex-1 items-start justify-center">
            <Image
              src={artwork.image}
              alt={title}
              width={1200}
              height={1600}
              priority
              className="h-[96vh] w-full object-contain shadow-xl"
            />
          </div>

          <div className="flex-1 md:max-w-md">
            <Link
              href="/work"
              className="mb-6 inline-block text-sm text-neutral-500 hover:underline"
            >
              {t("backToWork")}
            </Link>
            <h1 className="mb-4 text-3xl font-bold">{title}</h1>
            <p className="whitespace-pre-line leading-relaxed text-neutral-700">
              {resolveText(artwork.description, locale)}
            </p>

            <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-8 gap-y-3 border-t border-black/20 pt-6 text-neutral-800">
              <dt className="text-neutral-500">{t("size")}</dt>
              <dd>{resolveText(artwork.size, locale)}</dd>
              <dt className="text-neutral-500">{t("technique")}</dt>
              <dd>{resolveText(artwork.technique, locale)}</dd>
            </dl>

            {artwork.details && artwork.details.length > 0 && (
              <section className="mt-8 border-t border-black/20 pt-6">
                <h2 className="mb-4 text-neutral-500">{t("details")}</h2>
                <DetailsGallery images={artwork.details} alt={title} />
              </section>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
