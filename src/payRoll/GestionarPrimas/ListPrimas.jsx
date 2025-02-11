import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { primasAtom } from "_state";
export { ListPrimas };
function ListPrimas({ match }) {
  const { path } = match;
  const primas = useRecoilValue(primasAtom);
  const userActions = useUserActions();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (primas) {
      const datosTransformados = transformarDatos(primas);
      setData(datosTransformados);
    }
  }, [primas]);

  useEffect(() => {
    userActions.getPrimas();
    return userActions.resetPrimas;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function decimalToPercentage(decimal) {
    const percentage = decimal * 100;
    return `${percentage}%`;
  }

  function transformarDatos(datos) {
    return datos
      .slice()
      .sort((a, b) => b.anio - a.anio)
      .map((prima, index) => ({
        id: prima.id,
        anio: prima.anio,
        porcentaje: decimalToPercentage(prima.porcentaje),
      }));
  }

  const columns = [
    {
      header: "Año",
      accessorKey: "anio",
    },
    {
      header: "Porcentaje",
      accessorKey: "porcentaje",
    },
  ];

  const handleClick = (id) => {
    return userActions.deletePrima(id);
  };

  return (
    <div>
      <h1>Gestionar Primas </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Primas
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={primas}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
