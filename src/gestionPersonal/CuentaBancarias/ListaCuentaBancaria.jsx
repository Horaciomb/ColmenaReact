import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaCrud from "_components/TablaCrud";
import { useUserActions } from "_actions";
import client, { GET_CUENTAS_BANCARIAS_QUERY } from "../../grafql/graphql";
export { ListaCuentaBancaria };
function ListaCuentaBancaria({ match }) {
  const { path } = match;
  const userActions = useUserActions();
  const [datos, setDatos] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await client.query({
          query: GET_CUENTAS_BANCARIAS_QUERY,
          fetchPolicy: "network-only",
        });
        setDatos(result.data.cuentasBancarias);
        setData(transformarDatos(result.data.cuentasBancarias));
      } catch (error) {
        console.error("Error fetching data:", error);
        setDatos([]);
      }
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      persona: `${item.persona.nombre} ${item.persona.apellidoPaterno} ${item.persona.apellidoMaterno}`,
      banco: `${item.banco.nombre} - ${item.banco.descripcion}`,
      divisionPolitica: `${item.divisionPolitica.nombre} - ${item.divisionPolitica.pais.nombre}`,
      tipoCuenta: item.tipoCuenta.nombre,
      nroCuenta: item.nroCuenta,
    }));
  }
  const columns = [
    {
      header: "Persona",
      accessorKey: "persona",
    },
    {
      header: "Banco",
      accessorKey: "banco",
    },
    {
      header: "Departamento",
      accessorKey: "divisionPolitica",
    },
    {
      header: "Tipo de Cuenta",
      accessorKey: "tipoCuenta",
    },
    {
      header: "Nro Cuenta",
      accessorKey: "nroCuenta",
    },
  ];

  const handleDelete = async (id) => {
    try {
      await userActions.deleteCuentaBancariaNoUpdate(id);
      // Después de eliminar, actualizar los datos en el estado
      const updatedDatos = datos.filter(item => item.id !== id);
      setDatos(updatedDatos);
      setData(transformarDatos(updatedDatos));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  return (
    <div>
      <h1>Asignar Cuenta Bancaria </h1>
      <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">
        Asignar Cuenta Bancaria
      </Link>
      <TablaCrud
        data={data}
        columns={columns}
        datos={datos}
        path={path}
        handleClick={handleDelete}
      />
    </div>
  );
}
