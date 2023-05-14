import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { InstitucionesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaInstitucion };
function ListaInstitucion({ match }) {
  const { path } = match;
  const rcivas = useRecoilValue(InstitucionesAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getInstituciones();
    return userActions.resetInstituciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Gestionar Institución </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Institución
      </Link>
      <div
        style={{
          height: "450px",
          maxWidth: "1000px",
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
              <th style={{ width: "30%" }}>Descripcion</th>
              <th style={{ width: "30%" }}>Departamento</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {rcivas?.map((prima, index) => (
              <tr key={prima.id}>
                <td>{index + 1}</td>
                <td>{prima.nombre}</td>
                <td>{prima.descripcion}</td>
                <td>
                  {prima.divisionPolitica.nombre}{" - "}
                  {prima.divisionPolitica.pais.nombre}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${prima.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteInstitucion(prima.id)}
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
