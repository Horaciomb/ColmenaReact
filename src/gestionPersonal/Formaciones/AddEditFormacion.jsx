import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FormacionAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  GET_FORMACION_VARIABLES,
  GET_PERSONAS_QUERY,
} from "../../grafql/graphql";
export { AddEditFormacion };
function AddEditFormacion({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(FormacionAtom);
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

  const [especialidades, setEspecialidades] = useState(null);
  const [showEspecialidad, setShowEspecialidad] = useState(false);
  const handleCloseEspecialidad = () => setShowEspecialidad(false);
  const handleShowEspecialidad = () => setShowEspecialidad(true);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarEspecialidad = (especialidad) => {
    setEspecialidadSeleccionada(especialidad);
    setShowEspecialidad(false);
    console.log(especialidadSeleccionada);
  };
  const [tipoFormaciones, setTipoFormaciones] = useState(null);
  const [showTipoFormacion, setShowTipoFormacion] = useState(false);
  const handleCloseTipoFormacion = () => setShowTipoFormacion(false);
  const handleShowTipoFormacion = () => setShowTipoFormacion(true);
  const [tipoFormacionSeleccionada, setTipoFormacionSeleccionada] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarTipoFormacion = (tipoFormacion) => {
    setTipoFormacionSeleccionada(tipoFormacion);
    setShowTipoFormacion(false);
    console.log(tipoFormacionSeleccionada);
  };

  const [titulos, setTitulos] = useState(null);
  const [showTitulo, setShowTitulo] = useState(false);
  const handleCloseTitulo = () => setShowTitulo(false);
  const handleShowTitulo = () => setShowTitulo(true);
  const [tituloSeleccionado, setTituloSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarTitulo = (titulo) => {
    setTituloSeleccionado(titulo);
    setShowTitulo(false);
    console.log(tituloSeleccionado);
  };

  const [instituciones, setInstituciones] = useState(null);
  const [showInstitucion, setShowInstitucion] = useState(false);
  const handleCloseInstitucion = () => setShowInstitucion(false);
  const handleShowInstitucion = () => setShowInstitucion(true);
  const [institucionSeleccionada, setInstitucionSeleccionada] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    divisionPolitica: {
      id: "",
      nombre: "",
      pais: {
        id: "",
        nombre: "",
      },
    },
  });
  const seleccionarInstitucion = (institucion) => {
    setInstitucionSeleccionada(institucion);
    setShowInstitucion(false);
    console.log(institucionSeleccionada);
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
        query: GET_FORMACION_VARIABLES,
      });
      setEspecialidades(result.data.especialidades);
      setTipoFormaciones(result.data.tipoFormaciones);
      setTitulos(result.data.titulos);
      setInstituciones(result.data.instituciones);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    personaId: Yup.string().required("Persona es requerido"),
    escpecialidadId: Yup.string().required("Especialidad es requerido"),
    tipoFormacionId: Yup.string().required("Tipo Formación es requerido"),
    tituloId: Yup.string().required("Título es requerido"),
    institucionId: Yup.string().required("Institución es requerido"),
    fecha: Yup.string().required("Fecha es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getFormacionById(id);
    }

    return userActions.resetFormacion;

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
      setInstitucionSeleccionada({
        id: aporte.institucion.id,
        nombre: aporte.institucion.nombre,
        descripcion: aporte.institucion.descripcion,
        divisionPoliticaId: aporte.institucion.divisionPoliticaId,
        divisionPolitica: {
          id: aporte.institucion.divisionPolitica.id,
          nombre: aporte.institucion.divisionPolitica.nombre,
          paisId: aporte.institucion.divisionPolitica.paisId,
          pais: {
            id: aporte.institucion.divisionPolitica.pais.id,
            nombre: aporte.institucion.divisionPolitica.pais.nombre,
          },
        },
      });
      setEspecialidadSeleccionada({
        id: aporte.escpecialidad.id,
        nombre: aporte.escpecialidad.nombre,
      });
      setTipoFormacionSeleccionada({
        id: aporte.tipoFormacion.id,
        nombre: aporte.tipoFormacion.nombre,
      });
      setTituloSeleccionado({
        id: aporte.titulo.id,
        nombre: aporte.titulo.nombre,
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
    await userActions.registrarFormacion(data);
    history.push("/gestionarFormaciones");
    alertActions.success("Formación añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateFormacion(id, data);
    history.push("/gestionarFormaciones");
    alertActions.success("Formación actualizado");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setPersonaSeleccionada({
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    });
    setEspecialidadSeleccionada({
      id: "",
      nombre: "",
    });
    setTipoFormacionSeleccionada({
      id: "",
      nombre: "",
    });
    setTituloSeleccionado({
      id: "",
      nombre: "",
    });
    setInstitucionSeleccionada({
      id: "",
      nombre: "",
      descripcion: "",
      divisionPolitica: {
        id: "",
        nombre: "",
        pais: {
          nombre: "",
        },
      },
    });
  };
  const loading = mode.edit && !aporte;
  const personaId = personaSeleccionada?.id || "";
  const institucionId = institucionSeleccionada?.id || "";
  const escpecialidadId = especialidadSeleccionada?.id || "";
  const tipoFormacionId = tipoFormacionSeleccionada?.id || "";
  const tituloId = tituloSeleccionado?.id || "";

  return (
    <>
      <h1>{mode.add ? "Agregar Formación" : "Editar Formación"}</h1>
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
              <Form.Group className="mb-3" controlId="formInstitución">
                <Form.Label>Institución</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="institucionId"
                      type="text"
                      value={`${institucionSeleccionada.nombre} - ${institucionSeleccionada.descripcion}`}
                      {...register("institucionId", {
                        value: institucionId,
                      })}
                      className={`form-control ${
                        errors.institucionId &&
                        institucionSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.institucionId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowInstitucion}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formTipoFormación">
                <Form.Label>Tipo Formación</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="tipoFormacionId"
                      type="text"
                      value={`${tipoFormacionSeleccionada.nombre}`}
                      {...register("tipoFormacionId", {
                        value: tipoFormacionId,
                      })}
                      className={`form-control ${
                        errors.tipoFormacionId &&
                        tipoFormacionSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.tipoFormacionId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowTipoFormacion}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formEspecialidad">
                <Form.Label>Especialidad</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="escpecialidadId"
                      type="text"
                      value={`${especialidadSeleccionada.nombre}`}
                      {...register("escpecialidadId", {
                        value: escpecialidadId,
                      })}
                      className={`form-control ${
                        errors.escpecialidadId &&
                        especialidadSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.escpecialidadId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowEspecialidad}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formTitulo">
                <Form.Label>Título</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="tituloId"
                      type="text"
                      value={`${tituloSeleccionado.nombre}`}
                      {...register("tituloId", {
                        value: tituloId,
                      })}
                      className={`form-control ${
                        errors.tituloId && tituloSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.tituloId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowTitulo}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formHoras">
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
            <Link to="/gestionarFormaciones" className="btn btn-link">
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
      <Modal size="lg" show={showInstitucion} onHide={handleCloseInstitucion}>
        <Modal.Header>
          <Modal.Title>Buscar Institución</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "10%" }}>Nombre</th>
                <th style={{ width: "40%" }}>Descripción</th>
                <th style={{ width: "30%" }}>Departamento</th>
                <th style={{ width: "10%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {instituciones?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    {item.divisionPolitica.nombre}
                    {" - "}
                    {item.divisionPolitica.pais.nombre}
                  </td>
                  <td>
                    <Button
                      onClick={() => seleccionarInstitucion(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!instituciones && (
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
          <Button variant="danger" onClick={handleCloseInstitucion}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTipoFormacion} onHide={handleCloseTipoFormacion}>
        <Modal.Header>
          <Modal.Title>Buscar Tipo Formación</Modal.Title>
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
              {tipoFormaciones?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarTipoFormacion(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!tipoFormaciones && (
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
          <Button variant="danger" onClick={handleCloseTipoFormacion}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEspecialidad} onHide={handleCloseEspecialidad}>
        <Modal.Header>
          <Modal.Title>Buscar Especialidad</Modal.Title>
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
              {especialidades?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarEspecialidad(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!especialidades && (
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
          <Button variant="danger" onClick={handleCloseEspecialidad}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTitulo} onHide={handleCloseTitulo}>
        <Modal.Header>
          <Modal.Title>Buscar Titulo</Modal.Title>
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
              {titulos?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarTitulo(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!titulos && (
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
          <Button variant="danger" onClick={handleCloseTitulo}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
