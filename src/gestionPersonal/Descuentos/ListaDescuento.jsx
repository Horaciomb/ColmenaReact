import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DescuentosAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaDescuento };
function ListaDescuento({ match }) {
  const { path } = match;
  const descuentos = useRecoilValue(DescuentosAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getDescuentos();
    return userActions.resetDescuentos();
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
      <h1>Gestionar Descuentos </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Descuentos
      </Link>
      <div
        style={{
          height: "450px",
          //maxWidth: "1000px",
          overflow: "auto",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          marginRight: "10px",
        }}
      >
        <table className="table table-striped ">
          <thead>
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "40%" }}>Empleado</th>
              <th style={{ width: "20%" }}>Nomina</th>
              <th style={{ width: "10%" }}>Monto</th>
              <th style={{ width: "10%" }}>FechaInicio</th>
              <th style={{ width: "20%" }}>FechaFin</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {descuentos?.map((descuento, index) => (
              <tr key={descuento.id}>
                <td>{index + 1}</td>
                <td>
                  {descuento.empleado.persona.nombre}{" "}
                  {descuento.empleado.persona.apellidoPaterno}{" "}
                  {descuento.empleado.persona.apellidoMaterno}
                </td>
                <td>{descuento.nomina.descripcion}</td>
                <td>{descuento.monto} Bs.</td>
                <td>{formatDate(descuento.fechaInicio)}</td>
                <td>{formatDate(descuento.fechaFin)}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${descuento.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteDescuento(descuento.id)}
                    className="btn btn-sm btn-danger"
                    disabled={descuento.isDeleting}
                  >
                    {descuento.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!descuentos && (
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
