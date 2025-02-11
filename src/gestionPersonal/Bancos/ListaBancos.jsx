import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useRecoilValue } from "recoil";
//import { BancosAtom } from "_state";
import { useUserActions } from "_actions";
import client, { GET_BANCOS_QUERY } from "../../grafql/graphql";
export { ListaBancos };
function ListaBancos({ match }) {
  const { path } = match;
  //const rcivas = useRecoilValue(BancosAtom);
  const [datos, setDatos] = useState(null);
  const userActions = useUserActions();
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_BANCOS_QUERY,
        fetchPolicy: "network-only",
      });
      setDatos(result.data.bancos);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Gestionar Banco </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Banco
      </Link>
      <div
        style={{
          height: "450px",
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
              <th style={{ width: "20%" }}>Nombre</th>
              <th style={{ width: "50%" }}>Descripción</th>
              <th style={{ width: "20%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nombre}</td>
                <td>{item.descripcion} </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteBanco2(item.id)}
                    className="btn btn-sm btn-danger"
                    disabled={item.isDeleting}
                  >
                    {item.isDeleting ? (
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
