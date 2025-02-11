import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { SubsidiosAtom } from "_state";
export { ListaSubsidios };
function ListaSubsidios({ match }) {
  const { path } = match;
  const subsidios = useRecoilValue(SubsidiosAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (subsidios) {
      const datosTransformados = transformarDatos(subsidios);
      setData(datosTransformados);
    }
  }, [subsidios]);

  useEffect(() => {
    userActions.getSubsidios();
    return userActions.resetSubsidios;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((subsidio, index) => ({
      id: subsidio.id,
      index: index + 1,
      empleado: `${subsidio.empleado.persona.nombre} ${subsidio.empleado.persona.apellidoPaterno} ${subsidio.empleado.persona.apellidoMaterno}`,
      nomina: subsidio.nomina.descripcion,
      monto: `${subsidio.monto} Bs.`,
      fechaInicio: formatDate(subsidio.fechaInicio),
      fechaFin: formatDate(subsidio.fechaFin),
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
      header: "Nomina",
      accessorKey: "nomina",
    },
    {
      header: "Monto",
      accessorKey: "monto",
    },
    {
      header: "FechaInicio",
      accessorKey: "fechaInicio",
    },
    {
      header: "FechaFin",
      accessorKey: "fechaFin",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteSubsidio(id);
  };
  return (
    <div>
      <h1>Asignar Subsidios </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Asignar
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={subsidios}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
