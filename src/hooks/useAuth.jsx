import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Vamos a definir el Context que es donde se guardan los datos
const useAuth = () => {
    // Para hacer disponible los valores del Provider
    return useContext(AuthContext)
}

export default useAuth;