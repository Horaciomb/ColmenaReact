import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { contratoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  getContratoQuery,
  GET_CARGOS_QUERY,
  GET_EMPLEADOS_QUERY,
} from "../../grafql/graphql";
import dayjs from "dayjs";
export { EditAsignarCargos };
function EditAsignarCargos({ history, match }) {
  const { id } = match.params;
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(contratoAtom);
  const [dato, setDato] = useState(null);
  const [empleados, setEmpleados] = useState(null);
  const [cargos, setCargos] = useState(null);
  const [showEmpleado, setShowEmpleado] = useState(false);
  const handleCloseEmpleado = () => setShowEmpleado(false);
  const handleShowEmpleado = () => setShowEmpleado(true);

  const [showCargo, setShowCargo] = useState(false);
  const handleCloseCargo = () => setShowCargo(false);
  const handleShowCargo = () => setShowCargo(true);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    id: "",
    nombre: "",
    persona: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const [cargoSeleccionado, setCargoSeleccionado] = useState({
    id: "",
    objetivo: "",
    tipoCargo: {
      nombre: "",
    },
    area: {
      objetivo: "",
      tipoArea: {
        nombre: "",
      },
    },
  });
  const seleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setShowEmpleado(false);
  };
  const seleccionarCargo = (cargo) => {
    setCargoSeleccionado(cargo);
    setShowCargo(false);
  };
  // form validation rules
  const validationSchema = Yup.object().shape({
    empleadoId: Yup.string().required("Empleado es requerido"),
    tipoContratoId: Yup.string().required("Tipo Contrato es requerido"),
    fechaInicio: Yup.string().required("Fecha de Inicio es requerido"),
    fechaFin: Yup.string().required("Fecha de Fin es requerido"),
    horas: Yup.string().required("Horas es requerido"),
    cargoId: Yup.string().required("Cargo es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    return userActions.resetContrato;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query(getContratoQuery(id));
      setDato(result.data.contrato);
      console.log(result.data.contrato);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_CARGOS_QUERY,
        fetchPolicy: "network-only",
      });
      setCargos(result.data.cargos);
    }

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    // set default form values after user set in recoil state (in edit mode)
    if (dato) {
      reset({
        ...dato,
        fechaInicio: dayjs(dato.fechaInicio).format("YYYY-MM-DD"),
        fechaFin: dayjs(dato.fechaFin).format("YYYY-MM-DD"),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dato]);
  useEffect(() => {
    if (dato) {
      setEmpleadoSeleccionado(dato.empleado);
      setCargoSeleccionado(dato.cargo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dato]);
  function onSubmit(data) {
    return update(dato.id, data);
  }
  async function update(id, data) {
    //console.log(data);
    await userActions.updateContrato(id, data);
    history.push("/asignarCargos");
    alertActions.success("Cargo actualizado");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setEmpleadoSeleccionado({
      id: "",
      nombre: "",
      persona: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    });
    setCargoSeleccionado({
      id: "",
      objetivo: "",
      tipoCargo: {
        nombre: "",
      },
      area: {
        objetivo: "",
        tipoArea: {
          nombre: "",
        },
      },
    });
  };
  const loading = aporte;
  const empleadoId = empleadoSeleccionado?.id || "";
  const cargoId = cargoSeleccionado?.id || "";
  return (
    <>
      <h1>Editar Cargo</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formEmpleadoId">
                <Form.Label>Empleado</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="empleadoId"
                      type="text"
                      value={`${empleadoSeleccionado.persona.nombre} ${empleadoSeleccionado.persona.apellidoPaterno} ${empleadoSeleccionado.persona.apellidoMaterno}`}
                      {...register("empleadoId", { value: empleadoId })}
                      className={`form-control ${
                        errors.empleadoId && empleadoSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.empleadoId?.message}
                    </div>
                  </Col>
                  <Col sm={2}>
                    <Button variant="info" onClick={handleShowEmpleado}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBCargoId">
                <Form.Label>Cargo</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="cargoId"
                      type="text"
                      value={`${cargoSeleccionado.objetivo} - ${cargoSeleccionado.area.objetivo}`}
                      {...register("cargoId", { value: cargoId })}
                      className={`form-control ${
                        errors.cargoId && cargoSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.cargoId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowCargo}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formTipoContrato">
                <Form.Label>Tipo Contrato</Form.Label>
                <select
                  name="tipoContratoId"
                  {...register("tipoContratoId")}
                  className="custom-select mr-sm-2"
                >
                  <option value="1">Indefinido</option>
                  <option value="2">Plazo Fijo</option>
                  <option value="3">Pasante</option>
                  <option value="4">Tercerizado</option>
                  <option value="5">Consultor</option>
                  <option value="6">Por Obra</option>
                </select>
                <div className="invalid-feedback">
                  {errors.tipoContratoId?.message}
                </div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formHoras">
                <Form.Label>Horas de Trabajo</Form.Label>
                <Form.Control
                  defaultValue="8"
                  name="horas"
                  type="number"
                  {...register("horas")}
                  className={`form-control ${errors.horas ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.horas?.message}</div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formFechaInicio">
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
              <Form.Group className="mb-3" controlId="formFechaFin">
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
          <Row>
            <Col>
              <Link
                to={`/gestionarSuledos/${id}`}
                className="btn btn-link btn-icon animate__animated animate__bounceInLeft"
              >
                <i className="bi bi-arrow-right"></i> Gestionar Sueldo
              </Link>{" "}
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
            <Link to="/asignarCargos" className="btn btn-link">
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
      <Modal size="lg" show={showCargo} onHide={handleCloseCargo}>
        <Modal.Header>
          <Modal.Title>Buscar Cargo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>Cargo</th>
                <th style={{ width: "30%" }}>Objetivo de Cargo</th>
                <th style={{ width: "20%" }}>Area</th>
                <th style={{ width: "15%" }}>Tipo Area</th>
                <th style={{ width: "10%" }}>Ciudad</th>
                <th style={{ width: "15%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cargos?.map((cargo) => (
                <tr key={cargo.id}>
                  <td>{cargo.tipoCargo.nombre}</td>
                  <td>{cargo.objetivo}</td>
                  <td>{cargo.area.objetivo}</td>
                  <td>{cargo.area.tipoArea.nombre}</td>
                  <td>{cargo.ciudad.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarCargo(cargo)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!cargos && (
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
          <Button variant="danger" onClick={handleCloseCargo}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
