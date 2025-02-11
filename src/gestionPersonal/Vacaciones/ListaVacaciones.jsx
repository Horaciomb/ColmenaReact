import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { VacacionesAtom } from "_state";
export { ListaVacaciones };
function ListaVacaciones({ match }) {
  const { path } = match;
  const vacaciones = useRecoilValue(VacacionesAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (vacaciones) {
      const datosTransformados = transformarDatos(vacaciones);
      setData(datosTransformados);
    }
  }, [vacaciones]);
  useEffect(() => {
    userActions.getVacaciones();
    return userActions.resetVacaciones;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((vacacion, index) => ({
      id: vacacion.id,
      index: index + 1,
      empleado: `${vacacion.empleado.persona.nombre} ${vacacion.empleado.persona.apellidoPaterno} ${vacacion.empleado.persona.apellidoMaterno}`,
      diasTomados: vacacion.diasTomados,
      fechaInicio: formatDate(vacacion.fechaInicio),
    }));
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  const columns = [
    {
      header: "Empleado",
      accessorKey: "empleado",
    },
    {
      header: "Días Tomados",
      accessorKey: "diasTomados",
    },
    {
      header: "Fecha de Inicio",
      accessorKey: "fechaInicio",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteVacacion(id);
  };
  return (
    <div>
      <h1>Gestionar Vacaciones </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Vacaciones
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={vacaciones}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
