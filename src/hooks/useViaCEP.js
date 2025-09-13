import { useCallback, useState } from "react";

export function normalizeCEP(v) {
  return v.replace(/\D/g, "").slice(0, 8);
}

export function maskCEP(v) {
  const n = normalizeCEP(v);
  if (n.length <= 5) return n;
  return `${n.slice(0, 5)}-${n.slice(5)}`;
}

export function useViaCEP() {
  const [loading, setLoading] = useState(false);
  const [lastCep, setLastCep] = useState(null);

  const fetchCEP = useCallback(
    async (cepRaw) => {
      const cep = normalizeCEP(cepRaw);
      if (cep.length !== 8) return { error: "CEP incompleto.", data: null };

      if (cep === lastCep) return { error: null, data: null }; // evita repetição
      setLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (data && data.erro) {
          return { error: "CEP não encontrado.", data: null };
        }
        setLastCep(cep);
        return { error: null, data };
      } catch {
        return { error: "Falha ao consultar o CEP. Tente novamente.", data: null };
      } finally {
        setLoading(false);
      }
    },
    [lastCep]
  );

  return { fetchCEP, loading };
}
