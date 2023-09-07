import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const { auth, actualizarPerfil } = useAuth();
    const [perfil, setPerfil] = useState({});

    const [alerta, setAlerta] = useState({})

    useEffect(()=> {
        setPerfil(auth);
    }, [auth])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar formulario
        if([perfil.nombre, perfil.email].includes('')){
            setAlerta({
                msg: "Nombre y email son obligatorios",
                error: true
            });
            return;
        }

        // Eliminar las alertas
        setAlerta({});

        // Actualizo y recibo la respuesta
        const respuesta = await actualizarPerfil(perfil);
        setAlerta(respuesta);
    }
    
    return (
        <>
            <AdminNav />
            <h2 className="text-2xl mt-5 mb-10 text-center">Modifica tu{' '}
                <span className="text-indigo-600 font-bold">información</span>
            </h2>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white shadow-sm rounded-lg p-5">
                    <form onSubmit={handleSubmit}>
                        <div className="my-6">
                            <label htmlFor="nombre" className="uppercase font-bold text-gray-600">Nombre</label>
                            <input
                                type="text"
                                className="border w-full p-2 mt-2 rounded-lg"
                                name="nombre"
                                id="nombre"
                                placeholder="Introduce tu nombre"
                                value={perfil.nombre || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                                
                            />
                        </div>

                        <div className="my-6">
                            <label htmlFor="web" className="uppercase font-bold text-gray-600">Sitio web</label>
                            <input
                                type="text"
                                className="border w-full p-2 mt-2 rounded-lg"
                                name="web"
                                placeholder="Introduce tu web"
                                id="web"
                                value={perfil.web || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-6">
                            <label htmlFor="telefono" className="uppercase font-bold text-gray-600">Teléfono</label>
                            <input
                                type="tel"
                                className="border w-full p-2 mt-2 rounded-lg"
                                name="telefono"
                                id="telefono"
                                placeholder="Introduce tu teléfono"
                                value={perfil.telefono || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-6">
                            <label htmlFor="email" className="uppercase font-bold text-gray-600">Email</label>
                            <input
                                type="email"
                                className="border w-full p-2 mt-2 rounded-lg"
                                name="email"
                                id="email"
                                placeholder="Introduce tu email"
                                value={perfil.email || ''}
                                onChange={e => setPerfil({
                                    ...perfil,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>
                        {
                            alerta.msg && <Alerta alerta={alerta} />
                        }
                        <input
                            type="submit"
                            value="Guardar cambios"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppercase w-full mt-2"
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditarPerfil