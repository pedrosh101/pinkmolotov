import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "../../../components/navbar";
import { Link } from "../../../i18n/navigation";
import { getArtworksByCategory, resolveText } from "../../../data/artworks";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work" });
  return { title: `${t("title")} | Pink Molotov` };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Work" });
  const groups = getArtworksByCategory();

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full bg-cover bg-center bg-fixed px-6 pb-24 pt-32 font-kyiv md:px-16 md:pt-40"
        style={{ backgroundImage: "url('/fundo-rosa.webp')" }}
      >
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-4xl text-black 2xl:text-5xl">{t("title")}</h1>

          {/* Atalhos pras seções (só aparecem se houver mais de uma) */}
          {groups.length > 1 && (
            <nav
              aria-label={t("sections")}
              className="mb-14 flex flex-wrap gap-x-8 gap-y-2 text-lg text-black/70"
            >
              {groups.map(({ category }) => (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className="hover:text-pink-600/80"
                >
                  {resolveText(category.name, locale)}
                </a>
              ))}
            </nav>
          )}

          <div className="flex flex-col gap-20">
            {groups.map(({ category, artworks }) => (
              <section
                key={category.id}
                id={category.id}
                className="scroll-mt-28"
              >
                <h2 className="mb-8 border-b border-black/20 pb-3 text-2xl text-black 2xl:text-3xl">
                  {resolveText(category.name, locale)}
                </h2>

                <ul className="grid grid-cols-2 items-start gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
                  {artworks.map((art) => {
                    const title = resolveText(art.title, locale);
                    return (
                      <li key={art.slug}>
                        <Link
                          href={`/obra/${art.slug}`}
                          className="group block"
                        >
                          <Image
                            src={art.image}
                            alt={title}
                            width={800}
                            height={1000}
                            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                            className="h-auto w-full object-contain shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                          <p className="mt-3 text-lg text-black group-hover:text-pink-600/80">
                            {title}
                          </p>
                          <p className="text-sm text-black/60">
                            {resolveText(art.technique, locale)}
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
