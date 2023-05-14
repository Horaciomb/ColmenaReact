import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { empresasAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaREmpresas };
function ListaREmpresas({ match }) {
  const { path } = match;
  const empresas = useRecoilValue(empresasAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getEmpresas();
    return userActions.resetEmpresas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Gestionar Empresas </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Emrpesas
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
              <th style={{ width: "30%" }}>Nombre</th>
              <th style={{ width: "20%" }}>Descripción</th>
              <th style={{ width: "10%" }}>Nit</th>
              <th style={{ width: "10%" }}>Región Patronal</th>
              <th style={{ width: "20%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {empresas?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nombre}</td>
                <td>{item.descripcion}</td>
                <td>{item.nit}</td>
                <td>{item.regPatronal}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteEmpresa(item.id)}
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
            {!empresas && (
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
