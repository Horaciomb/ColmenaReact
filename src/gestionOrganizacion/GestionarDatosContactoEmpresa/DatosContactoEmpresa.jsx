import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Row, Col, Modal, Button } from "react-bootstrap";
import { DatosContactoEmpresaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, { GET_DIVISIONES_POLITICAS_QUERY } from "../../grafql/graphql";
import dayjs from "dayjs";
export { DatosContactoEmpresa };
function DatosContactoEmpresa({ idEmpresa }) {
  const userActions = useUserActions();
  const [dato, setDato] = useState({
    id: "",
    localidad: "",
    domicilio: "",
    fechaInicio: "",
    fechaFin: "",
    telefono: "",
    correo: "",
    divisionPoliticaId: "",
    empresaId: "",
  });
  // Departamento
  const [departamentos, setDepartamentos] = useState(null);
  const [showDepartamento, setShowDepartamento] = useState(false);
  const handleCloseDepartamento = () => setShowDepartamento(false);
  const handleShowDepartamento = () => setShowDepartamento(true);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
    id: "",
    nombre: "",
    pais: {
      id: "",
      nombre: "",
    },
  });
  const seleccionarDepartamento = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    setShowDepartamento(false);
  };
  const divisionPoliticaId = departamentoSeleccionado?.id || "";
  const alertActions = useAlertActions();
  const datoContacto = useRecoilValue(DatosContactoEmpresaAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    divisionPoliticaId: Yup.string().required("División Política es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode

    userActions.getDatosContactoEmpresaById(idEmpresa);
    return userActions.resetDatosContactoEmpresa;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_DIVISIONES_POLITICAS_QUERY,
      });
      setDepartamentos(result.data.divisionesPoliticas);
      console.log(result.data.divisionesPoliticas);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (datoContacto) {
      // Preprocesa las fechas utilizando dayjs y asegúrate de que estén en el formato correcto
      const processedFechaInicio = dayjs(datoContacto.fechaInicio).format(
        "YYYY-MM-DD"
      );
      const processedFechaFin = dayjs(datoContacto.fechaFin).format(
        "YYYY-MM-DD"
      );
      // Set departamentos
      setDepartamentoSeleccionado(datoContacto.divisionPolitica);
      console.log(datoContacto.divisionPolitica);
      // Asigna los valores procesados a los campos de fecha
      reset({
        ...datoContacto,
        fechaInicio: processedFechaInicio,
        fechaFin: processedFechaFin,
      });
      console.log(datoContacto);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [datoContacto]);
  function onSubmit(data) {
    return updateAporte(idEmpresa, data);
  }
  async function updateAporte(id, data) {
    await userActions.updateDatosContactoEmpresa(id, data);
    alertActions.success("Datos Contacto de Empresa actualizado");
  }
  const loading = !dato;
  return (
    <>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <label>Localidad</label>
              <input
                name="localidad"
                type="text"
                {...register("localidad")}
                className={`form-control ${
                  errors.localidad ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.localidad?.message}
              </div>
            </Col>
            <Col>
              <label>Domicilio</label>
              <input
                name="domicilio"
                type="text"
                {...register("domicilio")}
                className={`form-control ${
                  errors.domicilio ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.domicilio?.message}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Fecha Inicial</label>
              <input
                name="fechaInicio"
                type="date"
                {...register("fechaInicio")}
                className={`form-control ${
                  errors.fechaInicio ? "is-invalid" : ""
                }`}
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
                {...register("fechaFin")}
                className={`form-control ${
                  errors.fechaFin ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.fechaFin?.message}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Correo</label>
              <input
                name="correo"
                type="text"
                {...register("correo")}
                className={`form-control ${errors.correo ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.correo?.message}</div>
            </Col>
            <Col>
              <label>Teléfono</label>
              <input
                name="telefono"
                type="text"
                {...register("telefono")}
                className={`form-control ${
                  errors.telefono ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.telefono?.message}</div>
            </Col>
          </Row>
          <Row>
            <Col>
            <label>Departamento</label>
            <Row>
              <Col sm={10}>
                <input
                  disabled
                  name="divisionPoliticaId"
                  type="text"
                  value={
                    departamentoSeleccionado.nombre
                      ? `${departamentoSeleccionado.nombre} - ${departamentoSeleccionado.pais.nombre}`
                      : "-"
                  }{...register("divisionPoliticaId", {
                    value: divisionPoliticaId,
                  })}
                  className={`form-control ${
                    errors.divisionPoliticaId &&
                    departamentoSeleccionado.id === ""
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.divisionPoliticaId?.message}
                </div>
              </Col>
              <Col sm={1}>
                <Button variant="info" onClick={handleShowDepartamento}>
                  Buscar
                </Button>
              </Col>
            </Row>
            </Col>
          </Row>
          <br />
          <div className="form-group">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mr-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Guardar
            </button>
            <Link to="/gestionOrganizacion" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </form>
      )}
      <Modal show={showDepartamento} onHide={handleCloseDepartamento}>
        <Modal.Header>
          <Modal.Title>Buscar Departamento</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Nombre</th>
                <th style={{ width: "40%" }}>Pais</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {departamentos
                ?.slice()
                .sort((a, b) => {
                  if (a.pais.nombre < b.pais.nombre) {
                    return -1;
                  }
                  if (a.pais.nombre > b.pais.nombre) {
                    return 1;
                  }
                  if (a.nombre < b.nombre) {
                    return -1;
                  }
                  if (a.nombre > b.nombre) {
                    return 1;
                  }
                  return 0;
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.pais.nombre}</td>
                    <td>
                      <Button
                        onClick={() => seleccionarDepartamento(item)}
                        className="btn btn-sm btn-succes"
                      >
                        Seleccionar
                      </Button>
                    </td>
                  </tr>
                ))}
              {!departamentos && (
                <tr>
                  <td colSpan="4" className="text-center">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseDepartamento}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
