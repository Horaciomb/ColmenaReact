import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, { GET_DIVISIONES_POLITICAS_QUERY } from "../../grafql/graphql";
import { InstitucionAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditInstitucion };
function AddEditInstitucion({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(InstitucionAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [departamentos, setDepartamentos] = useState(null);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
    id: "",
    nombre: "",
    pais: {
      nombre: "",
    },
  });
  const seleccionarDepartamento = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    setShow(false);
    console.log(departamentoSeleccionado);
  };
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_DIVISIONES_POLITICAS_QUERY,
      });
      setDepartamentos(result.data.divisionesPoliticas);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    descripcion: Yup.string().required("Descripción es requerido"),
    divisionPoliticaId: Yup.string().required("Departamento es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getInstitucionById(id);
    }

    return userActions.resetInstitucion;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
      const divisionesPoliticas = aporte.divisionPolitica;
      const departamento = {
        id: divisionesPoliticas.id,
        nombre: divisionesPoliticas.nombre,
        pais: { nombre: divisionesPoliticas.pais.nombre },
      };
      setDepartamentoSeleccionado(departamento);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, aporte]);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && aporte) {
      reset(aporte);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  function onSubmit(data) {
    return mode.add ? createPersona(data) : updatePersona(aporte.id, data);
  }
  async function createPersona(data) {
    console.log(data);
    try {
      await userActions.registrarInstitucion(data);
      history.push("/gestionarInstitucion");
      alertActions.success("Institución añadida");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear la Institución");
    }
  }

  async function updatePersona(id, data) {
    await userActions.updateInstitucion(id, data);
    history.push("/gestionarInstitucion");
    alertActions.success("Institución actualizada");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setDepartamentoSeleccionado({
      id: "",
      nombre: "",
      pais: {
        nombre: "",
      },
    });
  };

  const loading = mode.edit && !aporte;
  const divisionPoliticaId = departamentoSeleccionado?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Institución" : "Editar Institución"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  name="nombre"
                  type="text"
                  {...register("nombre")}
                  className={`form-control ${
                    errors.nombre ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.nombre?.message}</div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="descripcion"
                  type="text"
                  {...register("descripcion")}
                  className={`form-control ${
                    errors.descripcion ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.descripcion?.message}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Departamento</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="divisionPoliticaId"
                      type="text"
                      value={`${departamentoSeleccionado.nombre} - ${departamentoSeleccionado.pais.nombre}`}
                      {...register("divisionPoliticaId", {
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
                    <Button variant="info" onClick={handleShow}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <div className="form-group">
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="btn btn-primary mr-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Guardar
            </button>
            <button
              onClick={handleLimpiar}
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Resetear
            </button>
            <Link to="/gestionarInstitucion" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </Form>
      )}
      {loading && (
        <div className="text-center p-3">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
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
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
