import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { AsigancionGestoraAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, { GET_EMPLEADOS_QUERY } from "../../grafql/graphql";
export { AddEditAsignacionGestora };
function AddEditAsignacionGestora({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(AsigancionGestoraAtom);
  // Empleados
  const [empleados, setEmpleados] = useState(null);
  const [showEmpleado, setShowEmpleado] = useState(false);
  const handleCloseEmpleado = () => setShowEmpleado(false);
  const handleShowEmpleado = () => setShowEmpleado(true);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState({
    id: "",
    persona: {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
  });
  const seleccionarEmpleado = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setShowEmpleado(false);
  };
  const empleadoId = empleadoSeleccionado?.id || "";
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
  // form validation rules
  const validationSchema = Yup.object().shape({
    empleadoId: Yup.string().required("Empleado es requerido"),
    codigoGestora: Yup.string().required("Código Gestora es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getAsignacionGestoraById(id);
    }
    return userActions.resetAsignacionGestora;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
      // Seleccionar empleado
      setEmpleadoSeleccionado({
        id: aporte.empleado.id,
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
    await userActions.registrarAsignacionGestora(data);
    history.push("/gestionarAsignacionGestora");
    alertActions.success("Asignación Gestora añadida");
  }
  async function updateAporte(id, data) {
    await userActions.updateAsignacionGestora(id, data);
    history.push("/gestionarAsignacionGestora");
    alertActions.success("Asignación Gestora actualizada");
  }
  const handleLimpiar = () => {
    reset(aporte);
    setEmpleadoSeleccionado({
      id: "",
      persona: {
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
      },
    });
  };
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>
        {mode.add ? "Agregar Asignación Gestora" : "Editar Asignación Gestora"}
      </h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formEmpleado">
                <Form.Label>Empleado</Form.Label>
                <Row>
                  <Col sm={9}>
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
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowEmpleado}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCodigoGestora">
                <Form.Label>Código Gestora</Form.Label>
                <Form.Control
                  name="codigoGestora"
                  type="text"
                  {...register("codigoGestora")}
                  className={`form-control ${
                    errors.codigoGestora ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.codigoGestora?.message}
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
            <Link to="/gestionarAsignacionGestora" className="btn btn-link">
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
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "20%" }}>Cod. Empleado</th>
                <th style={{ width: "50%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {empleados?.map((empleado, index) => (
                <tr key={empleado.id}>
                  <td>{index + 1}</td>
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
    </>
  );
}
