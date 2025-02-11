import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud"; 
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { RcivasAtom } from "_state";
export { ListaRciva };
function ListaRciva({ match }) {
  const { path } = match;
  const rcivas = useRecoilValue(RcivasAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (rcivas) {
      const datosTransformados = transformarDatos(rcivas);
      setData(datosTransformados);
    }
  }, [rcivas]);

  useEffect(() => {
    userActions.getRcivas();
    return userActions.resetRcivas;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      codigoEmpleado: item.empleado.codigoEmpleado,
      nombre: `${item.empleado.persona.nombre} ${item.empleado.persona.apellidoPaterno} ${item.empleado.persona.apellidoMaterno}`,
      monto: `${item.monto} Bs.`,
      fecha: formatDate(item.fecha),
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
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Monto",
      accessorKey: "monto",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteRciva(id);
  };
  return (
    <div>
      <h1>Gestionar RC-IVA </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar RC-IVA
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={rcivas}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
