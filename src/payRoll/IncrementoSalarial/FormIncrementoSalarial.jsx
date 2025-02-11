import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
import { useAlertActions } from "_actions";
export { FormIncrementoSalarial };
const categorias = [
  { id: 1, label: "Gerencia" },
  { id: 2, label: "Jefes de Área" },
  { id: 3, label: "Analistas" },
  { id: 4, label: "Asistentes/Operadores" },
];
function FormIncrementoSalarial() {
  const auth = useRecoilValue(authAtom);
  const token = auth?.token;
  const baseUrl = `${process.env.REACT_APP_API_URL}/IncrementoSalarials`;
  const [categoriasSeleccinadas, setCategoriasSeleccinadas] = useState([]);
  const [cuerpo, setCuerpo] = useState({
    EmpresaId: "1",
    porcentaje: 0,
    categorias: [],
    fechaTrabajar: "",
    fechaEfectuar: "",
  });
  const alertActions = useAlertActions();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = e.target.type === "checkbox" ? checked : value;
    setCuerpo({
      ...cuerpo,
      [name]: newValue,
      categorias: categoriasSeleccinadas,
    });
    //console.log(cuerpo);
    //console.log(categoriasSeleccinadas);
  };
  const handleCheckboxChange = (e) => {
    const id = parseInt(e.target.value, 10);
    const isChecked = e.target.checked;
    if (isChecked) {
      setCategoriasSeleccinadas([...categoriasSeleccinadas, id]);
    } else {
      setCategoriasSeleccinadas(
        categoriasSeleccinadas.filter((catId) => catId !== id)
      );
    }
    setCuerpo({
      ...cuerpo,
      categorias: categoriasSeleccinadas,
    });
    //console.log(categoriasSeleccinadas);
  };
  const postCuerpo = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(baseUrl, cuerpo, {
        headers: {
          Authorization: `Bearer ${token}`, // Añade el token al encabezado de autorización
        },
        ContentType: "application/json",
        responseType: "arraybuffer", // important
      })
      .then(() => {
        alertActions.success("Incremento Salarial Procesado");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
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
              <Form.Label>Porcentaje de Incremento Salarial</Form.Label>
              <Form.Control
                type="text"
                value={cuerpo.porcentaje}
                onChange={handleChange}
                name="porcentaje"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="my-1">
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Label>Categorias de Sueldo</Form.Label>
              {categorias.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  id={`checkbox-${cat.id}`}
                  label={cat.label}
                  value={cat.id}
                  checked={categoriasSeleccinadas.includes(cat.id)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Fecha a Trabajar</Form.Label>
              <Form.Control
                type="date"
                value={cuerpo.fechaTrabajar}
                onChange={handleChange}
                name="fechaTrabajar"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicFechaFin">
              <Form.Label>Fecha a Efectuar</Form.Label>
              <Form.Control
                type="date"
                value={cuerpo.fechaEfectuar}
                onChange={handleChange}
                name="fechaEfectuar"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" onClick={postCuerpo} disabled={isLoading}>
              {isLoading ? "Procesando..." : "Procesar"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
