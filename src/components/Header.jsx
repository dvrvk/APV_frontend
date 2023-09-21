import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth"
import usePacientes from "../hooks/usePacientes";
import BurgerButton from "./BurgerButton";
import '../App.css';


const Header = () => {
  const [clicked, setClicked] = useState(false)
  // Sacamos la función de cerrar sesión -> viene de nuestro authProvider
  const { cerrarSesion } = useAuth();
  const { setPacientes } = usePacientes();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setClicked(!clicked);
    }
    
  }

  const handleResize = window.addEventListener('resize', () => {
    // Elimina el menú desplegable si aumenta de 768 px
    if (window.innerWidth > 768 && clicked) {
      setClicked(!clicked);
    }
  })

  useEffect(() => {
    // event listener para el evento 'resize' de la ventana 
    window.addEventListener('resize', handleResize);
    // Limpia el event listener cuando el componente se desmonta para evitar pérdida de memoria
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, [])

  return (
    <header className="py-10 px-24 bg-indigo-600">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="z-10 font-bold text-2xl text-center text-indigo-200">Administrador de Pacientes de{' '}
          <span className="text-white font-black">Veterinaria</span>
        </h1>

        <nav className="flex">
          <ul className={`links ${clicked ? 'active' : ''} z-10 text-white uppercase text-2xl md:text-lg md:flex md:gap-4 md:items-center md:justify-between `}>
            <li className="mt-5 md:mt-0"><Link to="/admin" onClick={handleClick} className="cursor-pointer hover:text-indigo-100">Pacientes</Link></li>
            <li className="mt-5 md:mt-0"><Link to="/admin/perfil" onClick={handleClick} className="cursor-pointer hover:text-indigo-100">Perfil</Link></li>
            <li className="mt-5 md:mt-0"><button
              type="button"
              className="uppercase cursor-pointer hover:text-indigo-100"
              onClick={() => {
                cerrarSesion()
                setPacientes([])
              }}
            >Cerrar Sesión</button></li>
          </ul>

          <div className="burger z-10">
            <BurgerButton clicked={clicked} handleClick={handleClick} />
          </div>
          <div className={`bigDiv bg-indigo-600 initial ${clicked ? 'active' : ''}`}></div>
        </nav>
      </div>
    </header>
  )
}

export default Header