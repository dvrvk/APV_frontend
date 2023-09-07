import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {

  const { pacientes } = usePacientes();

  return (
    <>
      <h2 className="text-xl text-center mb-10">
        Administra tus{' '}
        <span className="text-indigo-500 font-bold">pacientes y citas</span>
      </h2>
      {pacientes.length ? 
      (
        <>
          {
            pacientes.map(paciente => (
              <Paciente 
                key={paciente._id}
                paciente={paciente}
              />
            ))
          }
        </>
      )
      : 
      (
        <>
          <p className="text-xl mb-10 text-center">
            <span className="text-red-500 font-bold">No hay pacientes</span>. 
            Agrega un paciente y aparecerá en este lugar
          </p>
        </>
      )}
    </>
  )
}

export default ListadoPacientes