import { useTranslations } from "next-intl";

type ArtistSectionProps = {
  id?: string;
  className?: string;
};

export default function ArtistSection({ id, className = "" }: ArtistSectionProps) {
  const t = useTranslations("About");

  return (
    <section
      id={id}
      className={`w-screen shrink-0 flex flex-col md:flex-row items-stretch justify-center bg-transparent text-black ${className} md:gap-24`}
    >
      <div className="w-full md:w-1/4 h-[74vh] px-6 md:px-0">
        <video
          className="w-full h-full object-cover"
          src="/pink.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-10 font-kyiv ">
        <h2 className="text-4xl 2xl:text-5xl mb-6">{t("title")}</h2>
        <p className="text-xl 2xl:text-2xl text-black/80 text-justify">
          {t("text")}
        </p>
      </div>
    </section>
  );
}