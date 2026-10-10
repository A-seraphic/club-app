import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider } from '@/lib/AuthContext';
import { ThemeProvider } from '@/lib/ThemeContext';
import { AppProvider } from '@/lib/AppContext';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import BusinessRoute from '@/components/BusinessRoute';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Community from '@/pages/Community';
import Post from '@/pages/Post';
import Profile from '@/pages/Profile';
import OfferDetail from '@/pages/OfferDetail';
import BusinessProfile from '@/pages/BusinessProfile';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import MapView from '@/pages/MapView';
import BusinessPanel from '@/pages/BusinessPanel';
import CreateOffer from '@/pages/CreateOffer';
import BoostOffer from '@/pages/BoostOffer';
import ModerationReview from '@/pages/ModerationReview';
import AccountType from '@/pages/AccountType';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import EditProfile from '@/pages/EditProfile';
import PrivacySettings from '@/pages/PrivacySettings';
import ContentPreferences from '@/pages/ContentPreferences';
import NotificationSettings from '@/pages/NotificationSettings';
import Security from '@/pages/Security';
import Help from '@/pages/Help';
import Legal from '@/pages/Legal';
import UserProfile from '@/pages/UserProfile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <ScrollToTop />
              <Routes>
                <Route path="/account-type" element={<AccountType />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
                  <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/offer/:id" element={<OfferDetail />} />
                    <Route path="/business/:id" element={<BusinessProfile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/map" element={<MapView />} />
                    <Route element={<BusinessRoute />}>
                      <Route path="/business-panel" element={<BusinessPanel />} />
                      <Route path="/create-offer" element={<CreateOffer />} />
                      <Route path="/boost-offer/:id" element={<BoostOffer />} />
                    </Route>
                    <Route path="/moderation" element={<ModerationReview />} />
                    <Route path="/edit-profile" element={<EditProfile />} />
                    <Route path="/privacy" element={<PrivacySettings />} />
                    <Route path="/content-preferences" element={<ContentPreferences />} />
                    <Route path="/notification-settings" element={<NotificationSettings />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/help" element={<Help />} />
                    <Route path="/legal/:doc" element={<Legal />} />
                    <Route path="/user/:id" element={<UserProfile />} />
                  </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </QueryClientProvider>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App