import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import { passwordSeguro } from "../helpers/index.js";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [alerta, setAlerta] = useState({});

  // Saco los parametros
  const params = useParams();
  const { token } = params;

  // Se ejecuta cuando el componente carga para comprobar el token
  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/veterinarios/olvide-password/${token}`);
        setTokenValido(true)
        setAlerta({
          msg: 'Coloca tu nuevo password',
          error: false
        })
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
        return;
      }
    }
    comprobarToken();
  }, [])


  const handleSubmit = async e => {
    e.preventDefault();

    if ([password, password2].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true })
      return;
    }

    if (password !== password2) {
      setAlerta({ msg: 'Los passwords no coinciden', error: true })
      return;
    }

    if (!passwordSeguro(password)) {
      setAlerta({ msg: 'Lo sentimos, pero el password ingresado no cumple con los requisitos de seguridad necesarios. Asegúrate de que tu contraseña tenga al menos 8 caracteres e incluya al menos una letra mayúscula, una minúscula, un número y un carácter especial (como @#$%^&+=?¿!¡). Intenta nuevamente con una contraseña que cumpla con estos criterios de seguridad.', error: true });
      return;
    }

    /// Eliminar las alertas
    setAlerta('')

    // Cambiar password
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      // clienteAxios ya tiene la URL base de la api en la variable de entorno
      const { data } = await clienteAxios.post(url, { password });
      setPasswordModificado(true);
      // Mostramos alerta
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

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center md:text-left">
          Restablece tu password para administrar tus{' '}<span className="text-black">pacientes</span>
        </h1>
        <img src="../forgot_password_imagen.svg" className="mt-10 px-10" alt="Imagen login" />
      </div>

      <div className="mt-20 shadow-lg px-10 py-10 rounded-xl bg-white">
        {
          alerta.msg && <Alerta alerta={alerta} />
        }

        {tokenValido &&
          <form onSubmit={handleSubmit} >

            <div className="my-5">
              <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo password</label>
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
              <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir nuevo password</label>
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
              value="Reestablecer password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />

          </form>
        }
        {
            passwordModificado && <Link
            className='block text-center my-5 text-gray-600 hover:text-indigo-800'
            to="/">Inicia sesión</Link>
        }
      </div >
    </>
  )
}

export default NuevoPassword