import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table, Card, Row, Col, ListGroup } from "react-bootstrap";
import client, { getCargoQuery } from "../../grafql/graphql";

export { VerCargos };
function VerCargos({ history, match }) {
  const { id } = match.params;
  const [dato, setDato] = useState({
    id: 0,
    objetivo: "",
    ciudad: { nombre: "" },
    tipoCargo: { nombre: "" },
    area: {
      objetivo: "",
      tipoArea: {
        nombre: "",
      },
    },
    contratos: [],
  });
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    async function getData() {
      const result = await client.query(getCargoQuery(id));
      setDato(result.data.cargo);
      setContratos(result.data.cargo.contratos);
      console.log(result.data.cargo);
      console.log(result.data.cargo.contratos);
    }
    getData();
  }, [id]);
  const loading = !dato;
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  }

  return (
    <>
      {!loading && (
        <Row>
          <Col sm={4}>
            <Row>
              <Card>
                <Card.Header>{dato.tipoCargo.nombre}</Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item>Objetivo: {dato.objetivo}</ListGroup.Item>
                  <ListGroup.Item>Área : {dato.area.objetivo}</ListGroup.Item>
                  <ListGroup.Item>
                    Tipo Área : {dato.area.tipoArea.nombre}
                  </ListGroup.Item>
                  <ListGroup.Item>Ciudad: {dato.ciudad.nombre}</ListGroup.Item>
                </ListGroup>
              </Card>
            </Row>
            <Row>
              <Col>
                <Link
                  to="/obtenerCargos"
                  className="btn btn-link btn-icon animate__animated animate__bounceInLeft"
                >
                  <i className="bi bi-arrow-left"></i> Volver
                </Link>
              </Col>
              <Col>
              </Col>
            </Row>
          </Col>
          <Col sm={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "4.28%" }}>#</th>
                  <th style={{ width: "14.28%" }}>Cod Empleado</th>
                  <th style={{ width: "14.28%" }}>Empleado</th>
                  <th style={{ width: "14.28%" }}>Tipo Contrato</th>
                  <th style={{ width: "14.28%" }}>Fecha Inicio</th>
                  <th style={{ width: "14.28%" }}>Fecha Fin</th>
                  <th style={{ width: "14.28%" }}>Horas</th>
                </tr>
              </thead>
              <tbody>
                {contratos?.map((contrato, index) => (
                  <tr key={contrato.id}>
                    <td>{index + 1}</td>
                    <td>{contrato.empleado.codigoEmpleado}</td>
                    <td>
                      {contrato.empleado.persona.nombre}{" "}
                      {contrato.empleado.persona.apellidoPaterno}{" "}
                      {contrato.empleado.persona.apellidoMaterno}
                    </td>
                    <td>{contrato.tipoContrato.nombre}</td>
                    <td>{formatDate(contrato.fechaInicio)}</td>
                    <td>{formatDate(contrato.fechaFin)}</td>
                    <td>{contrato.horas}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </>
  );
}
