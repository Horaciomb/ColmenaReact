import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { DatosContactoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  GET_PERSONAS_QUERY,
  GET_DIVISIONES_POLITICAS_QUERY,
} from "../../grafql/graphql";
export { AddEditDatosContacto };
function AddEditDatosContacto({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(DatosContactoAtom);
  const [personas, setPersonas] = useState(null);
  const [showPersona, setShowPersona] = useState(false);
  const handleClosePersona = () => setShowPersona(false);
  const handleShowPersona = () => setShowPersona(true);

  const [departamentos, setDepartamentos] = useState(null);
  const [showDepartamento, setShowDepartamento] = useState(false);
  const handleCloseDepartamento = () => setShowDepartamento(false);
  const handleShowDepartamento = () => setShowDepartamento(true);
  const [personaSeleccionada, setPersonaSeleccionada] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
    id: "",
    nombre: "",
    pais: {
      nombre: "",
    },
  });
  const seleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    setShowPersona(false);
    console.log(personaSeleccionada);
  };
  const seleccionarDepartamento = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    setShowDepartamento(false);
    console.log(departamentoSeleccionado);
  };
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_PERSONAS_QUERY,
      });
      setPersonas(result.data.personas);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    personaId: Yup.string().required("Persona es requerido"),
    divisionPoliticaId: Yup.string().required("Departamento es requerido"),
    localidad: Yup.string().required("Localidad es requerido"),
    domicilio: Yup.string().required("Domicilio es requerido"),
    telefono: Yup.string().required("Teléfono es requerido"),
    correo: Yup.string().required("Correo es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      //userActions.getEmpleadosId(id);
    }

    return userActions.resetDatosContacto;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit) {
      userActions.getDatosContactoById(id).then((rciva) => {});
    }
    return userActions.resetDatosContacto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
      setPersonaSeleccionada({
        id: aporte.persona.id,
        nombre: aporte.persona.nombre,
        apellidoPaterno: aporte.persona.apellidoPaterno,
        apellidoMaterno: aporte.persona.apellidoMaterno,
      });
      setDepartamentoSeleccionado({
        id: aporte.divisionPolitica.id,
        nombre: aporte.divisionPolitica.nombre,
        pais: {
          nombre: aporte.divisionPolitica.pais.nombre,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, aporte]);
  useEffect(() => {
    if (mode.edit && aporte) {
      reset(aporte);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(aporte.id, data);
  }
  async function createAporte(data) {
    console.log(data);
    await userActions.registrarDatosContacto(data);
    history.push("/gestionarDatosContacto");
    alertActions.success("Datos de Contacto añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateDatosContacto(id, data);
    history.push("/gestionarDatosContacto");
    alertActions.success("Datos de Contacto actualizado");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setPersonaSeleccionada({
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    });
    setDepartamentoSeleccionado({
      id: "",
      nombre: "",
      pais: {
        nombre: "",
      },
    });
  };

  const loading = mode.edit && !aporte;
  const personaId = personaSeleccionada?.id || "";
  const divisionPoliticaId = departamentoSeleccionado?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Datos Contacto" : "Editar Datos Contacto"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Persona</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="personaId"
                      type="text"
                      value={`${personaSeleccionada.nombre}  ${personaSeleccionada.apellidoPaterno}`}
                      {...register("personaId", {
                        value: personaId,
                      })}
                      className={`form-control ${
                        errors.personaId && personaSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.personaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowPersona}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Departamento</Form.Label>
                <Row>
                  <Col sm={9}>
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
                    <Button variant="info" onClick={handleShowDepartamento}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formHoras">
                <Form.Label>Localidad</Form.Label>
                <Form.Control
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
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formHoras">
                <Form.Label>Domicilio</Form.Label>
                <Form.Control
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
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formHoras">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  name="telefono"
                  type="text"
                  {...register("telefono")}
                  className={`form-control ${
                    errors.telefono ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.telefono?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formHoras">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  name="correo"
                  type="text"
                  {...register("correo")}
                  className={`form-control ${
                    errors.correo ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.correo?.message}</div>
              </Form.Group>
            </Col>
          </Row>

          <div className="form-group">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary mr-2"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Guardar
            </Button>
            <button
              onClick={handleLimpiar}
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Resetear
            </button>
            <Link to="/gestionarDatosContacto" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </Form>
      )}
      <Modal size="lg" show={showPersona} onHide={handleClosePersona}>
        <Modal.Header>
          <Modal.Title>Buscar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "80%" }}>Nombre Completo</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {personas?.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.nombre} {item.apellidoPaterno} {item.apellidoMaterno}
                  </td>
                  <td>
                    <Button
                      onClick={() => seleccionarPersona(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!personas && (
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
          <Button variant="danger" onClick={handleClosePersona}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showDepartamento} onHide={handleCloseDepartamento}>
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
