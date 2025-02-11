import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { AsigancionGestorasAtom } from "_state";
export { ListaAsignacionGestora };
function ListaAsignacionGestora({ match }) {
  const { path } = match;
  const asignacionGestoras = useRecoilValue(AsigancionGestorasAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (asignacionGestoras) {
      const datosTransformados = transformarDatos(asignacionGestoras);
      setData(datosTransformados);
    }
  }, [asignacionGestoras]);
  useEffect(() => {
    userActions.getAsignacionGestoras();
    return userActions.resetAsignacionGestoras;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((item, index) => ({
      id: item.id,
      index: index + 1,
      empleado: `${item.empleado.persona.nombre} ${item.empleado.persona.apellidoPaterno} ${item.empleado.persona.apellidoMaterno}`,
      codigoGestora: item.codigoGestora,
    }));
  }

  const columns = [
    {
      header: "Empleado",
      accessorKey: "empleado",
    },
    {
      header: "Código Gestora",
      accessorKey: "codigoGestora",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteAsignacionGestora(id);
  };
  return (
    <div>
      <h1>Gestionar Asignación Gestora </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Asignación Gestora
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={asignacionGestoras}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
