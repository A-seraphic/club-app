// CLUB — Reels (community recommendation videos), comments, safety, and
// the crown-based reputation system. Mock data only, no backend.

/* Sample vertical-friendly videos (public domain). Posters from Unsplash. */
const VIDEOS = [
  { video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80" },
  { video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2185?w=800&q=80" },
  { video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "https://images.unsplash.com/photo-1513104890138-7c7496526096?w=800&q=80" },
  { video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4", poster: "https://images.unsplash.com/photo-1534438327276-14e03055620d?w=800&q=80" },
];
export const sampleVideos = VIDEOS;

/* Lightweight harmful-language filter (Spanish). Used to block/flag comments. */
const BAD_WORDS = ["idiota", "imbecil", "estupido", "tonto", "pendejo", "puto", "marica", "asco", "odio", "mata", "basura", "mierda", "jodido", "feo", "grosero"];
export function containsBadWord(text = "") {
  const t = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return BAD_WORDS.some((w) => t.includes(w));
}

export const reels = [
  {
    id: "r1",
    authorName: "Valentina R.", authorHandle: "@valer", avatar: "https://i.pravatar.cc/150?img=45",
    businessId: "b1", businessName: "Burger Lab",
    caption: "¡El 2x1 en smash burgers es real! Miren el tamaño 🍔🔥 #ofertaneiva",
    ...VIDEOS[0],
    likes: 1284, liked: false, saved: false, shares: 64,
    comments: [
      { id: "rc1", user: "Laura G.", avatar: "https://i.pravatar.cc/150?img=20", text: "Acabo de ir y es real el 2x1 🔥", time: "hace 1h", likes: 24, liked: false },
      { id: "rc2", user: "Diego P.", avatar: "https://i.pravatar.cc/150?img=33", text: "¿Aplica también para llevar?", time: "hace 2h", likes: 8, liked: false },
      { id: "rc3", user: "Mariana V.", avatar: "https://i.pravatar.cc/150?img=49", text: "Las smash burgers son lo mejor de Neiva", time: "hace 3h", likes: 41, liked: false },
    ],
  },
  {
    id: "r2",
    authorName: "Sebastián M.", authorHandle: "@sebmtz", avatar: "https://i.pravatar.cc/150?img=12",
    businessId: "b2", businessName: "Café Central",
    caption: "El café del día con 40% off ☕✨ La mejor recomendación de la mañana.",
    ...VIDEOS[1],
    likes: 842, liked: true, saved: false, shares: 33,
    comments: [
      { id: "rc4", user: "Camila T.", avatar: "https://i.pravatar.cc/150?img=32", text: "El aroma es increíble, 100% recomendado", time: "hace 30m", likes: 15, liked: false },
      { id: "rc5", user: "Andrés L.", avatar: "https://i.pravatar.cc/150?img=15", text: "Voy mañana temprano ☕", time: "hace 1h", likes: 6, liked: false },
    ],
  },
  {
    id: "r3",
    authorName: "Camila T.", authorHandle: "@camitorres", avatar: "https://i.pravatar.cc/150?img=32",
    businessId: "b3", businessName: "Urban Wear",
    caption: "Hasta 50% en la colección nueva 👕🛍️ Me llevé 3 camisetas por el precio de 2.",
    ...VIDEOS[2],
    likes: 2310, liked: false, saved: true, shares: 120,
    comments: [
      { id: "rc6", user: "Valentina R.", avatar: "https://i.pravatar.cc/150?img=45", text: "¿Qué tal la calidad?", time: "hace 2h", likes: 11, liked: false },
      { id: "rc7", user: "Sebastián M.", avatar: "https://i.pravatar.cc/150?img=12", text: "Super recomendada, ya fui dos veces", time: "hace 3h", likes: 28, liked: false },
    ],
  },
  {
    id: "r4",
    authorName: "Andrés L.", authorHandle: "@andresl", avatar: "https://i.pravatar.cc/150?img=15",
    businessId: "b6", businessName: "FitZone",
    caption: "1 mes gratis + inscripción sin costo 🏋️♂️ Empecé hoy y la pasé brutal.",
    ...VIDEOS[3],
    likes: 689, liked: false, saved: false, shares: 22,
    comments: [
      { id: "rc8", user: "Mariana V.", avatar: "https://i.pravatar.cc/150?img=49", text: "¿Hay clases funcionales?", time: "hace 4h", likes: 4, liked: false },
    ],
  },
  {
    id: "r5",
    authorName: "Mariana V.", authorHandle: "@mariv", avatar: "https://i.pravatar.cc/150?img=49",
    businessId: "b7", businessName: "Glow Beauty",
    caption: "Facial hidratante 30% OFF 💆♀️ Mi piel quedó radiante, vale totalmente la pena.",
    ...VIDEOS[4],
    likes: 421, liked: false, saved: false, shares: 18,
    comments: [
      { id: "rc9", user: "Camila T.", avatar: "https://i.pravatar.cc/150?img=32", text: "¿Hay que agendar antes?", time: "hace 5h", likes: 3, liked: false },
    ],
  },
];

/* Crown-based reputation for the current user. Level 0–5 coronitas. */
export const reputation = {
  level: 4,
  helpfulVotes: 312,
  likesOnComments: 1240,
  reviewsCount: 18,
  reliability: 92,
};

/* The user's own reviews, each rated by the community with coronitas. */
export const userReviews = [
  { id: "ur1", biz: "Burger Lab", text: "Las mejores smash burgers de Neiva, sin duda volveré. El 2x1 hace que valga aún más.", crowns: 5, ratingsCount: 42 },
  { id: "ur2", biz: "Café Central", text: "El café del día es espectacular y el descuento lo hace mejor. Aroma de origen 10/10.", crowns: 4, ratingsCount: 31 },
  { id: "ur3", biz: "Urban Wear", text: "Buena calidad en la colección nueva. El 50% off fue real y la atención excelente.", crowns: 5, ratingsCount: 27 },
];