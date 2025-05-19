import { useParams, useNavigate } from "react-router-dom";
import { useCountries } from "../context/CountryContext";

export default function CountryDetail() {
  const { code } = useParams(); 
  const navigate = useNavigate(); 

  const { countries } = useCountries();

  const country = countries.find((c) => c.cca3 === code);

  if (!country) {
    return <p className="text-center mt-10">País não encontrado.</p>;
  }

  const {
    name,
    flags,
    capital,
    population,
    currencies,
    languages,
    borders
  } = country;

  const currencyNames = currencies
    ? Object.values(currencies).map((c) => c.name).join(", ")
    : "N/A";

  const languageList = languages
    ? Object.values(languages).join(", ")
    : "N/A";

  const borderCountries = borders
    ? borders.map((b) => {
        const match = countries.find((c) => c.cca3 === b);
        return match?.name.common || b;
      }).join(", ")
    : "Nenhum";

  return (
    <div className="p-4 max-w-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Voltar
      </button>

      <h2 className="text-2xl font-bold mb-4">{name.common}</h2>

      <img
        src={flags?.png}
        alt={`Bandeira de ${name.common}`}
        className="w-full h-auto rounded mb-4"
      />

      <ul className="space-y-2 text-lg">
        <li><strong>Capital:</strong> {capital?.[0] || "N/A"}</li>
        <li><strong>População:</strong> {population.toLocaleString()}</li>
        <li><strong>Línguas:</strong> {languageList}</li>
        <li><strong>Moeda:</strong> {currencyNames}</li>
        <li><strong>Fronteiras:</strong> {borderCountries}</li>
      </ul>
    </div>
  );
}