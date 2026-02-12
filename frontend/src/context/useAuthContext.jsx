import { AuthContext } from "./authContext";
import { useContext } from "react";

export const useAuth = () => {
    return useContext(AuthContext);
}