import React, { useState, useEffect } from "react";
import {  Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
function FormPagoPrimas() {
  const auth = useRecoilValue(authAtom);
  const token = auth?.token;
  const baseUrl = `${process.env.REACT_APP_API_URL}/PagoPrimas/PagoPrimaEmpresaExcel`;
  const apiUrl = `${process.env.REACT_APP_API_URL}/Prima`;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    ano: (today.getFullYear() - 1).toString(),
  });
  const [primas, setPrimas] = useState([]);
  const [porcentaje, setPorcentaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //const [año, setAño] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuerpo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const getPrimaByEmpresa = async (empresaId) => {
    const url = `${apiUrl}/empresa/${empresaId}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
      },
    });
    return response.data;
  };
  const decimalToPercentage = (decimalValue) => {
    const percentageValue = Math.round(decimalValue * 100);
    return `${percentageValue}%`;
  };

  const postCuerpo = async (e) => {
    e.preventDefault();
    if (porcentaje === "No existe prima para el año seleccionado.") {
      alert("No existe prima para el año seleccionado.");
    } else {
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
          `Pago de Primas Banca de Talentos S.R.L ${cuerpo.ano}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.log("Error fetching data", err);
      } finally {
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    async function fetchPrima() {
      const empresaId = 1;
      const result = await getPrimaByEmpresa(empresaId);
      setPrimas(result);
    }
    fetchPrima();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const anoInt = parseInt(cuerpo.ano, 10);
    const primaEncontrada = primas.find((prima) => prima.anio === anoInt);
    if (primaEncontrada) {
      const porcentaje = primaEncontrada.porcentaje;
      setPorcentaje(porcentaje);
    } else {
      setPorcentaje("No existe prima para el año seleccionado.");
    }
  }, [cuerpo.ano, primas]);

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
            <Form.Group className="mb-3">
              <Form.Label>Porcentaje de Pago de Prima</Form.Label>
              <Form.Control
                placeholder={decimalToPercentage(porcentaje)}
                disabled
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

export default FormPagoPrimas;
