import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { ExpLaboralAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  GET_EXPERIENCIA_LABORAL_VARIABLES,
  GET_PERSONAS_QUERY,
} from "../../grafql/graphql";
import dayjs from "dayjs";
export { AddEditExperienciLaboral };
function AddEditExperienciLaboral({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(ExpLaboralAtom);
  // Personas
  const [personas, setPersonas] = useState(null);
  const [showPersona, setShowPersona] = useState(false);
  const handleClosePersona = () => setShowPersona(false);
  const handleShowPersona = () => setShowPersona(true);
  const [personaSeleccionada, setPersonaSeleccionada] = useState({
    id: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });
  const seleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    setShowPersona(false);
    console.log(personaSeleccionada);
  };
  const personaId = personaSeleccionada?.id || "";

  // Empresas
  const [empresas, setEmpresas] = useState(null);
  const [showEmpresa, setShowEmpresa] = useState(false);
  const handleCloseEmpresa = () => setShowEmpresa(false);
  const handleShowEmpresa = () => setShowEmpresa(true);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });
  const seleccionarEmpresa = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setShowEmpresa(false);
    console.log(empresaSeleccionada);
  };
  const empresaId = empresaSeleccionada?.id || "";
  // Motivo de Baja
  const [motivosBaja, setMotivosBaja] = useState(null);
  const [showMotivoBaja, setShowMotivoBaja] = useState(false);
  const handleCloseMotivoBaja = () => setShowMotivoBaja(false);
  const handleShowMotivoBaja = () => setShowMotivoBaja(true);
  const [motivoBajaSeleccionado, setMotivoBajaSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarMotivoBaja = (motivoBaja) => {
    setMotivoBajaSeleccionado(motivoBaja);
    setShowMotivoBaja(false);
    console.log(motivoBajaSeleccionado);
  };
  const motivoBajaId = motivoBajaSeleccionado?.id || "";
  // Tipo Cargo
  const [tiposCargo, setTiposCargo] = useState(null);
  const [showTipoCargo, setShowTipoCargo] = useState(false);
  const handleCloseTipoCargo = () => setShowTipoCargo(false);
  const handleShowTipoCargo = () => setShowTipoCargo(true);
  const [tipoCargoSeleccionado, setTipoCargoSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarTipoCargo = (tipoCargo) => {
    setTipoCargoSeleccionado(tipoCargo);
    setShowTipoCargo(false);
    console.log(tipoCargoSeleccionado);
  };
  const tipoCargoId = tipoCargoSeleccionado?.id || "";
  // Obtener Datos
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_PERSONAS_QUERY,
        fetchPolicy: "network-only",
      });
      setPersonas(result.data.personas);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_EXPERIENCIA_LABORAL_VARIABLES,
        fetchPolicy: "network-only",
      });
      setEmpresas(result.data.empresas);
      setMotivosBaja(result.data.motivoBajas);
      setTiposCargo(result.data.tipoCargos);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    personaId: Yup.string().required("Persona es requerido"),
    empresaId: Yup.string().required("Empresa es requerido"),
    tipoCargoId: Yup.string().required("Tipo de Cargo es requerido"),
    motivoBajaId: Yup.string().required("Motivo de Baja es requerido"),
    fecha: Yup.string().required("Fecha es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getExperienciaLaboralById(id);
    }

    return userActions.resetExperienciaLaboral;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
      // Seleccionar persona
      setPersonaSeleccionada({
        id: aporte.persona.id,
        nombre: aporte.persona.nombre,
        apellidoPaterno: aporte.persona.apellidoPaterno,
        apellidoMaterno: aporte.persona.apellidoMaterno,
      });

      // Seleccionar empresa
      setEmpresaSeleccionada({
        id: aporte.empresa.id,
        nombre: aporte.empresa.nombre,
        descripcion: aporte.empresa.descripcion,
      });

      // Seleccionar motivo de baja
      setMotivoBajaSeleccionado({
        id: aporte.motivoBaja.id,
        nombre: aporte.motivoBaja.nombre,
      });

      // Seleccionar tipo de cargo
      setTipoCargoSeleccionado({
        id: aporte.tipoCargo.id,
        nombre: aporte.tipoCargo.nombre,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, aporte]);
  useEffect(() => {
    if (mode.edit && aporte) {
      reset({
        ...aporte,
        fecha: dayjs(aporte.fecha).format("YYYY-MM-DD"), // Formatear la fecha para el campo de fecha
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(aporte.id, data);
  }
  async function createAporte(data) {
    console.log(data);
    await userActions.registrarExperienciaLaboral(data);
    history.push("/gestionarExperienciaLaboral");
    alertActions.success("Experiencia Laboral añadida");
  }
  async function updateAporte(id, data) {
    await userActions.updateExperienciaLaboral(id, data);
    history.push("/gestionarExperienciaLaboral");
    alertActions.success("Experiencia Laboral actualizada");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setPersonaSeleccionada({
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    });
    setEmpresaSeleccionada({
      id: "",
      nombre: "",
      descripcion: "",
    });
    setTipoCargoSeleccionado({
      id: "",
      nombre: "",
    });
    setMotivoBajaSeleccionado({
      id: "",
      nombre: "",
    });
  };
  const loading = mode.edit && !aporte;

  return (
    <>
      <h1>{mode.add ? "Agregar Experiencia Laboral" : "Editar Experiencia Laboral"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPersona">
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
              <Form.Group className="mb-3" controlId="formEmpresa">
                <Form.Label>Empresa</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="empresaId"
                      type="text"
                      value={`${empresaSeleccionada.nombre}`}
                      {...register("empresaId", {
                        value: empresaId,
                      })}
                      className={`form-control ${
                        errors.empresaId &&
                        empresaSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.empresaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowEmpresa}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formTipoCargo">
                <Form.Label>Tipo Cargo</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="tipoCargoId"
                      type="text"
                      value={`${tipoCargoSeleccionado.nombre}`}
                      {...register("tipoCargoId", {
                        value: tipoCargoId,
                      })}
                      className={`form-control ${
                        errors.tipoCargoId &&
                        tipoCargoSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.tipoCargoId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowTipoCargo}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formMotivoBaja">
                <Form.Label>Motivo de Baja</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="motivoBajaId"
                      type="text"
                      value={`${motivoBajaSeleccionado.nombre}`}
                      {...register("motivoBajaId", {
                        value: motivoBajaId,
                      })}
                      className={`form-control ${
                        errors.motivoBajaId &&
                        motivoBajaSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.motivoBajaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowMotivoBaja}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formFecha">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  name="fecha"
                  type="date"
                  {...register("fecha")}
                  className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.fecha?.message}</div>
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
            <Link to="/gestionarExperienciaLaboral" className="btn btn-link">
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
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "70%" }}>Nombre Completo</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {personas?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
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
      <Modal size="lg" show={showEmpresa} onHide={handleCloseEmpresa}>
        <Modal.Header>
          <Modal.Title>Buscar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "40%" }}>Nombre</th>
                <th style={{ width: "40%" }}>Descripción</th>
                <th style={{ width: "10%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {empresas?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarEmpresa(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!empresas && (
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
          <Button variant="danger" onClick={handleCloseEmpresa}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTipoCargo} onHide={handleCloseTipoCargo}>
        <Modal.Header>
          <Modal.Title>Buscar Tipo Cargo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "70%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {tiposCargo?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarTipoCargo(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!tiposCargo && (
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
          <Button variant="danger" onClick={handleCloseTipoCargo}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMotivoBaja} onHide={handleCloseMotivoBaja}>
        <Modal.Header>
          <Modal.Title>Buscar Motivo de Baja</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "70%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {motivosBaja?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarMotivoBaja(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!motivosBaja && (
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
          <Button variant="danger" onClick={handleCloseMotivoBaja}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

