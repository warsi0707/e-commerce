import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Singup from "./pages/Singup";
import Signin from "./pages/Signin";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import { useContext } from "react";
import { AuthProvider } from "./context/Authprovider";
import Products from "./pages/Products";

function App() {
  const {userAuth} = useContext(AuthProvider)
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/signup" element={<Singup />} />
          <Route path="/signin" element={userAuth?<Profile/>:<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
