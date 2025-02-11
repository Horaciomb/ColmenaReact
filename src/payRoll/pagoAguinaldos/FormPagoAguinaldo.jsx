import React, { useState } from "react";
import {  Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
function FormPagoAguinaldo() {
  const auth = useRecoilValue(authAtom);
  const token = auth?.token;
  const baseUrl = `${process.env.REACT_APP_API_URL}/PagoAguinaldo/PagoAguinaldoEmpresaExcel`;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    DobleAguinaldo: false,
    ano: today.getFullYear().toString(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    setCuerpo({
      ...cuerpo,
      [name]: newValue,
    });
    //console.log(cuerpo);
  };
  const postCuerpo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(baseUrl, cuerpo, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
        },
        responseType: "arraybuffer", // Importante
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Aguinaldos Banca de Talentos S.R.L ${cuerpo.ano}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log("Error fetching data", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Form onSubmit={postCuerpo}>
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
            <Button type="submit" variant="success" disabled={isLoading}>
              {isLoading ? "Cargando..." : "Imprimir"}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormPagoAguinaldo;
