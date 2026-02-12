import { AuthContext } from "./authContext";
import {useState } from "react";

export const AuthContextProvider = ({children}) => {
    
    const [username, setUsername] = useState("");
    return (
        <AuthContext.Provider value={{ username, setUsername }}>
            {children}
        </AuthContext.Provider>
    )
}