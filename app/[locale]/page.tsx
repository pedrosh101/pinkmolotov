"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Navbar from "../../components/navbar";
import ArtistSection from "../../components/ArtistSection";
import { artworks, getArtworkGap, resolveText } from "../../data/artworks";
import useIsDesktop from "../../hooks/useIsDesktop";
import { Link } from "../../i18n/navigation";

export default function HomePage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const locale = useLocale();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollerRef.current) return;
      if (!window.matchMedia("(min-width: 768px)").matches) return;
      if (e.deltaY === 0) return;

      e.preventDefault();
      scrollerRef.current.scrollLeft += e.deltaY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <Navbar />

      <main
        ref={scrollerRef}
        className="min-h-screen w-full 2xl:pt-20 pt-10 overflow-y-auto overflow-x-hidden md:h-screen md:overflow-x-auto md:overflow-y-hidden bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/fundo-rosa.webp')" }}
      >
        <div className="flex flex-col md:flex-row md:h-full md:w-max items-center md:items-start gap-14 md:gap-0 px-6 md:px-20 py-10">
          {artworks.map((art, index) => (
            <Link
              key={art.slug}
              href={`/obra/${art.slug}`}
              className="shrink-0 block"
              style={
                isDesktop
                  ? {
                      paddingTop: `${art.pt}px`,
                      marginRight:
                        index < artworks.length - 1
                          ? `${getArtworkGap(index)}px`
                          : 0,
                    }
                  : undefined
              }
            >
              <Image
                src={art.image}
                alt={resolveText(art.title, locale)}
                width={800}
                height={1000}
                className="h-[50vh] md:h-[70vh] w-auto object-contain shadow-xl transition-transform duration-300 hover:scale-[1.02]"
              />
            </Link>
          ))}

          <ArtistSection id="about-section" className="hidden md:flex" />
        </div>
      </main>
    </>
  );
}