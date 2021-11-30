import { Routes, Route } from "react-router";
import CompaniesPage from "./pages/Companies";
import CompanyDetailPage from "./pages/CompanyDetail";
import HomePage from "./pages/Home";
import JobsPage from "./pages/Jobs";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";

/** To Do: 404 Route handler */

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/companies/:handle" element={<CompanyDetailPage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}

export default PageRoutes;