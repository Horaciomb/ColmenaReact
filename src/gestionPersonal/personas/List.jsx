import {  useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { personasAtom } from "_state";
import { useUserActions } from "_actions";
//import client, { GET_PERSONAS_QUERY } from "../../grafql/graphql";
export { List };

function List({ match }) {
  const { path } = match;
  //const [datos, setDatos] = useState(null);
  const personas = useRecoilValue(personasAtom);
  const userActions = useUserActions();

  useEffect(() => {
    userActions.getPersonas();

    return userActions.resetPersonas;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /*useEffect(() => {
    async function getData() {
      const result = await client.query({ query: GET_PERSONAS_QUERY });
      setDatos(result.data.personas);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }
  return (
    <div>
      <h1>Gestionar Personas</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Persona
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
              <th style={{ width: "20%" }}>Nombre</th>
              <th style={{ width: "20%" }}>Apellidos</th>
              <th style={{ width: "10%" }}>CI</th>
              <th style={{ width: "10%" }}>Estado Civil</th>
              <th style={{ width: "10%" }}>Genero</th>
              <th style={{ width: "20%" }}>Fecha Nacimiento</th>
              <th style={{ width: "10%" }}>Departamento</th>
              <th style={{ width: "20%" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {personas?.map((persona,index) => (
              <tr key={persona.id}>
                <td>{index + 1}</td>
                <td>{persona.nombre}</td>
                <td>
                  {persona.apellidoPaterno} {persona.apellidoMaterno}
                </td>
                <td>{persona.carnetIdentidad}</td>
                <td>{persona.estadoCivil.nombre}</td>
                <td>{persona.genero.nombre}</td>
                <td>{formatDate(persona.fechaNac)}</td>
                <td>{persona.divisionPolitica.nombre}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    to={`${path}/edit/${persona.id}`}
                    className="btn btn-sm btn-primary mr-1"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => {
                      userActions.deletePersona(persona.id);
                    }}
                    className="btn btn-sm btn-danger"
                    style={{ width: "70px" }}
                    disabled={persona.isDeleting}
                  >
                    {persona.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Eliminar</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
            {!personas && (
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
