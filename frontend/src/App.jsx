import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Forgotpass from "./pages/forgotpass";

import { Routes, Route, Outlet } from "react-router-dom";
import { Profile } from "./pages/profile";
import AppNavbar from "./components/navbar";
import { Home } from "./pages/home";
import { Footer } from "./components/footer";
function App() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="cars" element={<Profile />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
