
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import AuthLayout from "./layouts/AuthLayout";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Safety = lazy(() => import("./pages/Safety"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Scan = lazy(() => import("./pages/Scan"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Reports = lazy(() => import("./pages/Reports"));

function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader-spinner" />
      <p>Loading ScamShield...</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />

            <Route
              path="/how-it-works"
              element={
                <PublicLayout>
                  <HowItWorks />
                </PublicLayout>
              }
            />

            <Route
              path="/safety"
              element={
                <PublicLayout>
                  <Safety />
                </PublicLayout>
              }
            />

            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />

            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />

            <Route
              path="/privacy"
              element={
                <PublicLayout>
                  <Privacy />
                </PublicLayout>
              }
            />

            <Route
              path="/reports"
              element={
                <PublicLayout>
                  <Reports />
                </PublicLayout>
              }
            />

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route
                path="/scan"
                element={
                  <PublicLayout>
                    <Scan />
                  </PublicLayout>
                }
              />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
