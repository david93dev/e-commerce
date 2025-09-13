// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import CheckoutPage from "./pages/CheckoutPage";  
import CartSheet from "./components/CartSheet";  
import { Toaster } from 'sonner' 


export default function App() {
  return (
    <>
      <Header />
      <CartSheet />
      <Toaster position="top-center" />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
