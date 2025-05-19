import { Routes, Route } from "react-router-dom";
import CountryList from "./components/CountryList";
import CountryDetail from "./pages/CountryDetail";
import NotFound from "./pages/NotFound";
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CountryList />} />
      <Route path="/country/:code" element={<CountryDetail />} />
      <Route path="*" element={<NotFound />} />                                       
    </Routes>
  );
}
