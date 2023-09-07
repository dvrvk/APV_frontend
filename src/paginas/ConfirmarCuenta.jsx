import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios.jsx";
import Alerta from "../components/Alerta.jsx";

const ConfirmarCuenta = () => {
  // Sacar parametros de la URL
  const params = useParams();
  const { id } = params;

  const [confirmada, setConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState('');
  
  // Al poner [] al final se ejecuta una vez cuando el componente está listo
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        // Solo pongo el final de la URL porque con clienteAxios a creado la baseURL
        const url = `/veterinarios/confirmar/${id}`;
        // En lugar de axios uso cliente axios que usa la baseURL
        const { data } = await clienteAxios.get(url);
        setConfirmada(true);
        // Saco la respuesta del servidor
        setAlerta({
          msg: data.msg,
          error: false})
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg, 
          error: true
        })
      }

      setCargando(false)
    }
    confirmarCuenta();
  }, [])

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">
          Confirma tu cuenta y Administra tus{' '}<span className="text-black">pacientes</span>
        </h1>
        <img src="../confirmado_imagen.svg" className="mt-10 px-10" alt="Imagen login" />
      </div>
      <div className="mt-20 shadow-lg px-10 py-10 rounded-xl bg-white">
        {
          !cargando && <Alerta alerta={alerta} />
        }
        {
          confirmada && <Link
          className='block text-center my-5 text-gray-600 hover:text-indigo-800'
          to="/">Inicia sesión</Link>
        }
      </div>
    </>
  )
}

export default ConfirmarCuenta