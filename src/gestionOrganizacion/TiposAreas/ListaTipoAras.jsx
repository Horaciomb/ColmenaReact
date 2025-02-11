import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { TiposAreasAtom } from "_state";
import { useUserActions } from "_actions";
import TablaCrud from "_components/TablaCrud";
export { ListaTipoAras };
function ListaTipoAras({ match }) {
  const { path } = match;
  const datos = useRecoilValue(TiposAreasAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getTiposAreas();
    return userActions.resetTiposAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (datos) {
      const datosTransformados = transformarDatos(datos);

      //console.log(datosTransformados);
      setData(datosTransformados);
    }
  }, [datos]);
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      grupoArea: item.grupoArea ? item.grupoArea.nombre : "",
    }));
  }
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Grupo de Área",
      accessorKey: "grupoArea",
    },
  ];
  const handleClick = (id) => {
    // Función que deseas pasar al componente hijo
    return userActions.deleteTipoArea(id);
  };
  return (
    <div>
      <h1>Gestionar Tipos de Áreas </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Tipos de Áreas
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
