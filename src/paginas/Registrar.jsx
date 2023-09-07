import { useState } from 'react';
import { Link } from "react-router-dom";
import clienteAxios from '../config/axios.jsx';
import { passwordSeguro } from '../helpers/index.js';
import Alerta from '../components/Alerta.jsx';


const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [alerta, setAlerta] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, password2].includes('')){
      setAlerta({msg:'Hay campos vacios', error: true})
      return;
    }

    if(password !== password2) {
      setAlerta({msg:'Los passwords no coinciden', error: true})
      return;
    }

    if(!passwordSeguro(password)) {
      setAlerta({msg:'Lo sentimos, pero el password ingresado no cumple con los requisitos de seguridad necesarios. Asegúrate de que tu contraseña tenga al menos 8 caracteres e incluya al menos una letra mayúscula, una minúscula, un número y un carácter especial (como @#$%^&+=?¿!¡). Intenta nuevamente con una contraseña que cumpla con estos criterios de seguridad.', error: true});
      return;
    }
    // Eliminar las alertas
    setAlerta('')
    // Crear usuario en la API
    try {
      // URL de nuestra API - // Solo pongo el final de la URL porque con clienteAxios a creado la baseURL
      const url = `/veterinarios`;
      // Creo la petición POST con axios (tengo que importarlo) - uso clienteAxios que tiene la baseURL
      const respuesta = await clienteAxios.post(url, {nombre, email, password});
      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error: false
      })

    } catch (error) {
      // Leer errores de la API
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
          Crea tu cuenta y Administra tus{' '}<span className="text-black">pacientes</span>
        </h1>
        <img src="./registrar_imagen.svg" className="mt-10 px-10" alt="Imagen login" />
      </div>

      <div className="mt-20 shadow-lg px-10 py-10 rounded-xl bg-white">
        {
          alerta.msg && <Alerta alerta={alerta} />
        }
        
        <form onSubmit={handleSubmit} >
          <div className="my-5">
            <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre de usuario</label>
            <input
              id="nombre"
              type="text"
              placeholder="Introduce nombre"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Introduce email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Introduce password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
            <input
              id="password2"
              type="password"
              placeholder="Repite password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>
        <nav className='mt-10 lg:flex lg:justify-between '>
          <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/">¿Ya tienes cuenta? Inicia sesión</Link>
          <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/olvide-password">Olvide mi password</Link>
        </nav>
      </div>

    </>
  )
}

export default Registrar