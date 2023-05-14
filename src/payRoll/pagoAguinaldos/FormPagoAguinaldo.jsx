import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
function FormPagoAguinaldo() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/PagoAguinaldo/PagoAguinaldoEmpresaExcel`;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    DobleAguinaldo: false,
    ano: today.getFullYear().toString(),
  });
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    setCuerpo({
      ...cuerpo,
      [name]: newValue,
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
          `Aguinaldos Banca de Talentos S.R.L ${cuerpo.ano}.xlsx`
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
          <Col className="my-1">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Doble Aguinaldo</Form.Label>
              <Form.Check
                type="checkbox"
                label="Aplicar"
                checked={cuerpo.DobleAguinaldo}
                onChange={handleChange}
                name="DobleAguinaldo"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
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

export default FormPagoAguinaldo;
