import { useCountries } from "../context/CountryContext";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CountryList() {
  const { countries, loading, error } = useCountries();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 60;

  // Filtra nome e região
  const filteredCountries = countries.filter((country) => {
    const matchesName = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;
    return matchesName && matchesRegion;
  });

  // Reseta para página 1 sempre que mduar filtro ou busca
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRegion]);

  // Calcula paginação
  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCountries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div
          role="status"
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">Erro ao carregar dados.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  const allRegions = Array.from(
    new Set(countries.map((c) => c.region).filter(Boolean))
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Países</h1>

      <input
        type="text"
        placeholder="Buscar país..."
        className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {currentItems.map((country) => (
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

      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages || 1}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
