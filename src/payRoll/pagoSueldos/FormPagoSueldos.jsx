import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

function FormPagoSueldos() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/PagoSueldos/PagoSueldoEmpresaExcel`;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    mes: today.getMonth().toString() ,
    ano: today.getFullYear().toString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuerpo({
      ...cuerpo,
      [name]: value,
    });
    console.log(cuerpo);
  };
  const postCuerpo = (e) => {
    e.preventDefault();
    axios
      .post(baseUrl, cuerpo, {
        method: "GET",
        ContentType: "blob",
        responseType: "arraybuffer", // important
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `Planilla de sueldos Banca de Talentos S.R.L ${cuerpo.mes}_${cuerpo.ano}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Form>
        <Row>
          <Col className="my-1">
            <Form.Group className="mb-3">
              <Form.Label>Empresa seleccionada</Form.Label>
              <Form.Control placeholder="Banca de Talentos S.R.L" disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaInicio">
              <Form.Label>Mes</Form.Label>
              <select
                name="mes"
                className="custom-select mr-sm-2"
                value={cuerpo.mes}
                onChange={handleChange}
              >
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Arbil</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="text"
                value={cuerpo.ano}
                onChange={handleChange}
                name="ano"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" onClick={postCuerpo}>
              Imprimir
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
export default FormPagoSueldos;
