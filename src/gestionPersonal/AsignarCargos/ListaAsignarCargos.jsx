import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud"; 
import { useUserActions } from "_actions";
import client, { GET_CONTRATOS_QUERY } from "../../grafql/graphql"; 
export { ListaAsignarCargos };
function ListaAsignarCargos({ match }) {
  const { path } = match;
  const userActions = useUserActions();
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_CONTRATOS_QUERY,
        fetchPolicy: "network-only",
      });
      setDatos(result.data.contratos);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  useEffect(() => {
    userActions.getContratos();
    return userActions.resetContratos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      header: "#",
      accessorKey: "id",
    },
    {
      header: "Cod Empleado",
      accessorKey: "empleado.codigoEmpleado",
    },
    {
      header: "Empleado",
      accessorKey: "empleado.persona.nombre",
      Cell: (row) => (
        <>
          {row.original.empleado.persona.nombre}{" "}
          {row.original.empleado.persona.apellidoPaterno}{" "}
          {row.original.empleado.persona.apellidoMaterno}
        </>
      ),
    },
    {
      header: "Tipo Contrato",
      accessorKey: "tipoContrato.nombre",
    },
    {
      header: "Fecha Inicio",
      accessorKey: "fechaInicio",
      Cell: (row) => formatDate(row.original.fechaInicio),
    },
    {
      header: "Fecha Fin",
      accessorKey: "fechaFin",
      Cell: (row) => formatDate(row.original.fechaFin),
    },
    {
      header: "Horas",
      accessorKey: "horas",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteContrato2(id);
  };
  return (
    <div>
      <h1>Asignar Cargo </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Asignar Cargo
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
              <th style={{ width: "4.28%" }}>#</th>
              <th style={{ width: "14.28%" }}>Cod Empleado</th>
              <th style={{ width: "14.28%" }}>Empleado</th>
              <th style={{ width: "14.28%" }}>Tipo Contrato</th>
              <th style={{ width: "14.28%" }}>Fecha Inicio</th>
              <th style={{ width: "14.28%" }}>Fecha Fin</th>
              <th style={{ width: "14.28%" }}>Horas</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((contrato, index) => (
              <tr key={contrato.id}>
                <td>{index + 1}</td>
                <td>{contrato.empleado.codigoEmpleado}</td>
                <td>
                  {contrato.empleado.persona.nombre}{" "}
                  {contrato.empleado.persona.apellidoPaterno}{" "}
                  {contrato.empleado.persona.apellidoMaterno}
                </td>
                <td>{contrato.tipoContrato.nombre}</td>
                <td>{formatDate(contrato.fechaInicio)}</td>
                <td>{formatDate(contrato.fechaFin)}</td>
                <td>{contrato.horas}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${contrato.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteContrato2(contrato.id)}
                    className="btn btn-sm btn-danger"
                    disabled={contrato.isDeleting}
                  >
                    {contrato.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!datos && (
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
