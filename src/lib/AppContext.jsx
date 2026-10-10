import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { offers, businesses, currentUser } from "@/data/mockData";

const AppContext = createContext();

const seedLikes = () => new Set(offers.filter((o) => o.liked).map((o) => o.id));
const seedSaves = () => new Set(offers.filter((o) => o.saved).map((o) => o.id));

const defaultProfile = {
  name: currentUser.name, username: currentUser.username, bio: currentUser.bio,
  location: currentUser.location, avatar: currentUser.avatar,
  banner: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=900&q=80",
  // business-only fields (used when userType === "business")
  businessName: businesses[0].name, logo: businesses[0].avatar, description: businesses[0].description,
  category: businesses[0].category, address: businesses[0].location, hours: businesses[0].hours,
  phone: "", website: "", social: "",
};
const defaultPreferences = { preferred: [], hidden: [], maxDistance: "10km", order: "recent" };
const defaultNotif = { followers: true, likes: true, comments: true, replies: true, newPromos: true, expiring: true, recommendations: true, commercial: false };

const load = (key, fallback) => {
  const s = localStorage.getItem(key);
  return s ? JSON.parse(s) : fallback;
};

export function AppProvider({ children }) {
  const { user } = useAuth();
  const [userType, setUserType] = useState(() => localStorage.getItem("club_user_type") || "client");
  const [likes, setLikes] = useState(() => { const v = load("club_likes", seedLikes()); return v instanceof Set ? v : new Set(v); });
  const [saves, setSaves] = useState(() => { const v = load("club_saves", seedSaves()); return v instanceof Set ? v : new Set(v); });
  const [privacy, setPrivacy] = useState(() => load("club_privacy", { showPosts: true, showLikes: true, showSaved: false, showReviews: true }));
  const [location, setLocation] = useState(() => load("club_location", { city: "Neiva, Huila", label: "Neiva, Huila" }));
  const [recentCities, setRecentCities] = useState(() => load("club_recent_cities", ["Neiva, Huila"]));
  const [profile, setProfile] = useState(() => load("club_profile", defaultProfile));
  const [preferences, setPreferences] = useState(() => load("club_preferences", defaultPreferences));
  const [notifSettings, setNotifSettings] = useState(() => load("club_notif", defaultNotif));
  const [crownRatings, setCrownRatings] = useState(() => load("club_crowns", {}));

  useEffect(() => { localStorage.setItem("club_user_type", userType); }, [userType]);
  useEffect(() => { localStorage.setItem("club_likes", JSON.stringify([...likes])); }, [likes]);
  useEffect(() => { localStorage.setItem("club_saves", JSON.stringify([...saves])); }, [saves]);
  useEffect(() => { localStorage.setItem("club_privacy", JSON.stringify(privacy)); }, [privacy]);
  useEffect(() => { localStorage.setItem("club_location", JSON.stringify(location)); }, [location]);
  useEffect(() => { localStorage.setItem("club_recent_cities", JSON.stringify(recentCities)); }, [recentCities]);
  useEffect(() => { localStorage.setItem("club_profile", JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem("club_preferences", JSON.stringify(preferences)); }, [preferences]);
  useEffect(() => { localStorage.setItem("club_notif", JSON.stringify(notifSettings)); }, [notifSettings]);
  useEffect(() => { localStorage.setItem("club_crowns", JSON.stringify(crownRatings)); }, [crownRatings]);

  const changeLocation = (city) => {
    setLocation({ city, label: city });
    setRecentCities((prev) => [city, ...prev.filter((c) => c !== city)].slice(0, 5));
  };

  const toggleLike = (id) => setLikes((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSave = (id) => setSaves((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // Sync the local account-type selection with the authenticated user record
  // (server truth, persisted via localApi.auth.updateMe at registration).
  useEffect(() => {
    if (user?.account_type && user.account_type !== userType) setUserType(user.account_type);
  }, [user]);

  // Wipe all user-specific local data on logout / account deletion so private
  // state (likes, saves, profile, preferences, ratings) does not survive the
  // session. The logout flow calls this before localApi.auth.logout reloads.
  const clearUserData = () => {
    ["club_likes", "club_saves", "club_privacy", "club_profile", "club_preferences", "club_notif", "club_crowns", "club_user_type", "club_recent_cities", "club_location"].forEach((k) => localStorage.removeItem(k));
    setLikes(seedLikes());
    setSaves(seedSaves());
    setPrivacy({ showPosts: true, showLikes: true, showSaved: false, showReviews: true });
    setLocation({ city: "Neiva, Huila", label: "Neiva, Huila" });
    setRecentCities(["Neiva, Huila"]);
    setProfile(defaultProfile);
    setPreferences(defaultPreferences);
    setNotifSettings(defaultNotif);
    setCrownRatings({});
    setUserType("client");
  };

  const updateProfile = (patch) => setProfile((p) => ({ ...p, ...patch }));
  const rateComment = (id, crowns) => setCrownRatings((r) => ({ ...r, [id]: crowns }));
  const removeCrownRating = (id) => setCrownRatings((r) => { const n = { ...r }; delete n[id]; return n; });
  const getCrownRating = (id) => crownRatings[id] || 0;

  return (
    <AppContext.Provider value={{
      userType, setUserType, likes, saves, toggleLike, toggleSave,
      privacy, setPrivacy, location, recentCities, changeLocation,
      profile, setProfile, updateProfile,
      preferences, setPreferences,
      notifSettings, setNotifSettings,
      crownRatings, rateComment, removeCrownRating, getCrownRating,
      clearUserData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);