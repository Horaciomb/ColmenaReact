import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AsignacionAfpsAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaAsignacionAfp };
function ListaAsignacionAfp({ match }) {
  const { path } = match;
  const rcivas = useRecoilValue(AsignacionAfpsAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getAsignacionAfps();
    return userActions.resetAsignacionAfps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Gestionar Asignación AFP </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Asignación AFP
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
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "30%" }}>Empleado</th>
              <th style={{ width: "15%" }}>Entidad AFP</th>
              <th style={{ width: "10%" }}>Codigo AFP</th>
              <th style={{ width: "20%" }}>Ciudad</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rcivas?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.empleado.persona.nombre}{" "}
                  {item.empleado.persona.apellidoPaterno}{" "}
                  {item.empleado.persona.apellidoMaterno}
                </td>
                <td>{item.afp.nombre}</td>
                <td>{item.codigoAfp}</td>
                <td>
                  {item.ciudad.nombre}
                  {" - "}
                  {item.ciudad.divisionPolitica.nombre}
                  {" - "}
                  {item.ciudad.divisionPolitica.pais.nombre}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteAsignacionAfp(item.id)}
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
