import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Home } from "./pages/home/Home";
import { NoPage } from "./pages/nopage/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
