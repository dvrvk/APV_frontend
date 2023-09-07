import { useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import { passwordSeguro, validarEmail } from "../helpers";


const CambiarPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: '',
    pwd_repetido: ''
  })

  const { guardarPassword } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.values(password).some(campo => campo === '')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if (!passwordSeguro(password.pwd_nuevo)) {
      setAlerta({
        msg: 'Lo sentimos, pero el password ingresado no cumple con los requisitos de seguridad necesarios. Asegúrate de que tu contraseña tenga al menos 8 caracteres e incluya al menos una letra mayúscula, una minúscula, un número y un carácter especial (como @#$%^&+=?¿!¡). Intenta nuevamente con una contraseña que cumpla con estos criterios de seguridad.',
        error: true
      });
      return;
    }

    if (password.pwd_nuevo !== password.pwd_repetido) {
      setAlerta({
        msg: 'Error, los password no coinciden',
        error: true
      });
      return;
    }

    // Eliminar alertas
    setAlerta({})

    // Actualizar el password - AuthProvider.guardarPassword
    const respuesta = await guardarPassword(password);
    // Actualizar la alerta
    setAlerta(respuesta);
    // Limpiar los campos
    setPassword({
      pwd_actual: '',
      pwd_nuevo: '',
      pwd_repetido: ''
    })

  }


  return (
    <>
      <AdminNav />
      <h2 className="text-2xl mt-5 mb-10 text-center">Modifica tu{' '}
        <span className="text-indigo-600 font-bold">password</span>
      </h2>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow-sm rounded-lg p-5">
          <form onSubmit={handleSubmit}>

            <div className="my-6">
              <label htmlFor="pwd_actual" className="uppercase font-bold text-gray-600">Passowrd Actual</label>
              <input
                type="password"
                className="border w-full p-2 mt-2 rounded-lg"
                name="pwd_actual"
                id="pwd_actual"
                placeholder="Introduce tu password actual"
                value={password.pwd_actual}
                onChange={
                  e => setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>

            <div className="my-6">
              <label htmlFor="pwd_nuevo" className="uppercase font-bold text-gray-600">Nuevo Password</label>
              <input
                type="password"
                className="border w-full p-2 mt-2 rounded-lg"
                name="pwd_nuevo"
                id="pwd_nuevo"
                value={password.pwd_nuevo}
                placeholder="Introduce tu nuevo password"
                onChange={
                  e => setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>

            <div className="my-6">
              <label htmlFor="pwd_repetido" className="uppercase font-bold text-gray-600">Repite tu nuevo password </label>
              <input
                type="password"
                className="border w-full p-2 mt-2 rounded-lg"
                name="pwd_repetido"
                id="pwd_repetido"
                value={password.pwd_repetido}
                placeholder="Repite tu nuevo password"
                onChange={
                  e => setPassword({
                    ...password,
                    [e.target.name]: e.target.value
                  })
                }
              />
            </div>

            {
              alerta.msg && <Alerta alerta={alerta} />
            }
            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-2"
            />
          </form>
        </div>
      </div>
    </>

  )
}

export default CambiarPassword