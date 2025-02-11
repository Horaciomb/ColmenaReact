import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import { useRecoilValue } from "recoil";
import { MontoUfvsAtom } from "_state";
export { ListaMontoUfv };
function ListaMontoUfv({ match }) {
  const { path } = match;
  const aportes = useRecoilValue(MontoUfvsAtom);
  const actions = useUserActions();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (aportes) {
      const datosTransformados = transformarDatos(aportes);
      setData(datosTransformados);
    }
  }, [aportes]);

  useEffect(() => {
    actions.getMontUfvs();
    return actions.resetMontoUfvs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  function transformarDatos(datos) {
    return datos
      .slice()
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .map((aporte) => ({
        id: aporte.id,
        monto: aporte.monto,
        fecha: formatDate(aporte.fecha),
      }));
  }

  const columns = [
    {
      header: "Monto",
      accessorKey: "monto",
    },
    {
      header: "Fecha",
      accessorKey: "fecha",
    },
  ];

  const handleClick = (id) => {
    return actions.deleteMontoUfv(id);
  };
  return (
    <div>
      <h1>Gestionar Monto UFV </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Monto
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
