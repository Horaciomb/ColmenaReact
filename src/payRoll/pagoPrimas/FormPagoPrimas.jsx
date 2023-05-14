import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
function FormPagoPrimas() {
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
    const response = await axios.get(url);
    return response.data;
  };
  const decimalToPercentage = (decimalValue) => {
    const percentageValue = Math.round(decimalValue * 100);
    return `${percentageValue}%`;
  };

  const postCuerpo = (e) => {
    e.preventDefault();
    if (porcentaje === "No existe prima para el año seleccionado.") {
      alert("No existe prima para el año seleccionado.");
    } else {
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
            `Pago de Primas Banca de Talentos S.R.L ${cuerpo.ano}.xlsx`
          );
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => console.log(err));
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
      <Form>
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
            <Button variant="success" onClick={postCuerpo}>
              Imprimir
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormPagoPrimas;
