export interface Artwork {
  slug: string;
  title: string;
  description: string;
  image: string;
  pt: number; // padding-top individual da obra na home (px)
}

// Range (em px) do espaçamento aleatório entre as obras na home.
// Ajuste esses dois valores pra controlar o "tamanho" do range aleatório.
export const GAP_MIN = 30;
export const GAP_MAX = 220;

export const artworks: Artwork[] = [
  {
    slug: "obra-1",
    title: "Obra 1",
    description:
      "Texto sobre a obra 1: técnica, ano, dimensões, contexto ou inspiração por trás do trabalho.",
    image: "/work/pink1.png",
    pt: 0,
  },
  {
    slug: "obra-2",
    title: "Obra 2",
    description:
      "Texto sobre a obra 2: técnica, ano, dimensões, contexto ou inspiração por trás do trabalho.",
    image: "/work/pink2.png",
    pt: 40,
  },
  {
    slug: "obra-3",
    title: "Obra 3",
    description:
      "Texto sobre a obra 3: técnica, ano, dimensões, contexto ou inspiração por trás do trabalho.",
    image: "/work/pink3.png",
    pt: 20,
  },
  {
    slug: "obra-4",
    title: "Obra 4",
    description:
      "Texto sobre a obra 4: técnica, ano, dimensões, contexto ou inspiração por trás do trabalho.",
    image: "/work/pink4.png",
    pt: 60,
  },
  {
    slug: "obra-5",
    title: "Obra 5",
    description:
      "Texto sobre a obra 5: técnica, ano, dimensões, contexto ou inspiração por trás do trabalho.",
    image: "/work/pink5.png",
    pt: 10,
  },
];

// Pseudo-aleatório determinístico a partir de uma seed: parece aleatório,
// mas dá o MESMO valor no servidor e no cliente (evita erro de hydration)
// e continua igual a cada carregamento da página.
export function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export function getArtworkGap(index: number) {
  return GAP_MIN + seededRandom(index + 1) * (GAP_MAX - GAP_MIN);
}