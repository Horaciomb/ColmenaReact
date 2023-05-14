import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { primasAtom } from "_state";
import { useUserActions } from "_actions";
export { ListPrimas };
function ListPrimas({ match }) {
  const { path } = match;
  const primas = useRecoilValue(primasAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getPrimas();
    return userActions.resetPrimas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  function decimalToPercentage(decimal) {
    const percentage = decimal * 100;
    return `${percentage}%`;
  }

  return (
    <div>
      <h1>Gestionar Primas </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Primas
      </Link>
      <div
        style={{
          height: "450px",
          maxWidth: "700px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Año</th>
              <th style={{ width: "40%" }}>Porcentaje</th>
              <th style={{ width: "40%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {primas
              ?.slice()
              .sort((a, b) => b.anio - a.anio)
              .map((prima) => (
                <tr key={prima.id}>
                  <td>{prima.anio}</td>
                  <td>{decimalToPercentage(prima.porcentaje)}</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <Link
                      to={`${path}/edit/${prima.id}`}
                      className="btn btn-sm btn-primary mr-1"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => userActions.deletePrima(prima.id)}
                      className="btn btn-sm btn-danger"
                      disabled={prima.isDeleting}
                    >
                      {prima.isDeleting ? (
                        <span className="spinner-border spinner-border-sm"></span>
                      ) : (
                        <span>Eliminar</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            {!primas && (
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
