import {  useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useCartUI } from "@/stores/cart-ui";
import CartButton from "@/components/CartButton";


const links = [
  { label: "Home", to: "/" },
  { label: "Produtos", to: "#produtos" }, // seção na home
  { label: "Contato", to: "#contato" },   // seção na home
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openCart } = useCartUI();

  // rola suavemente até um id
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

 
  const handleSectionNav = async (hash) => {
    const id = hash.replace("#", "");
    if (pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 50);
    } else {
      scrollToId(id);
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-gray-900 dark:bg-zinc-900 dark:text-white">
    
      <div className="flex justify-center items-center bg-black text-white text-sm py-2 px-3">
        <p className="text-center text-xs">
          Liquidação de verão para todos os trajes de banho e entrega expressa grátis — <b>50% DE DESCONTO</b>!
          <Link to="/sale" className="underline ml-1">Shop Now</Link>
        </p>
      </div>

     
      <nav className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
        
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight">Look Horizon</span>
          </Link>

        
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
              <input
                type="search"
                placeholder="Buscar produtos…"
                className="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>
          </div>

         
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6 text-sm">
              {links.map((l) => (
                <li key={l.label}>
                  {l.to.startsWith("#") ? (
                    <button
                      onClick={() => handleSectionNav(l.to)}
                      className="hover:text-[#00ADB5] transition-colors"
                    >
                      {l.label}
                    </button>
                  ) : (
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        `transition-colors ${isActive ? "text-[#00ADB5] font-medium" : "hover:text-[#00ADB5]"}`
                      }
                    >
                      {l.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              
                 <CartButton />
           
            </div>
          </div>

      
          <div className="md:hidden flex items-center gap-1">
            <button
              aria-label="Carrinho"
              className="relative inline-flex items-center rounded-md px-1 py-2 hover:bg-black/5 dark:hover:bg_white/5"
              onClick={openCart}
            >
              <IoCartOutline className="size-5" />
            </button>
            <button
              className="px-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((s) => !s)}
            >
              {open ? <HiOutlineX className="size-6" /> : <HiOutlineMenu className="size-6" />}
            </button>
          </div>
        </div>
      </nav>

     
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden border-t border-gray-100 dark:border-zinc-800 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.label}>
                {l.to.startsWith("#") ? (
                  <button
                    onClick={() => handleSectionNav(l.to)}
                    className="w-full text-left block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {l.label}
                  </button>
                ) : (
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    {l.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

        
          <div className="md:hidden pb-3">
            <div className="relative">
              <IoMdSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
              <input
                type="search"
                placeholder="Buscar produtos…"
                className="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#00ADB5]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
