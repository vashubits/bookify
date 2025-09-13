import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";   
import "react-toastify/dist/ReactToastify.css";    
import Signout from "./pages/signout";
import Mail from "./components/mail";
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
    <>
    
      <ToastContainer position="top-center" autoClose={4000} />

      <AppNavbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/book" element={<Booklistner />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/book/view/:id" element={<Protection><Bookview /></Protection>} />
        <Route path="/orders/:id" element={<Protection><Orderds /></Protection>} />
        <Route path="/view/mybook" element={<Protection><Viewmybooks /></Protection>} />
        <Route path="/book/view/myorders/:id" element={<Myorders />} />
        <Route path="/signout" element={<Signout />} />
      </Routes>
    </>
  );
}

export default App;
