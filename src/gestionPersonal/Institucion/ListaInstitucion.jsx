import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { InstitucionesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaInstitucion };
function ListaInstitucion({ match }) {
  const { path } = match;
  const rcivas = useRecoilValue(InstitucionesAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    if (rcivas) {
      const datosTransformados = transformarDatos(rcivas);
      setData(datosTransformados);
    }
  }, [rcivas]);
  useEffect(() => {
    userActions.getInstituciones();
    return userActions.resetInstituciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      divisionPolitica: `${item.divisionPolitica.nombre} - ${item.divisionPolitica.pais.nombre}`,
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
      header: "Departamento",
      accessorKey: "divisionPolitica",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteInstitucion(id);
  };
  return (
    <div>
      <h1>Gestionar Institución </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Institución
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
