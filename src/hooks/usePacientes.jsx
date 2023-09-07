import { useContext } from "react";
import PacienteContext from "../context/PacientesProvider";

// Vamos a definir el Context que es donde se guardan los datos
const usePacientes = () => {
    // Para hacer disponible los valores del Provider
    return useContext(PacienteContext)
}

export default usePacientes;