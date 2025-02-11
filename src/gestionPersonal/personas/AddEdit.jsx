import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, {
  GET_DIVISIONES_POLITICAS_QUERY,
  getPersonaQuery,
} from "../../grafql/graphql";
import dayjs from "dayjs"; 
import { personaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import TablaModal from "_components/TablaModal";

export { AddEdit };

function AddEdit({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const persona = useRecoilValue(personaAtom);
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
  const [dato, setDato] = useState({
    id: 0,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    carnetIdentidad: "",
    estadoCivil: {
      id: 0,
      nombre: "",
    },
    genero: {
      id: 0,
      nombre: "",
    },
    fechaNac: "",
    divisionPolitica: {
      id: 0,
      nombre: "",
      pais: { nombre: "" },
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
        fetchPolicy: "network-only",
      });
      setDepartamentos(result.data.divisionesPoliticas);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    apellidoPaterno: Yup.string().required("Apellido Paterno es requerido"),
    apellidoMaterno: Yup.string().required("Apellido Materno es requerido"),
    generoId: Yup.string().required("Género es requerido"),
    fechaNac: Yup.string().required("Fecha de Nacimiento es requerido"),
    divisionPoliticaId: Yup.string().required("Departamento es requerido"),
    estadoCivilId: Yup.string().required("Estado Civil es requerido"),
    carnetIdentidad: Yup.string().required("Carnet de Identidad es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      //userActions.getPersonasId(id);
    }

    return userActions.resetPersona;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query(getPersonaQuery(id));
      setDato(result.data.persona);
      console.log(result.data.persona);
    }
    if (mode.edit) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && dato) {
      const divisionesPoliticas = dato.divisionPolitica;
      const departamento = {
        id: divisionesPoliticas.id,
        nombre: divisionesPoliticas.nombre,
        pais: { nombre: divisionesPoliticas.pais.nombre },
      };
      setDepartamentoSeleccionado(departamento);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, dato]);

  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && dato) {
      // Preprocesa las fechas utilizando dayjs y asegúrate de que estén en el formato correcto
      const processedFechaNac = dayjs(dato.fechaNac).format("YYYY-MM-DD");
      reset({
        ...dato,
        fechaNac: processedFechaNac,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dato]);

  function onSubmit(data) {
    return mode.add ? createPersona(data) : updatePersona(dato.id, data);
  }

  async function createPersona(data) {
    console.log(data);
    try {
      await userActions.registrarPersona(data);
      history.push("/personas");
      alertActions.success("Persona añadida");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear la persona");
    }
  }

  async function updatePersona(id, data) {
    await userActions.updatePersona(id, data);
    history.push("/personas");
    alertActions.success("Persona actualizada");
  }
  const handleLimpiar = () => {
    reset(persona);
    setDepartamentoSeleccionado({
      id: "",
      nombre: "",
      pais: {
        nombre: "",
      },
    });
  };

  const loading = mode.edit && !dato;
  const divisionPoliticaId = departamentoSeleccionado?.id || "";

  return (
    <>
      <h1>{mode.add ? "Agregar Persona" : "Editar Persona"}</h1>
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
                <Form.Label>Apellido Paterno</Form.Label>
                <Form.Control
                  name="apellidoPaterno"
                  type="text"
                  {...register("apellidoPaterno")}
                  className={`form-control ${
                    errors.apellidoPaterno ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.apellidoPaterno?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Apellido Materno</Form.Label>
                <Form.Control
                  name="apellidoMaterno"
                  type="text"
                  {...register("apellidoMaterno")}
                  className={`form-control ${
                    errors.apellidoMaterno ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.apellidoMaterno?.message}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Carnet de Identidad</Form.Label>
                <Form.Control
                  name="carnetIdentidad"
                  placeholder=""
                  type="text"
                  {...register("carnetIdentidad")}
                  className={`form-control ${
                    errors.carnetIdentidad ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.carnetIdentidad?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Estado Civil</Form.Label>
                <select
                  name="estadoCivilId"
                  {...register("estadoCivilId")}
                  className="custom-select mr-sm-2"
                >
                  <option value="1">Soltero</option>
                  <option value="2">Casado</option>
                  <option value="3">Viudo</option>
                  <option value="4">Divorciado</option>
                  <option value="5">Concubino</option>
                </select>
                <div className="invalid-feedback">
                  {errors.estadoCivilId?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Género</Form.Label>
                <select
                  name="generoId"
                  {...register("generoId")}
                  className="custom-select mr-sm-2"
                >
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                  <option value="3">Otro</option>
                  <option value="4">NoEspecífico</option>
                </select>
                <div className="invalid-feedback">
                  {errors.generoId?.message}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Fecha de Nacimiento</Form.Label>
                <Form.Control
                  name="fechaNac"
                  type="date"
                  {...register("fechaNac")}
                  className={`form-control ${
                    errors.fechaNac ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fechaNac?.message}
                </div>
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
            <Link to="/personas" className="btn btn-link">
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
