import React from "react";
import {  useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { empleadosAtom } from "_state";
import { useUserActions } from "_actions";
//import client, { GET_EMPLEADOS_QUERY } from "../../grafql/graphql";
export { ListaEmpleados };
function ListaEmpleados({ match }) {
  const { path } = match;
  //const [datos, setDatos] = useState(null);
  const empleados = useRecoilValue(empleadosAtom);
  const userActions = useUserActions();
  useEffect(() => {
    userActions.getEmpleados();

    return userActions.resetEmpleados();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*useEffect(() => {
    async function getData() {
      const result = await client.query({ query: GET_EMPLEADOS_QUERY });
      setDatos(result.data.empleados);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <h1>Gestionar Empleados</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar
      </Link>
      <div
        style={{
          height: "400px",
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
              <th style={{ width: "10%" }}>Cod. Empleado</th>
              <th style={{ width: "10%" }}>Fecha Alta</th>
              <th style={{ width: "10%" }}>Fecha Baja</th>
              <th style={{ width: "10%" }}>Estado</th>
              <th style={{ width: "25%" }}>Persona</th>
              <th style={{ width: "10%" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados?.map((empleado, index) => (
              <tr key={empleado.id}>
                <td>{index + 1}</td>
                <td>{empleado.codigoEmpleado}</td>
                <td>{formatDate(empleado.fechaAlta)}</td>
                <td>{formatDate(empleado.fechaBaja)}</td>
                <td>{empleado.estado.nombre}</td>
                <td>
                  {empleado.persona.nombre} {empleado.persona.apellidoPaterno} {empleado.persona.apellidoMaterno}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${empleado.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => {
                      userActions.deleteEmpleado(empleado.id);
                    }}
                    className="btn btn-sm btn-danger"
                    style={{ width: "70px" }}
                    disabled={empleado.isDeleting}
                  >
                    {empleado.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!empleados && (
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
