import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { RcivasAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaRciva };
function ListaRciva({ match }) {
  const { path } = match;
  const rcivas = useRecoilValue(RcivasAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getRcivas();
    return userActions.resetRcivas();
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
      <h1>Gestionar RC-IVA </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar RC-IVA
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
              <th style={{ width: "18%" }}>Cod. Empleado</th>
              <th style={{ width: "50%" }}>Nombre</th>
              <th style={{ width: "10%" }}>Monto</th>
              <th style={{ width: "20%" }}>Fecha</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rcivas?.map((item) => (
              <tr key={item.id}>
                <td>{item.empleado.codigoEmpleado}</td>
                <td>
                  {item.empleado.persona.nombre}{" "}
                  {item.empleado.persona.apellidoPaterno}{" "}
                  {item.empleado.persona.apellidoMaterno}
                </td>
                <td>{item.monto} Bs.</td>
                <td>{formatDate(item.fecha)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteRciva(item.id)}
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
            {!rcivas && (
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
