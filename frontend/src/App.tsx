import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Solutions } from "./pages/Solutions";
import { Auth } from "./pages/Auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#D4FF46] selection:text-black flex flex-col justify-between">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/solucoes" element={<Solutions />} />
              <Route path="/entrar" element={<Auth defaultTab="login" />} />
              <Route path="/comecar" element={<Auth defaultTab="register" />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
