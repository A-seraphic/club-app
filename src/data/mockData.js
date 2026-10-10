// CLUB — mock data for the frontend experience. No backend.

export const categories = [
  { id: "destacados", name: "Destacados", emoji: "🔥" },
  { id: "comida", name: "Comida", emoji: "🍔" },
  { id: "moda", name: "Moda", emoji: "👕" },
  { id: "cine", name: "Cine", emoji: "🎬" },
  { id: "gaming", name: "Gaming", emoji: "🎮" },
  { id: "belleza", name: "Belleza", emoji: "💄" },
  { id: "gimnasio", name: "Gimnasios", emoji: "🏋️" },
  { id: "compras", name: "Compras", emoji: "🛍️" },
  { id: "eventos", name: "Eventos", emoji: "🎟️" },
  { id: "tech", name: "Tecnología", emoji: "💻" },
  { id: "hoteles", name: "Hoteles", emoji: "🏨" },
  { id: "servicios", name: "Servicios", emoji: "🛠️" },
];

export const businesses = [
  {
    id: "b1", name: "Burger Lab", category: "comida", categoryLabel: "Comida",
    avatar: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80",
    rating: 4.8, followers: "12.4k", location: "Centro, Neiva", distance: "800m",
    verified: true, hours: "11:00 AM – 11:00 PM", description: "Hamburguesas artesanales con ingredientes locales. El laboratorio del sabor.",
  },
  {
    id: "b2", name: "Café Central", category: "comida", categoryLabel: "Café",
    avatar: "https://images.unsplash.com/photo-1554118811-1e0d342e4c3d?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=800&q=80",
    rating: 4.7, followers: "8.1k", location: "Plaza de Mercado, Neiva", distance: "1.2km",
    verified: true, hours: "6:00 AM – 9:00 PM", description: "Café de origen y repostería artesanal. El mejor aroma de la ciudad.",
  },
  {
    id: "b3", name: "Urban Wear", category: "moda", categoryLabel: "Moda",
    avatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    rating: 4.6, followers: "23.9k", location: "Mall San Pedro, Neiva", distance: "2.4km",
    verified: true, hours: "10:00 AM – 8:00 PM", description: "Streetwear urbano y tendencias. Viste tu actitud.",
  },
  {
    id: "b4", name: "Cine Nova", category: "cine", categoryLabel: "Cine",
    avatar: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
    rating: 4.5, followers: "5.6k", location: "CC Nova, Neiva", distance: "3.1km",
    verified: true, hours: "12:00 PM – 12:00 AM", description: "La experiencia cinematográfica más inmersiva de la región.",
  },
  {
    id: "b5", name: "Pizza House", category: "comida", categoryLabel: "Comida",
    avatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1513104890138-7c7496526096?w=800&q=80",
    rating: 4.7, followers: "9.3k", location: "Calle 5, Neiva", distance: "1.6km",
    verified: false, hours: "12:00 PM – 10:30 PM", description: "Pizzas al horno de leña con masa madre. Sabor italiano auténtico.",
  },
  {
    id: "b6", name: "FitZone", category: "gimnasio", categoryLabel: "Gimnasio",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e03055620d?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1534438327276-14e03055620d?w=800&q=80",
    rating: 4.9, followers: "4.2k", location: "Av. Tenerife, Neiva", distance: "2.0km",
    verified: true, hours: "5:00 AM – 11:00 PM", description: "Tu mejor versión empieza aquí. Entrenamiento funcional y pesas.",
  },
  {
    id: "b7", name: "Glow Beauty", category: "belleza", categoryLabel: "Belleza",
    avatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80",
    cover: "https://images.unsplash.com/photo-1560066984-4d1e2c7c1d2a?w=800&q=80",
    rating: 4.8, followers: "6.7k", location: "Barrio Altico, Neiva", distance: "1.9km",
    verified: true, hours: "9:00 AM – 7:00 PM", description: "Estética y cuidado de la piel. Brilla con confianza.",
  },
];

