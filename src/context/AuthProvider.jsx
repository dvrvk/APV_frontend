import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import { Navigate } from 'react-router-dom';


const AuthContext = createContext()

const AuthProvider = ({children}) => {
    // Importante pasar el prop children para poder rodear nuestra App.js
    // Defino el estado que estará disponible para toda la App.js
    // cargando importante para que espere a logear 
    const[cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    
    // Comprobamos si el usuario esta autenticado
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            
            if(!token) {
                setCargando(false);
                return;
            };
            
            // Incorporar el el header de axios el token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try {
                // Envio la petición con su configuración
                const {data} = await clienteAxios.get('/veterinarios/perfil', config)
                // Comparto los datos
                setAuth(data.perfil);
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        };
        autenticarUsuario();
    }, [])


    const cerrarSesion = () => {
        // Borro el token del localStorage
        localStorage.removeItem('token');
        // Reestablezco la autenticación con un objeto vacío
        setAuth({})
        
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
            
        if(!token) {
            setCargando(false);
            return;
        };

        // Comprobar que estoy autenticado
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const { data } = await clienteAxios.post(url, datos, config)
            // Actualizo los datos en el state
            setAuth(data);
            return {
                msg: 'Almacenado correctamente',
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }

        
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
            
        if(!token) {
            setCargando(false);
            return;
        };

        // Comprobar que estoy autenticado
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            // Hago la peticion a la API
            const url = '/veterinarios/actualizar-password';
            const { data } = await clienteAxios.put(url, datos, config);
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return{
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    return(
        <AuthContext.Provider 
            // Le paso todos los objetos disponibles cuadno llame a useAuth-Hook
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
           {children} 
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;