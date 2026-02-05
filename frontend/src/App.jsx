import Signup from "./pages/signup";
import Signin from "./pages/signin";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
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
