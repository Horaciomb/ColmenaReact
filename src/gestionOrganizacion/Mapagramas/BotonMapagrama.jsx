import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import XLSX from "xlsx-js-style";
export { BotonMapagrama };
function BotonMapagrama({ datos }) {
  const [loading, setLoading] = useState(false);
  const [mapagrama, setMapagrama] = useState([
    ["", "", "", ""], // Estrategia - Alta Gerencia
    ["", "", "", ""], // Core/Operaciones - Mandos Medios
    ["", "", "", ""], // Soporte - Técnico Analítico
    ["", "", "", ""], // Control - Operativo
  ]);

  useEffect(() => {
    if (datos.length > 0) {
      for (let i = 0; i < Math.min(4, datos.length); i++) {
        const rol = datos[i].responsabilidadesCargos;
        if (rol && rol.length > 0) {
          rol.slice(0, 4).forEach((responsabilidad, index) => {
            const cargos = responsabilidad.cargos || [];
            if (cargos.length > 0) {
              agregarCargo(i, index, cargos);
            }
          });
        }
      }
    }
  }, [datos]);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      creandoArchivo(mapagrama);
      setLoading(false);
    }, 1000);
  };

  const creandoArchivo = (mapagrama) => {
    const wb = XLSX.utils.book_new();

    const ws_data = [
      ["", "Estrategia", "Core/Operaciones", "Soporte", "Control"],
      ["Alta Gerencia", ...mapagrama[0]],
      ["Mandos Medios", ...mapagrama[1]],
      ["Técnico Analítico", ...mapagrama[2]],
      ["Operativo", ...mapagrama[3]],
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    // Establecer estilos
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = { r: R, c: C };
        const cellRef = XLSX.utils.encode_cell(cellAddress);

        // Establecer borde a todas las celdas
        ws[cellRef].s = {
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
          // Habilitar wrapText a todas las celdas
          wrapText: true,
        };

        // Aplicar estilo a las cabeceras (primera fila)
        if (R === range.s.r) {
          ws[cellRef].s.fill = { fgColor: { rgb: "FFFF00" } }; // Color amarillo
          ws[cellRef].s.font = { bold: true }; // Negrita
        }
      }
    }
    XLSX.utils.book_append_sheet(wb, ws, "Mapagrama");

    XLSX.writeFile(wb, "Mapagrama.xlsx");
  };

  const agregarCargo = (rolIndex, responsabilidadIndex, cargos) => {
    setMapagrama((prevMapagrama) => {
      const nuevoMapagrama = [...prevMapagrama];
      const listaDeCargos = cargos.map(
        (cargo, index) => `${cargo.nombre} - ${cargo.area.nombre}`
      );
      nuevoMapagrama[rolIndex][responsabilidadIndex] = listaDeCargos.join("\n");
      return nuevoMapagrama;
    });
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
