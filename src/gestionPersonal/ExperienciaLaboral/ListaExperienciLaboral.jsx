import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { ExpLaboralesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaExperienciLaboral };
function ListaExperienciLaboral({ match }) {
  const { path } = match;
  const experienciasLaborales = useRecoilValue(ExpLaboralesAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (experienciasLaborales) {
      const datosTransformados = transformarDatos(experienciasLaborales);
      setData(datosTransformados);
    }
  }, [experienciasLaborales]);

  useEffect(() => {
    userActions.getExperienciasLaborales();
    return userActions.resetExperienciaLaborales;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      persona: `${item.persona.nombre} ${item.persona.apellidoPaterno} ${item.persona.apellidoMaterno}`,
      empresa: item.empresa.nombre,
      tipoCargo: item.tipoCargo.nombre,
      motivoBaja: item.motivoBaja.nombre,
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
      header: "Empresa",
      accessorKey: "empresa",
    },
    {
      header: "Tipo de Cargo",
      accessorKey: "tipoCargo",
    },
    {
      header: "Motivo de Baja",
      accessorKey: "motivoBaja",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteExperienciaLaboral(id);
  };
  return (
    <div>
      <h1>Gestionar Experiencia Laboral </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Experiencia Laboral
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={experienciasLaborales}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
