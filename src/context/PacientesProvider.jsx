import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

const PacienteContext = createContext();

const PacientesProvider = ({ children }) => {
    // state de pacientes
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    // Cuando carga la página llamo a la API
    useEffect(() => {
        const obtenerPaciente = async () => {
            try {
                // Obtengo el token del veterinario
                const token = localStorage.getItem('token');

                // Si no hay un token no continuo
                if (!token) return;

                // Incorporar el el header de axios el token
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                // Consulto la API
                const { data } = await clienteAxios.get('/pacientes', config);
                setPacientes(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerPaciente();
    }, [auth])




    const guardarPaciente = async (paciente) => {
        // Consigo el token de localStorage
        const token = localStorage.getItem('token')
        // Incorporar el el header de axios el token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        // Editar (si tiene id estoy editando)
        if (paciente.id) {
            try {
                // Actualizamos el registro de pacientes
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);
                // Actualizo el array (state de pacientes)
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)
                // Reescribo en el array del state de pacientes
                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error.response.data.msg);
            }

        } else {
            // Crear (si no tiene id estoy creando nuevo)
            try {

                // Se le pasa la url, objeto, configuración (porque requiere autenticación)
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                // Saco los valores que quiero - la ultima variable me saca el objeto sin los otros valores
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                // Lo coloco en el State
                setPacientes([pacienteAlmacenado, ...pacientes])

            } catch (error) {
                console.log(error.response.data.msg);
            }
        }


    }

    // Función del botón editar paciente
    const setEdicion = (paciente) => {
        setPaciente(paciente);
    }

    // Función para botón eliminar paciente
    const eliminarPaciente = async id => {
        // Mensaje de confirmacion
        const confirmar = confirm('¿Seguro que quieres eliminar el paciente?')

        if (confirmar) {
            try {
                // Consigo el token de localStorage
                const token = localStorage.getItem('token')
                // Incorporar el el header de axios el token
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                // Petición DELETE a la API
                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
                // Saco el paciente eliminado del State
                const pacientesActualizado = pacientes.filter(pacienteState => pacienteState._id !== id);
                // Incorporo la nueva lista al State
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
                setPacientes
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
}

export {
    PacientesProvider
}

export default PacienteContext;
