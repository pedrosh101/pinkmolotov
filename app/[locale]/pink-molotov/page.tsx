import { setRequestLocale } from "next-intl/server";
import Navbar from "../../../components/navbar";
import ArtistSection from "../../../components/ArtistSection";

export default async function PinkMolotovPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full pt-26 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/fundo-rosa.png')" }}>
        <ArtistSection className="flex flex-col w-full" />
      </main>
    </>
  );
}