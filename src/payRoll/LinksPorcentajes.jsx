import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
function LinksPorcentajes() {
  return (
    <ListGroup>
      <ListGroup.Item action href="/gestionarPrimas">
        Gestionar Primas
      </ListGroup.Item>
      <ListGroup.Item action href="/gestionarNovedades">
        Gestionar Novedades
      </ListGroup.Item>
      <ListGroup.Item action href="/procesarIncrementoSalarial">
        Procesar Incremento Salarial
      </ListGroup.Item>
    </ListGroup>
  );
}

export default LinksPorcentajes;
