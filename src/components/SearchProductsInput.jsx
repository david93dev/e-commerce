import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { useProductSearch } from "@/hooks/useProductSearch";

const brl = (v) =>
  Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function SearchProductsInput({
  placeholder = "Buscar produtos…",
  inputClassName = "",
}) {
  const [term, setTerm] = useState("");
  const { results, loading } = useProductSearch(term, 8);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const boxRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(results.length > 0 && term.trim().length >= 2);
    setActiveIndex(-1);
  }, [results, term]);

  // fechar ao clicar fora
  useEffect(() => {
    function onDocDown(e) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  function onKeyDown(e) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const idx = activeIndex >= 0 ? activeIndex : 0;
      const r = results[idx];
      if (r) {
        setOpen(false);
        setTerm("");
        navigate(`/products/${r.id}`);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative w-full" ref={boxRef}>
      <IoMdSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70" />
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={[
          "w-full rounded-md border border-gray-200 dark:border-zinc-700",
          "bg-white dark:bg-zinc-800 pl-10 pr-10 py-2 text-sm outline-none",
          "focus:ring-2 focus:ring-[#00ADB5]",
          inputClassName,
        ].join(" ")}
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls="search-product-listbox"
      />

      {/* loading spinner discreto */}
      {loading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin">
          <div className="h-4 w-4 border-2 border-current border-r-transparent rounded-full" />
        </div>
      )}

      {open && (
        <ul
          id="search-product-listbox"
          role="listbox"
          ref={listRef}
          className="absolute left-0 right-0 mt-1 max-h-80 overflow-auto rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-lg z-50"
        >
          {results.map((p, idx) => {
            const active = idx === activeIndex;
            return (
              <li key={p.id} role="option" aria-selected={active}>
                <Link
                  to={`/products/${p.id}`}
                  onClick={() => {
                    setOpen(false);
                    setTerm("");
                  }}
                  className={[
                    "flex gap-3 items-center px-3 py-2",
                    active ? "bg-black/5 dark:bg-white/5" : "hover:bg-black/5 dark:hover:bg-white/5",
                  ].join(" ")}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-10 w-10 object-contain rounded-sm border"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{brl(p.price)}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
