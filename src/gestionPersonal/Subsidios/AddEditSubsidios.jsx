import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { SubsidioAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  GET_EMPLEADOS_QUERY,
  getTipoNominaQuery,
} from "../../grafql/graphql";
import dayjs from "dayjs";
export { AddEditSubsidios };
function AddEditSubsidios({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const ingreso = useRecoilValue(SubsidioAtom);
  const [empleados, setEmpleados] = useState(null);
  const [nominas, setNominas] = useState(null);
  const [showEmpleado, setShowEmpleado] = useState(false);
  const handleCloseEmpleado = () => setShowEmpleado(false);
  const handleShowEmpleado = () => setShowEmpleado(true);
  const [showNomina, setShowNomina] = useState(false);
  const handleCloseNomina = () => setShowNomina(false);
  const handleShowNomina = () => setShowNomina(true);
  const [empleadoSeleccionada, setEmpleadoSeleccionada] = useState({
    id: "",
    persona: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const [nominaSeleccionada, setNominaSeleccionada] = useState({
    id: "",
    descripcion: "",
    tipoNominaId: 0,
    tipoNomina: {
      id: 0,
      nombre: "",
    },
  });
  const seleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionada(empleado);
    setShowEmpleado(false);
  };
  const seleccionarNomina = (nomina) => {
    setNominaSeleccionada(nomina);
    setShowNomina(false);
  };
  // form validation rules
  const validationSchema = Yup.object().shape({
    empleadoId: Yup.string().required("Empleado es requerido"),
    nominaId: Yup.string().required("Nomina es requerido"),
    monto: Yup.string().required("Monto es requerido"),
    fechaInicio: Yup.string().required("Fecha Inicio es requerida"),
    fechaFin: Yup.string().required("Fecha Fin es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_EMPLEADOS_QUERY,
        fetchPolicy: "network-only",
      });
      setEmpleados(result.data.empleados);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query(getTipoNominaQuery(7));
      setNominas(result.data.tipoNomina.nominas);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit) {
      userActions.getSubsidioId(id).then((rciva) => {});
    }
    return userActions.resetSubsidio;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && ingreso) {
      setEmpleadoSeleccionada({
        id: ingreso.empleado.id,
        persona: {
          nombre: ingreso.empleado.persona.nombre,
          apellidoPaterno: ingreso.empleado.persona.apellidoPaterno,
          apellidoMaterno: ingreso.empleado.persona.apellidoMaterno,
        },
      });
      setNominaSeleccionada(ingreso.nomina);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, ingreso]);
  useEffect(() => {
    if (mode.edit && ingreso) {
      reset({
        ...ingreso,
        fechaInicio: dayjs(ingreso.fechaInicio).format("YYYY-MM-DD"),
        fechaFin: dayjs(ingreso.fechaFin).format("YYYY-MM-DD"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingreso]);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(ingreso.id, data);
  }
  async function createAporte(data) {
    console.log(data);
    await userActions.registrarSubsidio(data);
    history.push("/gestionarSubsidios");
    alertActions.success("Subsidio añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateSubsidio(id, data);
    history.push("/gestionarSubsidios");
    alertActions.success("Subsidio actualizado");
  }
  const handleLimpiar = () => {
    reset(ingreso);
    setEmpleadoSeleccionada({
      id: "",
      persona: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    });
    setNominaSeleccionada({
      id: "",
      descripcion: "",
      tipoNominaId: 0,
      tipoNomina: {
        id: 0,
        nombre: "",
      },
    });
  };
  const loading = mode.edit && !ingreso;
  const empleadoId = empleadoSeleccionada?.id || "";
  const nominaId = nominaSeleccionada?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Subsidios" : "Editar Subsidios"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Empleado</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="empleadoId"
                      type="text"
                      value={`${empleadoSeleccionada.persona.nombre} ${empleadoSeleccionada.persona.apellidoPaterno} ${empleadoSeleccionada.persona.apellidoMaterno}`}
                      {...register("empleadoId", { value: empleadoId })}
                      className={`form-control ${
                        errors.empleadoId && empleadoSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.empleadoId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowEmpleado}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Nomina</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="nominaId"
                      type="text"
                      value={`${nominaSeleccionada.descripcion}`}
                      {...register("nominaId", { value: nominaId })}
                      className={`form-control ${
                        errors.nominaId && nominaSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.nominaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowNomina}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Monto</Form.Label>
                <Form.Control
                  name="monto"
                  type="number"
                  {...register("monto")}
                  className={`form-control ${errors.monto ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.monto?.message}</div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control
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
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Fecha Fin</Form.Label>
                <Form.Control
                  name="fechaFin"
                  type="date"
                  {...register("fechaFin")}
                  className={`form-control ${
                    errors.fechaFin ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.fechaFin?.message}
                </div>
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
            <Link to="/gestionarSubsidios" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </Form>
      )}
      <Modal size="lg" show={showEmpleado} onHide={handleCloseEmpleado}>
        <Modal.Header>
          <Modal.Title>Buscar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Cod. Empleado</th>
                <th style={{ width: "60%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {empleados?.map((empleado) => (
                <tr key={empleado.id}>
                  <td>{empleado.codigoEmpleado}</td>
                  <td>
                    {empleado.persona.nombre} {empleado.persona.apellidoPaterno}{" "}
                    {empleado.persona.apellidoMaterno}{" "}
                  </td>
                  <td>
                    <Button
                      onClick={() => seleccionarEmpleado(empleado)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!empleados && (
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
          <Button variant="danger" onClick={handleCloseEmpleado}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showNomina} onHide={handleCloseNomina}>
        <Modal.Header>
          <Modal.Title>Buscar Nomina</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>#</th>
                <th style={{ width: "60%" }}>Descripcion</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {nominas?.map((nomina, index) => (
                <tr key={nomina.id}>
                  <td>{index + 1}</td>
                  <td>{nomina.descripcion}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarNomina(nomina)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!nominas && (
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
          <Button variant="danger" onClick={handleCloseNomina}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
