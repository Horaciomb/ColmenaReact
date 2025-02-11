import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { empleadosAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaEmpleados };
function ListaEmpleados({ match }) {
  const { path } = match;
  const empleados = useRecoilValue(empleadosAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (empleados) {
      const datosTransformados = transformarDatos(empleados);
      setData(datosTransformados);
    }
  }, [empleados]);

  useEffect(() => {
    userActions.getEmpleados();
    return userActions.resetEmpleados;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((empleado) => ({
      id: empleado.id,
      codigoEmpleado: empleado.codigoEmpleado,
      fechaAlta: formatDate(empleado.fechaAlta),
      fechaBaja: formatDate(empleado.fechaBaja),
      estado: empleado.estado.nombre,
      persona: `${empleado.persona.nombre} ${empleado.persona.apellidoPaterno} ${empleado.persona.apellidoMaterno}`,
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
      header: "Cod. Empleado",
      accessorKey: "codigoEmpleado",
    },
    {
      header: "Fecha Alta",
      accessorKey: "fechaAlta",
    },
    {
      header: "Fecha Baja",
      accessorKey: "fechaBaja",
    },
    {
      header: "Estado",
      accessorKey: "estado",
    },
    {
      header: "Persona",
      accessorKey: "persona",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteEmpleado(id);
  };
  return (
    <div>
      <h1>Gestionar Empleados</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Empleado
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={empleados}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
