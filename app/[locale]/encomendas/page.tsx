import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import Navbar from "../../../components/navbar";
import { EMAIL, getWhatsappLink } from "../../../data/contact";

type Props = { params: Promise<{ locale: string }> };

const STEPS = [1, 2, 3, 4, 5] as const;
const NOTES = [1, 2, 3, 4, 5] as const;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Navbar" });
  return { title: `${t("item4")} | Pink Molotov` };
}

export default async function EncomendasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Commissions" });

  const buttonClass =
    "inline-flex items-center justify-center gap-3 border border-black px-7 py-4 text-lg text-black transition-colors hover:bg-black hover:text-[#F7F4E4]";

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full bg-cover bg-center bg-fixed px-6 pb-24 pt-32 font-kyiv md:px-16 md:pt-40"
        style={{ backgroundImage: "url('/fundo-rosa.png')" }}
      >
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-4xl text-black 2xl:text-5xl">{t("title")}</h1>
          <p className="mb-14 text-xl text-black/80 2xl:text-2xl">
            {t("intro")}
          </p>

          {/* Etapas */}
          <ol className="mb-20 flex flex-col">
            {STEPS.map((n) => (
              <li
                key={n}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-black/20 py-8 md:grid-cols-[6rem_1fr] md:gap-x-8"
              >
                <span className="text-4xl text-black/40 md:text-5xl">
                  {String(n).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="mb-3 text-2xl text-black 2xl:text-3xl">
                    {t(`steps.${n}.title`)}
                  </h2>
                  <p className="text-lg leading-relaxed text-black/80 2xl:text-xl">
                    {t(`steps.${n}.text`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Observações */}
          <section className="mb-20 border-t border-black/20 pt-10">
            <h2 className="mb-6 text-2xl text-black 2xl:text-3xl">
              {t("notesTitle")}
            </h2>
            <ul className="flex list-disc flex-col gap-3 pl-6 text-lg leading-relaxed text-black/80 marker:text-pink-600/80 2xl:text-xl">
              {NOTES.map((n) => (
                <li key={n}>{t(`notes.${n}`)}</li>
              ))}
            </ul>
          </section>

          {/* Chamada final */}
          <section className="border-t border-black/20 pt-10">
            <h2 className="mb-4 text-3xl text-black 2xl:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mb-8 max-w-2xl text-xl text-black/80">
              {t("ctaText")}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={getWhatsappLink(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass}
              >
                <FaWhatsapp size={22} aria-hidden />
                {t("ctaWhatsapp")}
              </a>
              {EMAIL && (
                <a href={`mailto:${EMAIL}`} className={buttonClass}>
                  <Mail size={22} aria-hidden />
                  {t("ctaEmail")}
                </a>
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