export const offers = [
  {
    id: "o1", businessId: "b1", businessName: "Burger Lab", businessAvatar: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&q=80",
    verified: true, title: "2x1 en Smash Burgers", description: "Llévate dos Smash Burgers dobles por el precio de una. Solo hoy en Burger Lab.",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    originalPrice: 38000, promoPrice: 19000, discount: 50, distance: "800m", location: "Centro, Neiva",
    expiresIn: "3h", tags: ["HOY", "LIMITADO"], likes: 1284, comments: 96, liked: false, saved: false,
    conditions: "Válido de 2:00 PM a 9:00 PM. No acumulable con otras promos. Mostrar la oferta en caja.",
    validUntil: "Hoy, 9:00 PM", hours: "11:00 AM – 11:00 PM", category: "comida",
  },
  {
    id: "o2", businessId: "b2", businessName: "Café Central", businessAvatar: "https://images.unsplash.com/photo-1554118811-1e0d342e4c3d?w=200&q=80",
    verified: true, title: "40% OFF en tu café favorito", description: "Todos los cafés de origen con 40% de descuento. Despierta tu día con sabor.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2185?w=800&q=80",
    originalPrice: 12000, promoPrice: 7200, discount: 40, distance: "1.2km", location: "Plaza de Mercado, Neiva",
    expiresIn: "6h", tags: ["40% OFF"], likes: 842, comments: 51, liked: true, saved: true,
    conditions: "Aplica en presentación mediana. Válido hasta agotar existencias del grano del día.",
    validUntil: "Hoy, 9:00 PM", hours: "6:00 AM – 9:00 PM", category: "comida",
  },
  {
    id: "o3", businessId: "b3", businessName: "Urban Wear", businessAvatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80",
    verified: true, title: "Hasta 50% en colección nueva", description: "Renueva tu armario con la nueva colección streetwear. Descuentos de hasta 50%.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    originalPrice: 159000, promoPrice: 79500, discount: 50, distance: "2.4km", location: "Mall San Pedro, Neiva",
    expiresIn: "2d", tags: ["NEW"], likes: 2310, comments: 184, liked: false, saved: false, promoted: true,
    conditions: "Válido en prendas seleccionadas de la nueva colección. No acumulable.",
    validUntil: "Vie, 11:59 PM", hours: "10:00 AM – 8:00 PM", category: "moda",
  },
  {
    id: "o4", businessId: "b4", businessName: "Cine Nova", businessAvatar: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&q=80",
    verified: true, title: "Combo Cine: 2 entradas + 2 bebidas", description: "Combo para dos: dos entradas generales y dos bebidas grandes. La película perfecta.",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
    originalPrice: 54000, promoPrice: 35000, discount: 35, distance: "3.1km", location: "CC Nova, Neiva",
    expiresIn: "1d", tags: ["POPULAR"], likes: 967, comments: 73, liked: false, saved: true,
    conditions: "Sujeto a disponibilidad de sala. No válido en estrenos de apertura.",
    validUntil: "Jue, 11:59 PM", hours: "12:00 PM – 12:00 AM", category: "cine",
  },
  {
    id: "o5", businessId: "b5", businessName: "Pizza House", businessAvatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80",
    verified: false, title: "Pizza grande + bebida $29.900", description: "Pizza grande de cualquier especialidad más bebida 1.5L. Perfecta para compartir.",
    image: "https://images.unsplash.com/photo-1513104890138-7c7496526096?w=800&q=80",
    originalPrice: 52000, promoPrice: 29900, discount: 42, distance: "1.6km", location: "Calle 5, Neiva",
    expiresIn: "5h", tags: ["LIMITADO"], likes: 1532, comments: 110, liked: false, saved: false,
    conditions: "Válido para llevar y en local. Una pizza por oferta.",
    validUntil: "Hoy, 10:30 PM", hours: "12:00 PM – 10:30 PM", category: "comida",
  },
  {
    id: "o6", businessId: "b6", businessName: "FitZone", businessAvatar: "https://images.unsplash.com/photo-1534438327276-14e03055620d?w=200&q=80",
    verified: true, title: "1 mes gratis + inscripción sin costo", description: "Inscríbete hoy y llévate el primer mes totalmente gratis. Sin costo de inscripción.",
    image: "https://images.unsplash.com/photo-1534438327276-14e03055620d?w=800&q=80",
    originalPrice: 120000, promoPrice: 0, discount: 100, distance: "2.0km", location: "Av. Tenerife, Neiva",
    expiresIn: "4d", tags: ["NEW"], likes: 689, comments: 42, liked: false, saved: false,
    conditions: "Plan mensual. Primer mes gratis al inscribirte hoy. No acumulable.",
    validUntil: "Dom, 11:59 PM", hours: "5:00 AM – 11:00 PM", category: "gimnasio",
  },
  {
    id: "o7", businessId: "b7", businessName: "Glow Beauty", businessAvatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&q=80",
    verified: true, title: "Facial hidratante 30% OFF", description: "Tratamiento facial profundo hidratante con 30% de descuento. Piel radiante.",
    image: "https://images.unsplash.com/photo-1570172619647-d409b0f0a6f3?w=800&q=80",
    originalPrice: 90000, promoPrice: 63000, discount: 30, distance: "1.9km", location: "Barrio Altico, Neiva",
    expiresIn: "3d", tags: ["30% OFF"], likes: 421, comments: 28, liked: false, saved: false,
    conditions: "Agenda previa requerida. Sujeto a disponibilidad.",
    validUntil: "Sáb, 11:59 PM", hours: "9:00 AM – 7:00 PM", category: "belleza",
  },
  {
    id: "o8", businessId: "b5", businessName: "Pizza House", businessAvatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80",
    verified: false, title: "Lunes de pizza: 50% OFF", description: "Todos los lunes, 50% de descuento en pizzas grandes. Lleva la tuya a casa.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80dbe0?w=800&q=80",
    originalPrice: 48000, promoPrice: 24000, discount: 50, distance: "1.6km", location: "Calle 5, Neiva",
    expiresIn: "Finalizada", tags: ["POPULAR"], likes: 3201, comments: 210, liked: false, saved: false,
    conditions: "Solo los lunes. Mostrar la oferta en caja.",
    validUntil: "Lun, 11:59 PM", hours: "12:00 PM – 10:30 PM", category: "comida", expired: true,
  },
];

