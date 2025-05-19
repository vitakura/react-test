import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CountryList from "../CountryList";
import { CountryProvider } from "../../context/CountryContext";
import { BrowserRouter } from "react-router-dom";


// mock da API com dois países
beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status:200,
    json: () =>
      Promise.resolve([
        {
          name: { common: "Brazil" },
          region: "Americas",
          cca3: "BRA",
        },
        {
          name: { common: "Germany" },
          region: "Europe",
          cca3: "DEU",
        },
      ]),
  });
});

afterEach(() => {
  jest.resetAllMocks(); // limpa o mock entre testes
});

function renderWithProviders() {
  render(
    <BrowserRouter>
      <CountryProvider>
        <CountryList />
      </CountryProvider>
    </BrowserRouter>
  );
}

test("exibe título da lista de países", async () => {
  renderWithProviders();
  expect(await screen.findByText("Lista de Países")).toBeInTheDocument();
});

test("filtra país digitado na busca", async () => {
  renderWithProviders();
  const input = await screen.findByPlaceholderText("Buscar país...");
  await userEvent.type(input, "bra");
  expect(await screen.findByText(/brazil/i)).toBeInTheDocument();
});
