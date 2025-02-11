import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { DescuentosAtom } from "_state";
export { ListaDescuento };
function ListaDescuento({ match }) {
  const { path } = match;
  const descuentos = useRecoilValue(DescuentosAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (descuentos) {
      const datosTransformados = transformarDatos(descuentos);
      setData(datosTransformados);
    }
  }, [descuentos]);
  useEffect(() => {
    userActions.getDescuentos();
    return userActions.resetDescuentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function transformarDatos(datos) {
    return datos.map((descuento, index) => ({
      id: descuento.id,
      index: index + 1,
      empleado: `${descuento.empleado.persona.nombre} ${descuento.empleado.persona.apellidoPaterno} ${descuento.empleado.persona.apellidoMaterno}`,
      nomina: descuento.nomina.descripcion,
      monto: `${descuento.monto} Bs.`,
      fechaInicio: formatDate(descuento.fechaInicio),
      fechaFin: formatDate(descuento.fechaFin),
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
    return userActions.deleteDescuento(id);
  };
  return (
    <div>
      <h1>Gestionar Descuentos </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Descuentos
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={descuentos}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
