import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import XLSX from "xlsx-js-style";
export { BotonRepCenCos };

function BotonRepCenCos({ datos }) {
  const [loading, setLoading] = useState(false);
  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      creandoArchivo(datos);
      setLoading(false);
    }, 1000);
  };
  const creandoArchivo = (datos) => {
    const wb = XLSX.utils.book_new();

    const encabezado = [
      "Centro de Costo",
      "Descripción",
      "Presupuesto Asignado",
      "Contratos Asociados",
      "Ingresos Operativos",
      "Gastos Financieros",
      "Indicadores de Rendimiento",
    ];

    const filas = datos.map((centroCostoInfo) => [
      {
        v: centroCostoInfo.centroCosto.nombre,
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        v: centroCostoInfo.centroCosto.descripcion,
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        v: centroCostoInfo.centroCosto.presupuestoAsignado,
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        v: centroCostoInfo.contratosAsociados,
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        v: centroCostoInfo.ingresosOperativos + " Bs.",
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        v: centroCostoInfo.gastosFinancieros + " Bs.",
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
      {
        v: centroCostoInfo.indicadoresRendimiento + " Bs.",
        s: {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      },
    ]);

    filas.unshift(
      encabezado.map((texto) => ({
        v: texto,
        s: {
          font: { bold: true, color: { rgb: "000000" } },
          fill: { fgColor: { rgb: "FFFF00" } },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        },
      }))
    );

    const ws = XLSX.utils.aoa_to_sheet(filas);
    // Establecer ancho de columnas a 35 píxeles
    ws["!cols"] = Array(encabezado.length).fill({ wch: 25 });

    XLSX.utils.book_append_sheet(wb, ws, "ReporteCentrosCosto");
    XLSX.writeFile(wb, "Reporte_Centros_Costo_.xlsx");
  };

  return (
    <>
      {!loading ? (
        <Button variant="success" onClick={handleDownload} className="shadow">
          Exportar a Excel
        </Button>
      ) : (
        <Button variant="success" disabled className="shadow">
          <Spinner size="sm" />
          <span> Generando...</span>
        </Button>
      )}
    </>
  );
}
