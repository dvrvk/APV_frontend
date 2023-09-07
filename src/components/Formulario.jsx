import { useState, useEffect } from "react"
import Alerta from "./Alerta";
import { validarEmail } from "../helpers/index.js";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();

    // Cargar el paciente al inicio o al editar
    useEffect(() => {
        // Si existe la propiedad
        if(paciente?.nombre) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha.substring(0, 10));
            setSintomas(paciente.sintomas);
            // Me permite saber si estoy editando
            setId(paciente._id);
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault();

        // Validar el formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return;
        }

        if(!validarEmail){
            setAlerta({
                msg: "Email no válido",
                error: true
            })
            return;
        }
        
        // Eliminar los mensajes de error
        setAlerta({})

        // Guardar paciente - Esta función viene del Context (PacienteProvider)
        guardarPaciente({nombre, propietario, email, fecha, sintomas, id});

        // Alerta exito
        setAlerta({
            msg: 'Guardado correctamente',
            error: false
        })
        // Limpiar campos
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

  return (
    <>
        <h2 className="text-xl text-center mb-10">
            Añade tus pacientes y {''}
            <span className="text-indigo-500 font-bold">Administralos</span>
        </h2>
        
        <form 
            className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                    className="font-bold text-gray-600 uppercase" 
                    htmlFor="mascota"
                >Nombre mascota</label>
                <input 
                    type="text"
                    id="mascota"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Nombre mascota"
                    className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    className="font-bold text-gray-600 uppercase" 
                    htmlFor="propietario"
                >Nombre propietario</label>
                <input 
                    type="text"
                    id="propietario"
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                    placeholder="Nombre propietario"
                    className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    className="font-bold text-gray-600 uppercase" 
                    htmlFor="email"
                >Email</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email del propietario"
                    className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    className="font-bold text-gray-600 uppercase" 
                    htmlFor="fecha"
                >Fecha de alta</label>
                <input 
                    type="date"
                    id="fecha"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                    className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
                />
            </div>
            <div className="mb-5">
                <label 
                    className="font-bold text-gray-600 uppercase" 
                    htmlFor="sintomas"
                >Síntomas</label>
                <textarea 
                    id="sintomas"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                    placeholder="Escribe aquí los síntomas"
                    className="border-2 rounded-md w-full p-2 mt-2 placeholder-gray-400"
                ></textarea>
            </div>
            {
            alerta.msg && <Alerta alerta={alerta}/>
            }
            <input 
                type="submit" 
                value={id ? "Guardar cambios": "Agregar paciente"}
                className="bg-indigo-600 w-full rounded-md p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-colors"
            />
        </form>
    </>
    
  )
}

export default Formulario