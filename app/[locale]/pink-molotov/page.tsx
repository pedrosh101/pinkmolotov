import Navbar from "../../../components/navbar";
import ArtistSection from "../../../components/ArtistSection";

export default function PinkMolotovPage() {
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