import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Collapse, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TablaMapagrama, BotonMapagrama } from ".";
export { FormMapagrama };
function FormMapagrama({ idEmpresa }) {
  const [open, setOpen] = useState(false);
  const baseUrl = `${process.env.REACT_APP_API_URL}/Mapagramas/MapagramaEmpresa`;
  const today = dayjs();
  const fecha = today.format("YYYY-MM-DD");

  const [tablaRepMapagrama, setTablaRepMapagrama] = useState([]);
  const [cuerpo, setCuerpo] = useState({
    empresaId: idEmpresa,
    fecha: fecha,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuerpo({
      ...cuerpo,
      [name]: value,
    });
    console.log(cuerpo);
  };
  // form validation rules
  const validationSchema = Yup.object().shape({
    divisionPoliticaId: Yup.string().required("División Política es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { formState } = useForm(formOptions);
  const { errors } = formState;
  const postCuerpo = (e) => {
    e.preventDefault();
    //console.log(baseUrl, cuerpo);
    axios
      .post(baseUrl, cuerpo)
      .then((response) => {
        console.log(response.data);
        setTablaRepMapagrama(response.data.rolResponsabilidades);
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Empresa seleccionada</Form.Label>
                <Form.Control placeholder="Banca de Talentos S.R.L" disabled />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Fecha</label>
              <input
                name="fecha"
                type="date"
                value={cuerpo.fecha}
                className="form-control"
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.fecha?.message}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="form-group">
                <Button variant="primary" className="shadow" onClick={postCuerpo}>
                  Generar
                </Button>
                <Link to="/gestionOrganizacion" className="btn btn-link">
                  Cancelar
                </Link>
              </div>
            </Col>
          </Row>
        </form>
      </div>
      <Collapse in={open}>
        <div>
          <Row>
            <Col>
              <BotonMapagrama datos={tablaRepMapagrama} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <TablaMapagrama datos={tablaRepMapagrama} />
            </Col>
          </Row>
        </div>
      </Collapse>
    </>
  );
}
