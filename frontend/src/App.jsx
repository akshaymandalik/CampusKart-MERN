import Signup from "./pages/signup";
import Signin from "./pages/signin";
import Forgotpass from "./pages/forgotpass";

import { Routes, Route, Outlet } from "react-router-dom";
import { Profile } from "./pages/profile";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
      </Routes>
    </>
  );
}

export default App;
