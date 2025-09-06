import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Booklistner from "./pages/Booklistner";
import Homepage from "./pages/Homepage";
import AppNavbar from "./components/Navbar";
import Bookview from "./pages/Bookview";
import Orderds from "./pages/orderds";
import Protection from "./pages/protection";
import Viewmybooks from "./pages/Viewmybooks";
import Myorders from "./pages/myorders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<><AppNavbar /><Homepage /></>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/book" element={<Booklistner />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/book/view/:id" element={<Protection><Bookview /></Protection>} />
      <Route path="/orders/:id" element={<Protection><Orderds /></Protection>} />
      <Route path="/view/mybook" element={<Viewmybooks />} />
      <Route path="/book/view/myorders/:id" element={<Myorders/>} />
    </Routes>
  );
}

export default App;
