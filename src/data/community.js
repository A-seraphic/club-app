// CLUB — community users and their reviews, for the crown-rating flow.
// Crown counts/sums are DEMO data (clearly labeled in the UI). The current
// user's own ratings are stored locally and are the only "real" ratings.

export const communityUsers = [
  {
    id: "u1", name: "Valentina R.", handle: "@valer", avatar: "https://i.pravatar.cc/150?img=45",
    bio: "Cazadora de ofertas gastronómicas en Neiva 🍔", location: "Neiva, Huila", verified: true,
    privacy: { showPosts: true, showLikes: true, showSaved: false, showReviews: true },
    reviews: [
      { id: "u1r1", biz: "Burger Lab", businessId: "b1", text: "El 2x1 en smash burgers es real y abundante. Súper recomendado.", date: "hace 2 días", likes: 58, liked: false, crownCount: 12, crownSum: 54 },
      { id: "u1r2", biz: "Pizza House", businessId: "b5", text: "El lunes de pizza 50% off vale la pena. Llegué temprano y no hubo fila.", date: "hace 1 semana", likes: 31, liked: false, crownCount: 8, crownSum: 33 },
    ],
  },
  {
    id: "u2", name: "Sebastián M.", handle: "@sebmtz", avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Moda y streetwear. Comparto los descuentos que encuentro 👕", location: "Neiva, Huila", verified: false,
    privacy: { showPosts: true, showLikes: false, showSaved: false, showReviews: true },
    reviews: [
      { id: "u2r1", biz: "Urban Wear", businessId: "b3", text: "La colección nueva con 50% off es de buena calidad. Me llevé 3 prendas.", date: "hace 3 días", likes: 44, liked: false, crownCount: 15, crownSum: 66 },
    ],
  },
  {
    id: "u3", name: "Camila T.", handle: "@camitorres", avatar: "https://i.pravatar.cc/150?img=32",
    bio: "Café, libros y planes tranquilos ☕", location: "Neiva, Huila", verified: true,
    privacy: { showPosts: true, showLikes: true, showSaved: true, showReviews: true },
    reviews: [
      { id: "u3r1", biz: "Café Central", businessId: "b2", text: "El café del día con 40% off es espectacular. El aroma de origen es 10/10.", date: "hace 5 días", likes: 72, liked: false, crownCount: 20, crownSum: 92 },
      { id: "u3r2", biz: "Glow Beauty", businessId: "b7", text: "El facial hidratante dejó mi piel radiante. Agendé sin problema.", date: "hace 2 semanas", likes: 19, liked: false, crownCount: 6, crownSum: 26 },
    ],
  },
  {
    id: "u4", name: "Andrés L.", handle: "@andresl", avatar: "https://i.pravatar.cc/150?img=15",
    bio: "Fitness y planes activos 🏋️", location: "Neiva, Huila", verified: false,
    privacy: { showPosts: true, showLikes: true, showSaved: false, showReviews: false },
    reviews: [
      { id: "u4r1", biz: "FitZone", businessId: "b6", text: "El mes gratis + inscripción sin costo es real. Empecé hoy.", date: "hace 4 días", likes: 27, liked: false, crownCount: 9, crownSum: 38 },
    ],
  },
];

export const getCommunityUser = (id) => communityUsers.find((u) => u.id === id);