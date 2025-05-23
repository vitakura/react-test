import { createContext, useContext, useEffect, useState, } from "react";
import type { ReactNode } from "react";

type Country = {
  name: { common: string };
  region: string;
  cca3: string;
  flags: { png: string; alt?: string };
  capital?: string[];
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string; symbol: string }>;
  borders?: string[];
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

  //get
  useEffect(() => {
    async function loadCountries() {
      setLoading(true);
      setError(false);
      //localStorage.removeItem("countries");
      //verifica se tem cache local
      const cached = localStorage.getItem("countries");
      if (cached) {
        try {
          const data: Country[] = JSON.parse(cached);
          setCountries(data);
          setLoading(false);
          return; 
        } catch {
          // se falhar ao parsear, remove cache e prossegue
          localStorage.removeItem("countries");
        }
      }

        //segue se nao houver cache

      try {
        setLoading(true);
        setError(false);

        const res = await fetch("https://restcountries.com/v3.1/all");

        if(!res.ok){
          throw new Error(`Erra http: ${res.status}`)
        }

        const data = await res.json(); 

        localStorage.setItem("countries", JSON.stringify(data));

        if(!Array.isArray(data)){
          throw new Error("Resposta invalida")
        }

        console.log(" API:", data); 
        

        setCountries(data); 
      } catch (err) {
        setError(true);
        setCountries([]) 
      } finally {
        setLoading(false); 
      }
    }

    loadCountries(); 
  }, []);

  //provider com dados prontos
  return (
    <CountryContext.Provider value={{ countries, loading, error }}>
      {children}
    </CountryContext.Provider>
  );
}
// hook para acessar o contexto com seguranca
export function useCountries() {
  const context = useContext(CountryContext);
  if (!context) throw new Error("useCountries deve estar dentro de um CountryProvider");
  return context;
}