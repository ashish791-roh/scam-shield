import { BrowserRouter, Route, Routes } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Safety from "./pages/Safety";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
    <BrowserRouter>
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

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}