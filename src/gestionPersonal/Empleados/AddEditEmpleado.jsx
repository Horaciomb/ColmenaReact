import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, {
  GET_PERSONAS_QUERY,
  getEmpleadoQuery,
} from "../../grafql/graphql";
import { empleadoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import dayjs from "dayjs";
export { AddEditEmpleado };
function AddEditEmpleado({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const empleado = useRecoilValue(empleadoAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [personas, setPersonas] = useState(null);
  const [personaSeleccionada, setPersonaSeleccionada] = useState({
    id: 0,
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });
  const [dato, setDato] = useState({
    id: "",
    codigoEmpleado: "",
    fechaAlta: "",
    fecaBaja: "",
    estado: {
      id: "",
      nombre: "",
    },
    persona: {
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const seleccionarPersona = (persona) => {
    setPersonaSeleccionada(persona);
    setShow(false);
    console.log(personaSeleccionada);
  };
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
  // form validation rules
  const validationSchema = Yup.object().shape({
    codigoEmpleado: Yup.string().required("Código es requerido"),
    fechaAlta: Yup.string().required("Fecha Alta es requerido"),
    fechaBaja: Yup.string().required("Fecha Baja es requerido"),
    estadoId: Yup.string().required("Estado es requerido"),
    personaId: Yup.string().required("Persona es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  // useEffect(() => {
  //   // fetch user details into recoil state in edit mode
  //   if (mode.edit) {
  //     userActions.getEmpleadosId(id);
  //   }

  //   return userActions.resetEmpleado;

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  useEffect(() => {
    async function fetchData() {
      const result = await client.query(getEmpleadoQuery(id));
      setDato(result.data.empleado);
      console.log(result.data.empleado);
    }
    if (mode.edit) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, mode.edit]);
  useEffect(() => {
    if (mode.edit && dato) {
      const personas = dato.persona;
      const personita = {
        id: personas.id,
        nombre: personas.nombre,
        apellidoPaterno: personas.apellidoPaterno,
        apellidoMaterno: personas.apellidoMaterno,
      };
      setPersonaSeleccionada(personita);
      reset({
        ...dato,
        fechaAlta: dayjs(dato.fechaAlta).format("YYYY-MM-DD"), // Formatear fechaAlta
        fechaBaja: dayjs(dato.fechaBaja).format("YYYY-MM-DD"), // Formatear fechaBaja
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, dato]);
  function onSubmit(data) {
    return mode.add ? create(data) : update(dato.id, data);
  }
  async function create(data) {
    console.log(data);
    try {
      await userActions.registrarEmpleado(data);
      history.push("/empleados");
      alertActions.success("Empleado añadido");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear el Empleado");
    }
  }
  async function update(id, data) {
    await userActions.updateEmpleado(id, data);
    history.push("/empleados");
    alertActions.success("Empleado actualizado");
  }
  const handleLimpiar = () => {
    reset(empleado);
    setPersonaSeleccionada({
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    });
  };
  const loading = mode.edit && !dato;
  const personaId = personaSeleccionada?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Empleado" : "Editar Empleado"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Código Empleado</Form.Label>
                <Form.Control
                  name="codigoEmpleado"
                  type="text"
                  {...register("codigoEmpleado")}
                  className={`form-control ${
                    errors.codigoEmpleado ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.codigoEmpleado?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Fecha Alta</Form.Label>
                <Form.Control
                  name="fechaAlta"
                  type="date"
                  {...register("fechaAlta")}
                  className={`form-control ${
                    errors.fechaAlta ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fechaAlta?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Fecha Baja</Form.Label>
                <Form.Control
                  name="fechaBaja"
                  type="date"
                  {...register("fechaBaja")}
                  className={`form-control ${
                    errors.fechaBaja ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fechaBaja?.message}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Estado</Form.Label>
                <select
                  name="estadoId"
                  {...register("estadoId")}
                  className="custom-select mr-sm-2"
                >
                  <option value="1">Dado de Baja</option>
                  <option value="2">Suspendido</option>
                  <option value="3">Pensionista</option>
                  <option value="4">Activo</option>
                </select>
                <div className="invalid-feedback">
                  {errors.estadoId?.message}
                </div>
              </Form.Group>
            </Col>
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
            <Link to="/empleados" className="btn btn-link">
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
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
