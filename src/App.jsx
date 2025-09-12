// src/App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";



export default function App() {
  return (
    <>
      <Header />
    
     <main>
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
     </main>

      <Footer />
    </>
  );
}
