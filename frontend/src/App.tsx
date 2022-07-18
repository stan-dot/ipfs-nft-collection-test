import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Home } from "./pages/home/Home";
import { ImagePreview } from "./pages/imagePreview/ImagePreview";
import { NoPage } from "./pages/nopage/NoPage";
import { ApiService } from "./services/api.service";
import { BlockchainService } from "./services/blockchain.service";

export default function App() {
  // const blockService = new BlockchainService();
  const apiService = new ApiService();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        {/* <Route path="dashboard" element={<Dashboard blockchainService={blockService} apiService={apiService} />} /> */}
        <Route path="dashboard" element={<Dashboard apiService={apiService} />} />
        <Route path="img" element={<ImagePreview apiService={apiService} />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
