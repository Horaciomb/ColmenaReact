import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { BonoAntigedadPorcentajesAtom } from "_state";
export { ListaBonoAntiguedad };
function ListaBonoAntiguedad({ match }) {
  const { path } = match;
  const bonos = useRecoilValue(BonoAntigedadPorcentajesAtom);
  const actions = useUserActions();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (bonos) {
      const datosTransformados = transformarDatos(bonos);
      setData(datosTransformados);
    }
  }, [bonos]);

  useEffect(() => {
    actions.getBonoAntiguedades();
    return actions.resetBonoAntiguedades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function decimalToPercentage(decimal) {
    const percentage = decimal * 100;
    return `${percentage.toFixed(2)}%`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  function transformarDatos(datos) {
    return datos.map((bono) => ({
      id: bono.id,
      aniosDeAntiguedad: bono.aniosDeAntiguedad,
      porcentaje: decimalToPercentage(bono.porcentaje),
      fechaInicio: formatDate(bono.fechaInicio),
      fechaFin: formatDate(bono.fechaFin),
    }));
  }

  const columns = [
    {
      header: "Año de Antigüedad",
      accessorKey: "aniosDeAntiguedad",
    },
    {
      header: "Porcentaje",
      accessorKey: "porcentaje",
    },
    {
      header: "Fecha Inicial",
      accessorKey: "fechaInicio",
    },
    {
      header: "Fecha Final",
      accessorKey: "fechaFin",
    },
  ];

  const handleClick = (id) => {
    return actions.deleteBonoAntiguedad(id);
  };
  return (
    <div>
      <h1>Gestionar Porcentaje de Bono de Antigüedad </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Porcentaje
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={bonos}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
