import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Collapse, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TablaReporteCenCos, BotonRepCenCos } from ".";

export { FormRepCenCos };
function FormRepCenCos({ idEmpresa }) {
  const [open, setOpen] = useState(false);
  const baseUrl = `${process.env.REACT_APP_API_URL}/ReporteCentroCostos/ReporteCenCosEmpresa`;
  const today = dayjs();
  const fechaFinDefault = today.format("YYYY-MM-DD");
  const fechaInicioDefault = today.subtract(1, "month").format("YYYY-MM-DD");

  const [tablaRepCenCos, setTablaRepCenCos] = useState([]);
  const [cuerpo, setCuerpo] = useState({
    empresaId: idEmpresa,
    fechaInicio: fechaInicioDefault,
    fechaFin: fechaFinDefault,
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
        // console.log(response.data.reportesCentroCostoRes);
        setTablaRepCenCos(response.data.reportesCentroCostoRes);
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
              <label>Fecha Inicial</label>
              <input
                name="fechaInicio"
                type="date"
                value={cuerpo.fechaInicio}
                className="form-control"
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                {errors.fechaInicio?.message}
              </div>
            </Col>
            <Col>
              <label>Fecha Final</label>
              <input
                name="fechaFin"
                type="date"
                className="form-control"
                value={cuerpo.fechaFin}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.fechaFin?.message}</div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div className="form-group">
                <Button variant="primary" onClick={postCuerpo}>
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
              <BotonRepCenCos datos={tablaRepCenCos} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <TablaReporteCenCos datos={tablaRepCenCos} />
            </Col>
          </Row>
        </div>
      </Collapse>
    </>
  );
}
