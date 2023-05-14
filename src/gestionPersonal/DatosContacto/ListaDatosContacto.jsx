import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { DatosContactosAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaDatosContacto };
function ListaDatosContacto({ match }) {
  const { path } = match;
  const ingresos = useRecoilValue(DatosContactosAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getDatosContactos();
    return userActions.resetDatosContactos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Gestionar Datos de Contacto </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Datos de Contacto
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
              <th style={{ width: "40%" }}>Persona</th>
              <th style={{ width: "20%" }}>Localidad</th>
              <th style={{ width: "10%" }}>Domicilio</th>
              <th style={{ width: "10%" }}>Telefono</th>
              <th style={{ width: "10%" }}>Correo</th>
              <th style={{ width: "10%" }}>Departamento</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {ingresos?.map((ingreso, index) => (
              <tr key={ingreso.id}>
                <td>{index + 1}</td>
                <td>
                  {ingreso.persona.nombre}{" "}
                  {ingreso.persona.apellidoPaterno}{" "}
                  {ingreso.persona.apellidoMaterno}
                </td>
                <td>{ingreso.localidad}</td>
                <td>{ingreso.domicilio}</td>
                <td>{ingreso.telefono}</td>
                <td>{ingreso.correo}</td>
                <td>{ingreso.divisionPolitica.nombre}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${ingreso.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteDatosContacto(ingreso.id)}
                    className="btn btn-sm btn-danger"
                    disabled={ingreso.isDeleting}
                  >
                    {ingreso.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!ingresos && (
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
