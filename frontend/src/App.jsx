import Signup from "./pages/signup/signup";
import Signin from "./pages/signup/signin";
import { Routes, Route, Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path="/signin" element={<Signin />} />
      </Routes>{" "}
    </>
  );
}

export default App;
