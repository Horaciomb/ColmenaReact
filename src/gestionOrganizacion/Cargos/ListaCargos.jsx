import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CargosAtom } from "_state";
import { useUserActions } from "_actions";
import TablaCrud from "_components/TablaCrud";
export { ListaCargos };
function ListaCargos({ match }) {
  const { path } = match;
  const datos = useRecoilValue(CargosAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getCargos();
    return userActions.resetCargos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      objetivo: item.objetivo,
      area: item.area ? item.area.nombre : "",
      responsabilidad: item.responsabilidad ? item.responsabilidad.nombre : "",
    }));
  }
  useEffect(() => {
    if (datos) {
      const datosTransformados = transformarDatos(datos);

      //console.log(datosTransformados);
      setData(datosTransformados);
    }
  }, [datos]);
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Objetivo",
      accessorKey: "objetivo",
    },
    {
      header: "Área",
      accessorKey: "area",
    },
    // {
    //   header: "Categoría de Sueldo",
    //   accessorKey: "categoriaSueldo",
    // },
    {
      header: "Responsabilidad",
      accessorKey: "responsabilidad",
    },
  ];
  const handleClick = (id) => {
    return userActions.deleteCargo(id);
  };
  return (
    <div>
      <h1>Gestionar Cargos </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Cargo
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={datos}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
