import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { empresasAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaREmpresas };
function ListaREmpresas({ match }) {
  const { path } = match;
  const empresas = useRecoilValue(empresasAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (empresas) {
      const datosTransformados = transformarDatos(empresas);
      setData(datosTransformados);
    }
  }, [empresas]);
  useEffect(() => {
    userActions.getEmpresas();
    return userActions.resetEmpresas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
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
  ];

  const handleClick = (id) => {
    return userActions.deleteEmpresa(id);
  };
  return (
    <div>
      <h1>Gestionar Empresas </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Emrpesas
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={empresas}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
