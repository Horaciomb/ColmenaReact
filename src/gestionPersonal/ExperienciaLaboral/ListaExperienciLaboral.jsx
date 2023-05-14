import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ExpLaboralesAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaExperienciLaboral };
function ListaExperienciLaboral({ match }) {
  const { path } = match;
  const aporte = useRecoilValue(ExpLaboralesAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getExperienciasLaborales();
    return userActions.resetExperienciaLaborales();
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
      <h1>Gestionar Experiencia Laboral </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Experiencia Laboral
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
              <th style={{ width: "20%" }}>Empresa</th>
              <th style={{ width: "10%" }}>Tipo de Cargo</th>
              <th style={{ width: "10%" }}>Motivo de Baja</th>
              <th style={{ width: "10%" }}>Fecha</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {aporte?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.persona.nombre} {item.persona.apellidoPaterno}{" "}
                  {item.persona.apellidoMaterno}
                </td>
                <td>{item.empresa.nombre} </td>
                <td>{item.tipoCargo.nombre} </td>
                <td>{item.motivoBaja.nombre} </td>
                <td>{formatDate(item.fecha)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteExperienciaLaboral(item.id)}
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
