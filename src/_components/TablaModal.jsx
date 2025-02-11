import React, { useState } from "react";
import { Button, ButtonGroup} from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
function TablaModal({ data, columns, datos, handleClick }) {
    console.log(data,columns,datos);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });
  return (
    <div>
      {" "}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Buscar"
        className="custom-input"
      />
      <div >
        <table className="table table-striped ">
          <thead>
            <tr></tr>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "⬆️", desc: "⬇️" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </div>
                  </th>
                ))}
                <th>Acción </th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td style={{ whiteSpace: "nowrap" }}>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      onClick={() => handleClick(datos[row.id])}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button> 
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container-buttons">
        <ButtonGroup aria-label="Basic example">
          <Button
            variant="outline-secondary"
            onClick={() => table.setPageIndex(0)}
          >
            Primera
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => table.previousPage()}
          >
            Anterior
          </Button>
          <Button variant="outline-secondary" onClick={() => table.nextPage()}>
            Siguiente
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Última
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default TablaModal;
