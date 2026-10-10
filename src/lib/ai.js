import { offers } from "@/data/mockData";

export const clientSuggestions = [
  "¿Dónde hay hamburguesas en oferta?",
  "¿Qué promociones vencen hoy?",
  "Algo para comer por menos de $25.000",
  "¿Qué restaurantes tienen 2x1?",
];

export const businessSuggestions = [
  "Promocionar una hamburguesa con 30% off",
  "Generar un título atractivo",
  "Sugerir un CTA para mi oferta",
  "Analizar mi publicación",
];

/* Client-side answer over the available mock offer data. Does NOT invent
   offers, prices or conditions — it only filters the real demo dataset and
   says so when nothing matches. */
export function clientAnswer(query) {
  const q = query.toLowerCase();
  let results = offers.filter((o) => !o.expired);
  if (/hamburguesa|burger/.test(q)) results = results.filter((o) => /burger|smash/i.test(o.title + o.businessName));
  if (/2x1|dos por uno/.test(q)) results = results.filter((o) => /2x1/i.test(o.title));
  if (/pizza/.test(q)) results = results.filter((o) => /pizza/i.test(o.title + o.businessName));
  if (/cafe|café/.test(q)) results = results.filter((o) => /cafe|café/i.test(o.businessName));
  if (/venc|hoy|termina/.test(q)) results = results.filter((o) => /h|HOY/.test(o.expiresIn) || o.tags.includes("LIMITADO"));
  const priceMatch = q.match(/\$?\s?([\d.]+)/);
  if (priceMatch) {
    const max = parseInt(priceMatch[1].replace(/\./g, ""), 10);
    if (!Number.isNaN(max)) results = results.filter((o) => o.promoPrice <= max);
  }
  if (results.length === 0) return { text: "No encontré ofertas que coincidan con tu búsqueda en CLUB. Prueba con otra categoría o sube un poco el presupuesto 🔎", offers: [] };
  return { text: `Encontré ${results.length} ${results.length === 1 ? "oferta" : "ofertas"} que coinciden con lo que buscas:`, offers: results.slice(0, 4) };
}

export function businessAnswer(query) {
  const q = query.toLowerCase();
  if (/título|titulo/.test(q)) return { text: "Aquí van 3 títulos para tu oferta:", suggestions: ["🔥 2x1 Solo Hoy en Smash Burgers", "Doble sabor, mitad de precio", "Hoy tu burger favorita cuesta lo mismo que una"] };
  if (/cta|acción|accion/.test(q)) return { text: "Sugerencias de llamado a la acción:", suggestions: ["Menciona CLUB en caja y desbloquea tu oferta", "Solo hoy — corre antes de que termine", "Pide la tuya y llévate la segunda gratis"] };
  if (/analizar|mejorar|suger/.test(q)) return { text: "Para mejorar tu publicación te sugiero:", suggestions: ["Haz el descuento más visible en la imagen", "Reduce el texto de la imagen a 3 palabras", "Agrega condiciones claras para evitar confusiones"] };
  return {
    text: "Aquí tienes una propuesta de publicación para tu oferta:",
    post: {
      title: "🔥 30% OFF Solo Hoy",
      hook: "¿Hambre de verdad? Tu favorita con descuento por tiempo limitado.",
      description: "Solo por hoy, disfruta 30% de descuento en nuestra hamburguesa estrella. Carne 100% local y pan artesanal.",
      cta: "Menciona CLUB en caja y desbloquea tu oferta.",
      hashtags: "#30OFF #SoloHoy #OfertasCLUB #Neiva",
    },
  };
}