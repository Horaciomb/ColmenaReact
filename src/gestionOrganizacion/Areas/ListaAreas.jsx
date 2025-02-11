import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AreasAtom } from "_state";
import { useUserActions } from "_actions";
import TablaCrud from "_components/TablaCrud"; 
export { ListaAreas };
function ListaAreas({ match }) {
  const { path } = match;
  const datos = useRecoilValue(AreasAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getAreas();
    return userActions.resetAreas();
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
      objetivo: item.objetivo,
    //  tipoArea: item.tipoArea ? item.tipoArea.nombre : "",
    //   empresa: item.empresa ? item.empresa.nombre : "",
      rolMapagrama: item.rolMapagrama ? item.rolMapagrama.nombre : "",
    }));
  }
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Objetivo",
      accessorKey: "objetivo",
    },
    // {
    //   header: "Tipo de Área",
    //   accessorKey: "tipoArea",
    // },
    // {
    //   header: "Empresa",
    //   accessorKey: "empresa",
    // },
    {
      header: "Rol de Mapagrama",
      accessorKey: "rolMapagrama",
    },
  ];
  const handleClick = (id) => {
    // Función que deseas pasar al componente hijo
    return userActions.deleteArea(id);
  };
  return (
    <div>
      <h1>Gestionar Áreas </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Áreas
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
