import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  // Para redireccionar
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: "Ambos campos son obligatorios",
        error: true
      })
      return;
    }

    // Elmino las alertas
    setAlerta({});

    try {
      // Paso la peticion al servidor para que autentifique al usuario
      const { data } = await clienteAxios.post('/veterinarios/login', { email, password });
      // Almaceno el JWT
      localStorage.setItem('token', data.token);
      // IMPORTANTE: Configuro la sesión de usuario con setAuth (AuthProvider -> useAuth)
      setAuth(data); 
      // Redireccionar al usuario
      navigate('/admin');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">
          Inicia Sesión y Administra tus{' '}<span className="text-black">pacientes</span>
        </h1>
        <img src="./login_imagen.svg" className="mt-10 px-10" alt="Imagen login" />
      </div>

      <div className="mt-20 shadow-lg px-10 py-10 rounded-xl bg-white">
        {
          alerta.msg && <Alerta alerta={alerta} />
        }
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email de registro"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Introduce tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login