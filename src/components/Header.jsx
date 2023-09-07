import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import usePacientes from "../hooks/usePacientes";

const Header = () => {
  // Sacamos la función de cerrar sesión -> viene de nuestro authProvider
  const { cerrarSesion } = useAuth();
  const { setPacientes } = usePacientes();

  return (
    <header className="py-10 px-24 bg-indigo-600 ">
      <div className="container  mx-auto flex flex-col lg:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-center text-indigo-200">Administrador de Pacientes de{' '}
          <span className="text-white font-black">Veterinaria</span></h1>

        <nav className="flex gap-4 flex-col lg:flex-row mt-5 lg:mt-0 items-center">
          <Link to="/admin" className="text-white text-lg uppercase cursor-pointer hover:text-indigo-100">Pacientes</Link>
          <Link to="/admin/perfil" className="text-white text-lg uppercase cursor-pointer hover:text-indigo-100">Perfil</Link>
          <button
            type="button"
            className="text-white text-lg uppercase cursor-pointer hover:text-indigo-100"
            onClick={() => {
              cerrarSesion()
              setPacientes([])
            }}
          >Cerrar Sesión</button>

        </nav>
      </div>
    </header>
  )
}

export default Header