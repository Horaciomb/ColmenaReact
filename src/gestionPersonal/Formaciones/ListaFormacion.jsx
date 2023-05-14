import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FormacionesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaFormacion };
function ListaFormacion({ match }) {
  const { path } = match;
  const aporte = useRecoilValue(FormacionesAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getFormaciones();
    return userActions.resetFormaciones();
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
      <h1>Gestionar Formaciones </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Formaciones
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
              <th style={{ width: "10" }}>#</th>
              <th style={{ width: "30%" }}>Persona</th>
              <th style={{ width: "10%" }}>Especialidad</th>
              <th style={{ width: "10%" }}>Formación</th>
              <th style={{ width: "10%" }}>Título</th>
              <th style={{ width: "10%" }}>Institución</th>
              <th style={{ width: "10%" }}>Fecha</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {aporte?.map((prima, index) => (
              <tr key={prima.id}>
                <td>{index + 1}</td>
                <td>
                  {prima.persona.nombre}{" "}
                  {prima.persona.apellidoPaterno}{" "}
                  {prima.persona.apellidoMaterno}
                </td>
                <td>{prima.escpecialidad.nombre} </td>
                <td>{prima.tipoFormacion.nombre} </td>
                <td>{prima.titulo.nombre} </td>
                <td>{prima.institucion.nombre} </td>
                <td>{formatDate(prima.fecha)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${prima.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteFormacion(prima.id)}
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
            {!aporte && (
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
