import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContextProvider } from "./context/authContextProvider.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      {" "}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </StrictMode>,
);
