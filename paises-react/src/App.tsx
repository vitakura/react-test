import { useCountries } from "./context/CountryContext";
import './App.css'
export default function App() {
  const { countries, loading, error } = useCountries();

  if (loading) return <p className="text-center mt-10">Carregando países...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Erro ao carregar dados.</p>;

  return (
    <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Lista de Países</h1>

      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {countries.map((country, index) => (
          <li key={index} className="border p-2 rounded shadow hover:bg-gray-100">
            {country.name.common}
          </li>
        ))}
      </ul>
    </div>
  );
}

