// Informações de contato usadas nas páginas Contact e Encomendas.
// Itens opcionais (email, instagram) só aparecem no site se forem preenchidos.

export const WHATSAPP_NUMBER = "553183709903"; // só dígitos, com DDI + DDD
export const WHATSAPP_DISPLAY = "+55 31 8370-9903";

export const EMAIL: string = ""; // ex.: "contato@pinkmolotov.com"
export const INSTAGRAM_URL: string = ""; // ex.: "https://instagram.com/..."

// Gera o link do WhatsApp, com mensagem pré-preenchida (opcional).
export function getWhatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
