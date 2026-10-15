"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

type DetailsGalleryProps = {
  images: string[];
  alt: string;
};

// Miniaturas das fotos de detalhe. Ao clicar, abre a imagem ampliada
// (Esc fecha, setas ← → navegam).
export default function DetailsGallery({ images, alt }: DetailsGalleryProps) {
  const t = useTranslations("Gallery");
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () =>
      setCurrent((i) =>
        i === null ? i : (i - 1 + images.length) % images.length
      ),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (current === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [current, close, prev, next]);

  return (
    <>
      <ul className="grid grid-cols-3 gap-3">
        {images.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`${t("open")} ${index + 1}`}
              className="relative block aspect-square w-full cursor-zoom-in overflow-hidden shadow-md"
            >
              <Image
                src={src}
                alt={`${alt} — ${index + 1}`}
                fill
                sizes="(min-width: 768px) 130px, 30vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {current !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label={t("close")}
            className="absolute right-4 top-4 rounded-full p-2 text-white/80 hover:text-white"
          >
            <X size={28} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={t("previous")}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:text-white md:left-6"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={t("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 text-white/80 hover:text-white md:right-6"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          <div
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current]}
              alt={`${alt} — ${current + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
