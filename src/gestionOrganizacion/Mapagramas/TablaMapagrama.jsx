import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

export { TablaMapagrama };
function TablaMapagrama({ datos }) {
  const [mapagrama, setMapagrama] = useState([
    ["", "", "", ""], // Estrategia - Alta Gerencia
    ["", "", "", ""], // Core/Operaciones - Mandos Medios
    ["", "", "", ""], // Soporte - Técnico Alítico
    ["", "", "", ""], // Control - Operativo
  ]);

  // Función para agregar un cargo al mapagrama
  const agregarCargo = (rolIndex, responsabilidadIndex, cargos) => {
    setMapagrama((prevMapagrama) => {
      const nuevoMapagrama = [...prevMapagrama];

      const listaDeCargos = cargos.map((cargo, index) => (
        <li key={cargo.id}>
          <span>{cargo.nombre}</span> -{" "}
          <span className="cursiva">{cargo.area.nombre}</span>
        </li>
      ));

      if (!nuevoMapagrama[rolIndex]) {
        nuevoMapagrama[rolIndex] = [];
      }

      if (!nuevoMapagrama[rolIndex][responsabilidadIndex]) {
        nuevoMapagrama[rolIndex][responsabilidadIndex] = [];
      }

      nuevoMapagrama[rolIndex][responsabilidadIndex] = (
        <ul
          className="lista-cargos"
          key={`ul-${rolIndex}-${responsabilidadIndex}`}
        >
          {listaDeCargos}
        </ul>
      );

      return nuevoMapagrama;
    });
  };
  //setDatosApi(datos);
  useEffect(() => {
    if (datos.length > 0) {
      for (let i = 0; i < Math.min(4, datos.length); i++) {
        const rol = datos[i].responsabilidadesCargos;
        //console.log("Rol= " + datos[i].rolMapagrama.nombre);
        if (rol && rol.length > 0) {
          rol.slice(0, 4).forEach((responsabilidad, index) => {
            const cargos = responsabilidad.cargos || [];
            // const nombreResponsabilidad =
            //   responsabilidad.responsabilidadMapagrama.nombre;
            //console.log(`Responsabilidad ${index + 1}: ${nombreResponsabilidad}` );
            if (cargos.length > 0) {
              //console.log("Cargos:");
              agregarCargo(i, index, cargos);
              cargos.forEach((cargo) => {
                //console.log(`- ${cargo.nombre}`);
              });
            } else {
              //console.log("No hay cargos asociados.");
            }
          });
        }
      }
    }
  }, [datos]);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>Estrategia</th>
          <th>Core/Operaciones</th>
          <th>Soporte</th>
          <th>Control</th>
        </tr>
      </thead>
      <tbody>
        {mapagrama.map((rol, rolIndex) => (
          <tr key={rolIndex}>
            <td>
              {
                [
                  "Alta Gerencia",
                  "Mandos Medios",
                  "Técnico Analítico",
                  "Operativo",
                ][rolIndex]
              }
            </td>
            {rol.map((cargo, index) => (
              <td key={index}>{cargo}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
