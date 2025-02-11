import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { AporteNacionalSolidariosAtom } from "_state";
export { ListaAporteNacionalSolidario };
function ListaAporteNacionalSolidario({ match }) {
  const { path } = match;
  const aportes = useRecoilValue(AporteNacionalSolidariosAtom);
  const actions = useUserActions();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (aportes) {
      const datosTransformados = transformarDatos(aportes);
      setData(datosTransformados);
    }
  }, [aportes]);

  useEffect(() => {
    actions.getAporteNacionalSolidarios();
    return actions.resetAporteNacionalSolidarios();
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
    return datos.map((aporte) => ({
      id: aporte.id,
      totalCotizableMin: aporte.totalCotizableMin,
      totalCotizableMax: aporte.totalCotizableMax,
      porcentaje: decimalToPercentage(aporte.porcentaje),
      fechaInicio: formatDate(aporte.fechaInicio),
      fechaFin: formatDate(aporte.fechaFin),
    }));
  }

  const columns = [
    {
      header: "Monto Mínimo",
      accessorKey: "totalCotizableMin",
    },
    {
      header: "Monto Máximo",
      accessorKey: "totalCotizableMax",
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
    return actions.deleteAporteNacionalSolidario(id);
  };
  return (
    <div>
      <h1>Gestionar Aporte Nacional Solidario </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Porcentaje
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={aportes}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
