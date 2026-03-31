import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/login-page";
import { AdminPage } from "./pages/admin-page";
import { PartnerPage } from "./pages/partner-page";
import { PlacesPage } from "./pages/places-page";
import { PlaceDetailPage } from "./pages/place-detail-page";
import { NewPlacePage } from "./pages/new-place-page";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/places" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/places" element={<PlacesPage />} />
      <Route path="/places/new" element={<NewPlacePage />} />
      <Route path="/places/:id" element={<PlaceDetailPage />} />
    </Routes>
  );
}
