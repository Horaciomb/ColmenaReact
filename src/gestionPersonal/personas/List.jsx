import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { personasAtom } from "_state";
import { useUserActions } from "_actions";
//import client, { GET_PERSONAS_QUERY } from "../../grafql/graphql";
export { List };

function List({ match }) {
  const { path } = match;
  //const [datos, setDatos] = useState(null);
  const personas = useRecoilValue(personasAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    if (personas) {
      const datosTransformados = transformarDatos(personas);

      //console.log(datosTransformados);
      setData(datosTransformados);
    }
  }, [personas]);
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
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      apellidoPaterno: item.apellidoPaterno,
      apellidoMaterno: item.apellidoMaterno,
      carnetIdentidad: item.carnetIdentidad,
      estadoCivil: item.estadoCivil ? item.estadoCivil.nombre : "",
      genero: item.genero ? item.genero.nombre : "",
      fechaNac: formatDate(item.fechaNac),
      divisionPolitica: item.divisionPolitica
        ? item.divisionPolitica.nombre
        : "",
    }));
  }
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
    {
      header: "Apellido Paterno",
      accessorKey: "apellidoPaterno",
    },
    {
      header: "Apellido Mateno",
      accessorKey: "apellidoMaterno",
    },
    {
      header: "CI",
      accessorKey: "carnetIdentidad",
    },
    {
      header: "Estado Civil",
      accessorKey: "estadoCivil",
    },
    {
      header: "Género",
      accessorKey: "genero",
    },
    {
      header: "Fecha de Nacimiento",
      accessorKey: "fechaNac",
    },
    {
      header: "Departamento",
      accessorKey: "divisionPolitica",
    },
  ];
  const handleClick = (id) => {
    // Función que deseas pasar al componente hijo
    return userActions.deletePersona(id);
  };
  return (
    <div>
      <h1>Gestionar Personas</h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Agregar Persona
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={personas}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
