import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import TablaCrud from "_components/TablaCrud";
import { DatosContactosAtom } from "_state";
import { useUserActions } from "_actions";
export { ListaDatosContacto };
function ListaDatosContacto({ match }) {
  const { path } = match;
  const datosContactos = useRecoilValue(DatosContactosAtom);
  const [data, setData] = useState([]);
  const userActions = useUserActions();
  useEffect(() => {
    if (datosContactos) {
      const datosTransformados = transformarDatos(datosContactos);
      setData(datosTransformados);
    }
  }, [datosContactos]);
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      persona: `${item.persona.nombre} ${item.persona.apellidoPaterno} ${item.persona.apellidoMaterno}`,
      localidad: item.localidad,
      domicilio: item.domicilio,
      telefono: item.telefono,
      correo: item.correo,
      divisionPolitica: item.divisionPolitica ? item.divisionPolitica.nombre : "",
    }));
  }

  const columns = [
    {
      header: "Persona",
      accessorKey: "persona",
    },
    {
      header: "Localidad",
      accessorKey: "localidad",
    },
    {
      header: "Domicilio",
      accessorKey: "domicilio",
    },
    {
      header: "Teléfono",
      accessorKey: "telefono",
    },
    {
      header: "Correo",
      accessorKey: "correo",
    },
    {
      header: "Departamento",
      accessorKey: "divisionPolitica",
    },
  ];

  const handleClick = (id) => {
    return userActions.deleteDatosContacto(id);
  };
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
      <TablaCrud
        data={data}
        columns={columns}
        datos={datosContactos}
        path={path}
        handleClick={handleClick}
      />
    </div>
  );
}
