import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { RcivaAtom, empleadosAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import dayjs from "dayjs";
export { AddEditRciva };
function AddEditRciva({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(RcivaAtom);
  const empleados = useRecoilValue(empleadosAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [empleadoSeleccionada, setEmpleadoSeleccionada] = useState({
    id: "",
    nombre: "",
    persona: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const seleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionada(empleado);
    setShow(false);
  };

  // form validation rules
  const validationSchema = Yup.object().shape({
    empleadoId: Yup.string().required("Empleado es requerido"),
    monto: Yup.string().required("Monto es requerido"),
    fecha: Yup.string().required("Fecha es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (mode.edit) {
      userActions.getRcivaById(id).then((rciva) => {});
    }
    return userActions.resetRciva;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
      setEmpleadoSeleccionada({
        ...empleadoSeleccionada,
        persona: {
          nombre: aporte.empleado.persona.nombre,
          apellidoPaterno: aporte.empleado.persona.apellidoPaterno,
          apellidoMaterno: aporte.empleado.persona.apellidoMaterno,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, aporte]);

  useEffect(() => {
    console.log(aporte);
  }, [aporte]);
  useEffect(() => {
    if (mode.edit && aporte) {
      reset({
        ...aporte,
        fecha: dayjs(aporte.fecha).format("YYYY-MM-DD"), // Formatear la fecha para el campo de fecha
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  useEffect(() => {
    console.log(empleadoSeleccionada);
  }, [empleadoSeleccionada]);

  useEffect(() => {
    userActions.getEmpleados();
    return userActions.resetEmpleados();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(aporte.id, data);
  }
  async function createAporte(data) {
    console.log(data);
    await userActions.registrarRciva(data);
    history.push("/gestionarRcivas");
    alertActions.success("RC-IVA añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateRciva(id, data);
    history.push("/gestionarRcivas");
    alertActions.success("RC-IVA actualizado");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setEmpleadoSeleccionada({
      id: "",
      nombre: "",
      persona: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    });
  };

  const loading = mode.edit && !aporte;
  const empleadoId = empleadoSeleccionada?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar RC-IVA" : "Editar RC-IVA"}</h1>
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
                    <Button variant="info" onClick={handleShow}>
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
                  type="text"
                  {...register("monto")}
                  className={`form-control ${errors.monto ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.monto?.message}</div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
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
            <Link to="/gestionarRcivas" className="btn btn-link">
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
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
