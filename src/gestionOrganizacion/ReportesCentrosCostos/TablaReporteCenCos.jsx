import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
export { TablaReporteCenCos };
function TablaReporteCenCos({ datos }) {
  const [datosApi, setDatosApi] = useState([
    {
      centroCosto: {
        id: 1,
        nombre: "RRHH",
        descripcion: "Centro de Costos de Recursos Humanos",
        presupuestoAsignado: 6500,
        // ... otros campos
      },
      contratosAsociados: 2,
      gastosFinancieros: 5500,
      indicadoresRendimiento: 1000,
      ingresosOperativos: 6500,
      sueldos: [
        {
          /*...*/
        },
        {
          /*...*/
        },
      ],
    },
    {
      centroCosto: {
        id: 2,
        nombre: "Conta",
        descripcion: "Centro de Costos de Contabilidad",
        presupuestoAsignado: 4020,
        // ... otros campos
      },
      contratosAsociados: 1,
      gastosFinancieros: 4000,
      indicadoresRendimiento: 20,
      ingresosOperativos: 4020,
      sueldos: [
        {
          /*...*/
        },
      ],
    },
    // ... otros centros de costo
  ]);
  //setDatosApi(datos);
  useEffect(() => {
    if (datos.length > 0) {
      setDatosApi(datos);
    }
  }, [datos]);
  return (
    <Table striped bordered hover>
      <thead>
        {/* <tr>
          <th colSpan={7}>Reportes</th>
        </tr> */}
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Presupuesto Asignado</th>
          <th>Contratos Asociados</th>
          <th>Ingresos Operativos</th>
          <th>Gastos Financieros</th>
          <th>Indicadores de Rendimiento</th>
        </tr>
      </thead>
      <tbody>
        {datosApi.map((centroCostoInfo, index) => (
          <tr key={index}>
            <td>{centroCostoInfo.centroCosto.nombre}</td>
            <td>{centroCostoInfo.centroCosto.descripcion}</td>
            <td>{centroCostoInfo.centroCosto.presupuestoAsignado}</td>
            <td>{centroCostoInfo.contratosAsociados}</td>
            <td>{centroCostoInfo.ingresosOperativos} Bs.</td>
            <td>{centroCostoInfo.gastosFinancieros} Bs.</td>
            <td>{centroCostoInfo.indicadoresRendimiento} Bs.</td>

            {/* ... otros campos */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
