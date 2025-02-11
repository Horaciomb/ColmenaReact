import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { IngresosAtom } from "_state";
export { ListaIngreso };
function ListaIngreso({ match }) {
  const { path } = match;
  const ingresos = useRecoilValue(IngresosAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (ingresos) {
      const datosTransformados = transformarDatos(ingresos);
      setData(datosTransformados);
    }
  }, [ingresos]);
  useEffect(() => {
    userActions.getIngresos();
    return userActions.resetIngresos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function transformarDatos(datos) {
    return datos.map((ingreso, index) => ({
      id: ingreso.id,
      index: index + 1,
      empleado: `${ingreso.empleado.persona.nombre} ${ingreso.empleado.persona.apellidoPaterno} ${ingreso.empleado.persona.apellidoMaterno}`,
      nomina: ingreso.nomina.descripcion,
      monto: `${ingreso.monto} Bs.`,
      fechaInicio: formatDate(ingreso.fechaInicio),
      fechaFin: formatDate(ingreso.fechaFin),
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
    return userActions.deleteIngreso(id);
  };
  return (
    <div>
      <h1>Gestionar Ingresos </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Ingresos
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={ingresos}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