export const posts = [
  {
    id: "p1", userName: "Valentina R.", userHandle: "@valer", avatar: "https://i.pravatar.cc/150?img=45",
    date: "hace 2h", content: "¡Encontré esta promo increíble en Burger Lab! 2x1 en smash burgers y estaban espectaculares 🍔🔥",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    businessName: "Burger Lab", location: "Centro, Neiva", likes: 312, comments: 24, saved: false, liked: false,
  },
  {
    id: "p2", userName: "Sebastián M.", userHandle: "@sebmtz", avatar: "https://i.pravatar.cc/150?img=12",
    date: "hace 5h", content: "Este restaurante tiene 2x1 hoy y nadie lo sabe. Corran antes de que termine 🏃♂️",
    image: "https://images.unsplash.com/photo-1513104890138-7c7496526096?w=800&q=80",
    businessName: "Pizza House", location: "Calle 5, Neiva", likes: 198, comments: 17, saved: true, liked: true,
  },
  {
    id: "p3", userName: "Camila T.", userHandle: "@camitorres", avatar: "https://i.pravatar.cc/150?img=32",
    date: "hace 8h", content: "¿Alguien ya probó la oferta de Café Central? El 40% off vale totalmente la pena ☕✨",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2185?w=800&q=80",
    businessName: "Café Central", location: "Plaza de Mercado, Neiva", likes: 421, comments: 38, saved: false, liked: false,
  },
  {
    id: "p4", userName: "Andrés L.", userHandle: "@andresl", avatar: "https://i.pravatar.cc/150?img=15",
    date: "ayer", content: "Esta tienda tiene descuentos del 50% en toda la colección nueva. Me llevé 3 camisetas 👕🛍️",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    businessName: "Urban Wear", location: "Mall San Pedro, Neiva", likes: 567, comments: 49, saved: false, liked: false,
  },
];

export const commentsData = [
  { id: "c1", user: "Laura G.", avatar: "https://i.pravatar.cc/150?img=20", text: "Acabo de ir y es real el 2x1 🔥", time: "hace 1h", likes: 24 },
  { id: "c2", user: "Diego P.", avatar: "https://i.pravatar.cc/150?img=33", text: "¿Aplica también para llevar?", time: "hace 2h", likes: 8 },
  { id: "c3", user: "Mariana V.", avatar: "https://i.pravatar.cc/150?img=49", text: "Las smash burgers son lo mejor de Neiva sin duda", time: "hace 3h", likes: 41 },
  { id: "c4", user: "Carlos R.", avatar: "https://i.pravatar.cc/150?img=52", text: "Ya voy en camino 🏃♂️", time: "hace 4h", likes: 12 },
];

export const notifications = [
  { id: "n1", type: "offer", avatar: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&q=80", text: "Burger Lab publicó una nueva oferta", time: "hace 10 min" },
  { id: "n2", type: "expiring", avatar: "https://images.unsplash.com/photo-1554118811-1e0d342e4c3d?w=200&q=80", text: "Una promoción que guardaste termina hoy", time: "hace 1h" },
  { id: "n3", type: "like", avatar: "https://i.pravatar.cc/150?img=20", text: "Tu publicación recibió 20 likes", time: "hace 3h" },
  { id: "n4", type: "reply", avatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=80", text: "Pizza House respondió tu comentario", time: "hace 5h" },
  { id: "n5", type: "follow", avatar: "https://i.pravatar.cc/150?img=33", text: "Diego P. empezó a seguirte", time: "ayer" },
];

export const currentUser = {
  name: "Sara Martínez", username: "@saramtz", avatar: "https://i.pravatar.cc/150?img=5",
  bio: "Cazadora de ofertas en Neiva 🍔☕🛍️ | Comparto lo mejor de la ciudad",
  location: "Neiva, Huila", posts: 128, followers: "2.4k", following: 384,
};

export const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);

export const getOffer = (id) => offers.find((o) => o.id === id);
export const getBusiness = (id) => businesses.find((b) => b.id === id);
export const getBusinessOffers = (id) => offers.filter((o) => o.businessId === id);