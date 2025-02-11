import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CentrosCostosAtom } from "_state";
import { useUserActions } from "_actions";
import TablaCrud from "_components/TablaCrud";
export { ListaCentroCosto };
function ListaCentroCosto({ match }) {
  const { path } = match;
  const datos = useRecoilValue(CentrosCostosAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getCentrosCostos();
    return userActions.reserCentrosCostos();
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
      descripcion: item.descripcion,
      presupuestoAsignado: item.presupuestoAsignado,
      //  tipoArea: item.tipoArea ? item.tipoArea.nombre : "",
      //   empresa: item.empresa ? item.empresa.nombre : "",
      area: item.area ? item.area.nombre : "",
    }));
  }
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Descripción",
      accessorKey: "descripcion",
    },
    {
      header: "Presupuesto",
      accessorKey: "presupuestoAsignado",
    },
    {
      header: "Área",
      accessorKey: "area",
    },
  ];
  const handleClick = (id) => {
    // Función que deseas pasar al componente hijo
    return userActions.deleteCentroCosto(id);
  };
  return (
    <div>
      <h1>Gestionar Centro de Costos </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Centro de Costos
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
