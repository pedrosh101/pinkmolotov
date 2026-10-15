// ---------------------------------------------------------------------------
// Textos bilíngues
// ---------------------------------------------------------------------------
// Qualquer texto do site que mude por idioma usa este formato.
// Se o texto for igual nos dois idiomas (ex.: "60 × 80 cm"), pode ser
// só uma string simples.
export type LocalizedText = { pt: string; en: string };
export type Text = string | LocalizedText;
export type Locale = keyof LocalizedText;

export function resolveText(text: Text, locale: string): string {
  if (typeof text === "string") return text;
  return text[locale as Locale] ?? text.pt;
}

// ---------------------------------------------------------------------------
// CATEGORIAS (seções da página Work)
// ---------------------------------------------------------------------------
// Pra criar uma nova seção: adicione um item neste array, com um `id` único
// (minúsculo, sem espaço) e o nome nos dois idiomas. Depois é só usar esse
// `id` no campo `category` das obras.
//
// - A ORDEM deste array é a ordem das seções na página Work.
// - Seções sem nenhuma obra não aparecem no site.
// - O TypeScript avisa se uma obra usar um `id` que não existe aqui.
export const categories = [
  {
    id: "secao-1",
    name: { pt: "Seção 1", en: "Section 1" },
  },
  {
    id: "secao-2",
    name: { pt: "Seção 2", en: "Section 2" },
  },
] as const satisfies readonly { id: string; name: LocalizedText }[];

export type CategoryId = (typeof categories)[number]["id"];

// ---------------------------------------------------------------------------
// OBRAS
// ---------------------------------------------------------------------------
export interface Artwork {
  slug: string;
  title: Text;
  description: Text;
  image: string;
  pt: number; // padding-top individual da obra na home (px)
  category: CategoryId;
  size: Text; // ex.: "60 × 80 cm"
  technique: Text; // ex.: { pt: "Acrílica sobre tela", en: "Acrylic on canvas" }
  // Fotos de detalhe (opcional). Coloque os arquivos em /public/work/details/
  // e liste os caminhos aqui. Se ficar vazio, a galeria não aparece.
  details?: string[];
}

// Range (em px) do espaçamento aleatório entre as obras na home.
// Ajuste esses dois valores pra controlar o "tamanho" do range aleatório.
export const GAP_MIN = 30;
export const GAP_MAX = 220;

export const artworks: Artwork[] = [
  {
    slug: "obra-1",
    title: { pt: "Obra 1", en: "Artwork 1" },
    description: {
      pt: "Texto sobre a obra 1: contexto, inspiração ou história por trás do trabalho.",
      en: "Text about artwork 1: context, inspiration or the story behind the piece.",
    },
    image: "/work/pink1.png",
    pt: 0,
    category: "secao-1",
    size: "00 × 00 cm",
    technique: { pt: "Técnica da obra 1", en: "Technique of artwork 1" },
    // TODO: trocar pelas fotos de detalhe reais (estas são só placeholders)
    details: ["/work/pink2.png", "/work/pink3.png", "/work/pink4.png"],
  },
  {
    slug: "obra-2",
    title: { pt: "Obra 2", en: "Artwork 2" },
    description: {
      pt: "Texto sobre a obra 2: contexto, inspiração ou história por trás do trabalho.",
      en: "Text about artwork 2: context, inspiration or the story behind the piece.",
    },
    image: "/work/pink2.png",
    pt: 40,
    category: "secao-1",
    size: "00 × 00 cm",
    technique: { pt: "Técnica da obra 2", en: "Technique of artwork 2" },
  },
  {
    slug: "obra-3",
    title: { pt: "Obra 3", en: "Artwork 3" },
    description: {
      pt: "Texto sobre a obra 3: contexto, inspiração ou história por trás do trabalho.",
      en: "Text about artwork 3: context, inspiration or the story behind the piece.",
    },
    image: "/work/pink3.png",
    pt: 20,
    category: "secao-1",
    size: "00 × 00 cm",
    technique: { pt: "Técnica da obra 3", en: "Technique of artwork 3" },
  },
  {
    slug: "obra-4",
    title: { pt: "Obra 4", en: "Artwork 4" },
    description: {
      pt: "Texto sobre a obra 4: contexto, inspiração ou história por trás do trabalho.",
      en: "Text about artwork 4: context, inspiration or the story behind the piece.",
    },
    image: "/work/pink4.png",
    pt: 60,
    category: "secao-2",
    size: "00 × 00 cm",
    technique: { pt: "Técnica da obra 4", en: "Technique of artwork 4" },
  },
  {
    slug: "obra-5",
    title: { pt: "Obra 5", en: "Artwork 5" },
    description: {
      pt: "Texto sobre a obra 5: contexto, inspiração ou história por trás do trabalho.",
      en: "Text about artwork 5: context, inspiration or the story behind the piece.",
    },
    image: "/work/pink5.png",
    pt: 10,
    category: "secao-2",
    size: "00 × 00 cm",
    technique: { pt: "Técnica da obra 5", en: "Technique of artwork 5" },
  },
];

// Agrupa as obras por categoria, na ordem definida em `categories`,
// já descartando as categorias vazias. Usado pela página Work.
export function getArtworksByCategory() {
  return categories
    .map((category) => ({
      category,
      artworks: artworks.filter((art) => art.category === category.id),
    }))
    .filter((group) => group.artworks.length > 0);
}

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
