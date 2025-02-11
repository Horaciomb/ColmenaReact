import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { VacacionAtom, empleadosAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, { getVacacionesTomadasQuery } from "../../grafql/graphql";
import dayjs from "dayjs";
export { AddEditVacaciones };
function AddEditVacaciones({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(VacacionAtom);
  const empleados = useRecoilValue(empleadosAtom);
  const [diasAcumulados, setDiasAcumulados] = useState(0);
  const [diasTomados, setDiasTomados] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [empleadoSeleccionada, setEmpleadoSeleccionada] = useState({
    id: "",
    diasAcumulados: "",
    diasTomados: "",
    nombrePersona: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
  });
  const seleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionada(empleado);
    setDiasAcumulados(empleado.diasAcumulados);
    setDiasTomados(empleado.diasTomados);
    setShow(false);
  };
  const [dato, setDato] = useState({
    id: "",
    diasTomados: "",
    fechaInicio: "",
    empleado: {
      id: "",
      persona: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    },
  });

  // form validation rules
  const validationSchema = Yup.object().shape({
    empleadoId: Yup.string().required("Empleado es requerido"),
    diasTomados: Yup.string().required("Monto es requerido"),
    fechaInicio: Yup.string().required("Fecha es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    async function getData() {
      const result = await client.query(getVacacionesTomadasQuery(id));
      setDato(result.data.vacacionesTomada);
      console.log(result.data.vacacionesTomada);
    }
    if (mode.edit) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && dato) {
      reset({
        ...dato,
        fechaInicio: dayjs(dato.fechaInicio).format("YYYY-MM-DD"), // Formatear fechaInicio
      });
    }
    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dato]);
  useEffect(() => {
    if (mode.edit && dato) {
      setEmpleadoSeleccionada({
        id: dato.empleado.id,
        nombrePersona: dato.empleado.persona.nombre,
        apellidoPaterno: dato.empleado.persona.apellidoPaterno,
        apellidoMaterno: dato.empleado.persona.apellidoMaterno,
        diasAcumulados:dato.empleado.diasAcumulados,
        diasTomados:dato.empleado.diasTomados,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, dato]);
  useEffect(() => {
    console.log(aporte);
  }, [aporte]);
  useEffect(() => {
    if (mode.edit && aporte) {
      reset(aporte);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  useEffect(() => {
    console.log(empleadoSeleccionada);
    setDiasAcumulados(empleadoSeleccionada.diasAcumulados);
    setDiasTomados(empleadoSeleccionada.diasTomados);
  }, [empleadoSeleccionada,dato]);

  useEffect(() => {
    userActions.getEmpleadosVacaciones();
    return userActions.resetEmpleados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(dato.id, data);
  }
  async function createAporte(data) {
    console.log(data);
    await userActions.registrarVacacion(data);
    history.push("/gestionarVacaciones");
    alertActions.success("Vacaciones añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateVacacion(id, data);
    history.push("/gestionarVacaciones");
    alertActions.success("Vacaciones actualizado");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setEmpleadoSeleccionada({
      id: "",
      diasAcumulados: "",
      diasTomados: "",
      nombrePersona: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    });
    setDiasAcumulados(0);
    setDiasTomados(0);
  };
  const loading = mode.edit && !dato;
  const empleadoId = empleadoSeleccionada?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Vacaciones" : "Editar Vacaciones"}</h1>
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
                      value={`${empleadoSeleccionada.nombrePersona} ${empleadoSeleccionada.apellidoPaterno} ${empleadoSeleccionada.apellidoMaterno}`}
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
                    <Button variant="info" onClick={handleShow}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Días Acumulados</Form.Label>
                <Form.Control disabled value={diasAcumulados} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Días Tomados</Form.Label>
                <Form.Control disabled value={diasTomados} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad de Días</Form.Label>
                <Form.Control
                  name="diasTomados"
                  type="number"
                  {...register("diasTomados")}
                  className={`form-control ${
                    errors.diasTomados ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.diasTomados?.message}
                </div>
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
            <Link to="/gestionarVacaciones" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </Form>
      )}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Buscar Empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>#</th>
                <th style={{ width: "20%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Dias Acumulados</th>
                <th style={{ width: "20%" }}>Dias Tomados</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {empleados?.map((empleado, index) => (
                <tr key={empleado.id}>
                  <td>{index + 1}</td>
                  <td>
                    {empleado.nombrePersona} {empleado.apellidoPaterno}{" "}
                    {empleado.apellidoMaterno}{" "}
                  </td>
                  <td>{empleado.diasAcumulados}</td>
                  <td>{empleado.diasTomados}</td>
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
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
