import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import { useRecoilValue } from "recoil";
//import { RcivasAtom } from "_state";
import { useUserActions } from "_actions";
import client, { GET_CUENTAS_BANCARIAS_QUERY } from "../../grafql/graphql";
export { ListaCuentaBancaria };
function ListaCuentaBancaria({ match }) {
  const { path } = match;
  const userActions = useUserActions();
  const [datos, setDatos] = useState(null);
  useEffect(() => {
    async function getData() {
      const result = await client.query({ query: GET_CUENTAS_BANCARIAS_QUERY });
      setDatos(result.data.cuentasBancarias);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>Asignar Cuenta Bancaria </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Asignar Cuenta Bancaria
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
              <th style={{ width: "10%" }}>#</th>
              <th style={{ width: "20%" }}>Persona</th>
              <th style={{ width: "20%" }}>Banco</th>
              <th style={{ width: "10%" }}>Departamento</th>
              <th style={{ width: "10%" }}>Tipo de Cuenta</th>
              <th style={{ width: "20%" }}>Nro Cuenta</th>
              <th style={{ width: "10%" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {datos?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>
                  {item.persona.nombre}{" "}
                  {item.persona.apellidoPaterno}{" "}
                  {item.persona.apellidoMaterno}
                </td>
                <td>{item.banco.nombre}{"- "}{item.banco.descripcion}</td>
                <td>{item.divisionPolitica.nombre}{" - "}{item.divisionPolitica.pais.nombre} </td>
                <td>{item.tipoCuenta.nombre}</td>
                <td>{item.nroCuenta}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${item.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => userActions.deleteCuentaBancariaNoUpdate(item.id)}
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
