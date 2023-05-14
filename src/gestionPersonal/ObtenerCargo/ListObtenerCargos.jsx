import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useRecoilValue } from "recoil";
//import { empleadosAtom } from "_state";
//import { useUserActions } from "_actions";
import client, { GET_CARGOS_QUERY } from "../../grafql/graphql";
export { ListObtenerCargos };
function ListObtenerCargos({ match }) {
  const { path } = match;
  const [datos, setDatos] = useState(null);
  useEffect(() => {
    async function getData() {
      const result = await client.query({ query: GET_CARGOS_QUERY });
      setDatos(result.data.cargos);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Obtener Cargos</h1>
      <div
        style={{
          height: "400px",
          //maxWidth: "900px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "10%" }}>Cargo</th>
              <th style={{ width: "15%" }}>Objetivo de Cargo</th>
              <th style={{ width: "25%" }}>Area</th>
              <th style={{ width: "15%" }}>Tipo Area</th>
              <th style={{ width: "10%" }}>Ciudad</th>
              <th style={{ width: "10%" }}>Opción</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((cargo, index) => (
              <tr key={cargo.id}>
                <td>{index + 1}</td>
                <td>{cargo.tipoCargo.nombre}</td>
                <td>{cargo.objetivo}</td>
                <td>{cargo.area.objetivo}</td>
                <td>{cargo.area.tipoArea.nombre}</td>
                <td>{cargo.ciudad.nombre}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/ver/${cargo.id}`}
                    className="btn btn-sm btn-info mr-1"
                  >
                    Ver
                  </Link>
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
