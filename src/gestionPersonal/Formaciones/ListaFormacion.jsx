import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { FormacionesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaFormacion };
function ListaFormacion({ match }) {
  const { path } = match;
  const formaciones = useRecoilValue(FormacionesAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (formaciones) {
      const datosTransformados = transformarDatos(formaciones);
      setData(datosTransformados);
    }
  }, [formaciones]);
  useEffect(() => {
    userActions.getFormaciones();
    return userActions.resetFormaciones;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      persona: `${item.persona.nombre} ${item.persona.apellidoPaterno} ${item.persona.apellidoMaterno}`,
      especialidad: item.escpecialidad.nombre,
      formacion: item.tipoFormacion.nombre,
      titulo: item.titulo.nombre,
      institucion: item.institucion.nombre,
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
      header: "Persona",
      accessorKey: "persona",
    },
    {
      header: "Especialidad",
      accessorKey: "especialidad",
    },
    {
      header: "Formación",
      accessorKey: "formacion",
    },
    {
      header: "Título",
      accessorKey: "titulo",
    },
    {
      header: "Institución",
      accessorKey: "institucion",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteFormacion(id);
  };
  return (
    <div>
      <h1>Gestionar Formaciones </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Formaciones
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={formaciones}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
