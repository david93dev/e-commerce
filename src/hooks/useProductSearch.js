import { useEffect, useRef, useState } from "react";

let __allProductsCache = null;

async function fetchAllProducts() {
  if (__allProductsCache) return __allProductsCache;
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Falha ao buscar produtos");
  const data = await res.json();
  __allProductsCache = data;
  return data;
}

function normalize(text) {
  return (text ?? "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function useProductSearch(term, limit = 8) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(null);
  const termRef = useRef("");

  // debounce simples
  useEffect(() => {
    const id = setTimeout(async () => {
      const q = term?.trim() ?? "";
      termRef.current = q;

      if (q.length < 2) {
        setResults([]);
        setErr(null);
        return;
      }

      setLoading(true);
      setErr(null);
      try {
        const all = await fetchAllProducts();
        const nq = normalize(q);
        const filtered = all
          .filter((p) => normalize(p.title).includes(nq))
          .slice(0, limit);

        // evita setar resultados obsoletos se o termo mudou durante a busca
        if (termRef.current === q) setResults(filtered);
      } catch {
        // catch sem variável para não disparar no-unused-vars
        if (termRef.current === q) {
          setErr("Não foi possível buscar produtos agora.");
          setResults([]);
        }
      } finally {
        if (termRef.current === q) setLoading(false);
      }
    }, 250);

    return () => clearTimeout(id);
  }, [term, limit]);

  return { loading, results, error: err };
}
