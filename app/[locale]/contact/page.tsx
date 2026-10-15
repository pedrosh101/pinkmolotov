import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Mail } from "lucide-react";
import Navbar from "../../../components/navbar";
import { Link } from "../../../i18n/navigation";
import {
  EMAIL,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  getWhatsappLink,
} from "../../../data/contact";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return { title: `${t("title")} | Pink Molotov` };
}

const itemClass =
  "group flex items-center gap-5 border-b border-black/20 py-6 text-black transition-colors hover:text-pink-600/80";

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <>
      <Navbar />
      <main
        className="min-h-screen w-full bg-cover bg-center bg-fixed px-6 pb-24 pt-32 font-kyiv md:px-16 md:pt-40"
        style={{ backgroundImage: "url('/fundo-rosa.png')" }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl text-black 2xl:text-5xl">{t("title")}</h1>
          <p className="mb-12 text-xl text-black/80 2xl:text-2xl">
            {t("intro")}
          </p>

          <ul className="border-t border-black/20">
            <li>
              <a
                href={getWhatsappLink(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className={itemClass}
              >
                <FaWhatsapp size={32} aria-hidden />
                <span className="flex flex-col">
                  <span className="text-sm text-black/60">
                    {t("whatsappLabel")}
                  </span>
                  <span className="text-2xl">{WHATSAPP_DISPLAY}</span>
                </span>
              </a>
            </li>

            {EMAIL && (
              <li>
                <a href={`mailto:${EMAIL}`} className={itemClass}>
                  <Mail size={32} aria-hidden />
                  <span className="flex flex-col">
                    <span className="text-sm text-black/60">
                      {t("emailLabel")}
                    </span>
                    <span className="text-2xl">{EMAIL}</span>
                  </span>
                </a>
              </li>
            )}

            {INSTAGRAM_URL && (
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={itemClass}
                >
                  <FaInstagram size={32} aria-hidden />
                  <span className="flex flex-col">
                    <span className="text-sm text-black/60">
                      {t("instagramLabel")}
                    </span>
                    <span className="text-2xl">
                      {INSTAGRAM_URL.replace(/^https?:\/\/(www\.)?/, "")}
                    </span>
                  </span>
                </a>
              </li>
            )}
          </ul>

          <p className="mt-12 text-lg text-black/70">
            {t("commissionsText")}{" "}
            <Link
              href="/encomendas"
              className="underline underline-offset-4 hover:text-pink-600/80"
            >
              {t("commissionsCta")}
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
