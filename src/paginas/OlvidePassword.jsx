import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { validarEmail } from "../helpers/index.js";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    // Compruebo que el email no esta vacio
    if (email === '' ) {
      setAlerta({ msg: 'El email es obligatorio', error: true })
      return;
    }

    if(!validarEmail(email)) {
      setAlerta({ msg: 'El email es incorrecto', error: true })
      return;
    }
    
    try {
      // Realizo la consulta a la bd
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', { email })
      // Muestro el mensaje del servidor
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">
          Recuperar tu Acceso y no Pierdas tus{' '}<span className="text-black">pacientes</span>
        </h1>
        <img src="./forgot_password_imagen.svg" className="mt-10 px-10" alt="Imagen login" />
      </div>
      <div className="mt-20 shadow-lg px-10 py-10 rounded-xl bg-white">
        {
          msg && <Alerta alerta={alerta} />
        }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Introduce email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Enviar instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/">¿Ya tienes cuenta? Inicia sesión</Link>
          <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
        </nav>
      </div>
    </>
  )
}

export default OlvidePassword