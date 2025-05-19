import { useCountries } from "../context/CountryContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function CountryList() {
  const { countries, loading, error } = useCountries();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  if (loading) return <p className="text-center mt-10">Carregando países...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Erro ao carregar dados.</p>;

  const filteredCountries = countries.filter((country) => {
    const matchesName = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;

    return matchesName && matchesRegion;
  });

  const allRegions = Array.from(
    new Set(countries.map((c) => c.region).filter(Boolean))
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Países</h1>

      <input
        type="text"
        placeholder="Buscar país..."
        className="w-full p-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

<select
        className="w-full p-2 border rounded mb-4"
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="All">Todas as regiões</option>
        {allRegions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredCountries.map((country) => (
          <li
            key={country.cca3}
            className="border rounded-xl shadow-sm hover:bg-gray-100 transition-colors"
          >
            <Link
              to={`/country/${country.cca3}`}
              className="block w-full h-full p-3 text-center font-medium text-gray-800 hover:text-blue-600"
            >
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
