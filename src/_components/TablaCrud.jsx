import React, { useState } from "react";
import { Modal, Button, ButtonGroup } from "react-bootstrap";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

function TablaCrud({ data, columns, datos, url, path, handleClick }) {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  // Define a new column for the index
  const indexColumn = {
    header: "#",
    cell: (info) => info.row.index + 1, // 1-based index
    id: "index",
  };

  // Add the index column to the columns array
  const columnsWithIndex = [indexColumn, ...columns];

  const table = useReactTable({
    data,
    columns: columnsWithIndex,
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
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Buscar"
        className="custom-input"
      />
      <div className="table-responsive">
        <table className="table-striped">
          <thead>
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
                <th>Acción</th>
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
                    <Link
                      to={
                        datos && datos[row.id]
                          ? `${path}/edit/${datos[row.id].id}`
                          : "#"
                      }
                      className="btn btn-sm btn-primary mr-1"
                    >
                      EDITAR
                    </Link>
                    <Button
                      onClick={() => handleClick(datos[row.id].id)}
                      className="btn btn-sm btn-danger mr-1"
                    >
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 10 && (
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
            <Button
              variant="outline-secondary"
              onClick={() => table.nextPage()}
            >
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
      )}
    </div>
  );
}

export default TablaCrud;
