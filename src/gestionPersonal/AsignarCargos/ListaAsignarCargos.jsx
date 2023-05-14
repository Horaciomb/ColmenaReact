import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useRecoilValue } from "recoil";
//import { RcivasAtom } from "_state";
import { useUserActions } from "_actions";
import client, { GET_CONTRATOS_QUERY } from "../../grafql/graphql";
export { ListaAsignarCargos };
function ListaAsignarCargos({ match }) {
  const { path } = match;
  const userActions = useUserActions();

  const [datos, setDatos] = useState(null);
  useEffect(() => {
    async function getData() {
      const result = await client.query({ query: GET_CONTRATOS_QUERY });
      setDatos(result.data.contratos);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <h1>Asignar Cargo </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Asignar Cargo
      </Link>
      <div
        style={{
          height: "450px",
          //maxWidth: "900px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "4.28%" }}>#</th>
              <th style={{ width: "14.28%" }}>Cod Empleado</th>
              <th style={{ width: "14.28%" }}>Empleado</th>
              <th style={{ width: "14.28%" }}>Tipo Contrato</th>
              <th style={{ width: "14.28%" }}>Fecha Inicio</th>
              <th style={{ width: "14.28%" }}>Fecha Fin</th>
              <th style={{ width: "14.28%" }}>Horas</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((contrato, index) => (
              <tr key={contrato.id}>
                <td>{index + 1}</td>
                <td>{contrato.empleado.codigoEmpleado}</td>
                <td>
                  {contrato.empleado.persona.nombre}{" "}
                  {contrato.empleado.persona.apellidoPaterno}{" "}
                  {contrato.empleado.persona.apellidoMaterno}
                </td>
                <td>{contrato.tipoContrato.nombre}</td>
                <td>{formatDate(contrato.fechaInicio)}</td>
                <td>{formatDate(contrato.fechaFin)}</td>
                <td>{contrato.horas}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${contrato.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteContrato2(contrato.id)}
                    className="btn btn-sm btn-danger"
                    disabled={contrato.isDeleting}
                  >
                    {contrato.isDeleting ? (
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
