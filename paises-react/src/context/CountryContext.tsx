import { createContext, useContext, useEffect, useState, } from "react";
import type { ReactNode } from "react";
type Country = {
  name: {
    common:string;
  }
}

type CountryContextType = {
  countries: Country[];
  loading: boolean;
  error: boolean;
};
//deixa o contexto inicial vazio
const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadCountries() {
      try {
        setLoading(true);

        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json(); 

        console.log("🌍 Dados da API:", data); 

        setCountries(data); 
      } catch (err) {
        setError(true); 
      } finally {
        setLoading(false); 
      }
    }

    loadCountries(); 
  }, []);

  return (
    <CountryContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountries deve estar dentro de um CountryProvider");
  return context;
}