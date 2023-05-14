import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SueldosAtom } from "_state";
import { useUserActions } from "_actions";
import client, { getContratoSueldosQuery } from "../../../grafql/graphql";
export { ListarSueldos };
function ListarSueldos({ match }) {
  const { path } = match;
  const { id } = match.params;
  const [datos, setDatos] = useState(null);
  const sueldos = useRecoilValue(SueldosAtom);
  const userActions = useUserActions();
  useEffect(() => {
    async function getData() {
      const result = await client.query(getContratoSueldosQuery(id));
      setDatos(result.data.contrato.sueldos);
      console.log(result.data.contrato.sueldos);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datos]);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <h1>Gestionar Sueldos </h1>
      <Link to={`${path}/add/${id}`} className="btn btn-sm btn-success mb-2">
        Agregar Sueldos
      </Link>

      <div
        style={{
          maxheight: "450px",
          maxWidth: "900px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "20%" }}>Fecha Inicio</th>
              <th style={{ width: "20%" }}>Fecha Fin</th>
              <th style={{ width: "20%" }}>Monto</th>
              <th style={{ width: "20%" }}>Tipo Sueldo</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((sueldo, index) => (
              <tr key={sueldo.id}>
                <td>{index + 1}</td>
                <td>{formatDate(sueldo.fechaInicio)}</td>
                <td>{formatDate(sueldo.fechaFin)}</td>
                <td>{sueldo.monto}</td>
                <td>{sueldo.tipoSueldo.nombre}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${sueldo.id}/${id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteSueldo2(sueldo.id)}
                    className="btn btn-sm btn-danger"
                    disabled={sueldo.isDeleting}
                  >
                    {sueldo.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!datos && (
              <tr>
                <td colSpan="4" className="text-center">
                  <span className="spinner-border spinner-border-lg align-center"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
