import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { AsignacionAfpAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  GET_EMPLEADOS_QUERY,
  GET_AFPS_QUERY,
  GET_CIUDADES_QUERY,
} from "../../grafql/graphql";
export { AddEditAsignacionAfp };
function AddEditAsignacionAfp({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(AsignacionAfpAtom);
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
  // Ciudades
  const [ciudades, setCiudades] = useState(null);
  const [showCiudad, setShowCiudad] = useState(false);
  const handleCloseCiudad = () => setShowCiudad(false);
  const handleShowCiudad = () => setShowCiudad(true);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState({
    id: "",
    nombre: "",
    divisionPolitica: {
      id: "",
      nombre: "",
      pais: {
        id: "",
        nombre: "",
      },
    },
  });
  const seleccionarCiudad = (ciudad) => {
    setCiudadSeleccionada(ciudad);
    setShowCiudad(false);
  };
  const ciudadId = ciudadSeleccionada?.id || "";

  // Afp
  const [afps, setAfps] = useState(null);
  const [showAfp, setShowAfp] = useState(false);
  const handleCloseAfp = () => setShowAfp(false);
  const handleShowAfp = () => setShowAfp(true);
  const [afpSeleccionada, setAfpSeleccionada] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarAfp = (afp) => {
    setAfpSeleccionada(afp);
    setShowAfp(false);
  };
  const afpId = afpSeleccionada?.id || "";
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
      const result = await client.query({
        query: GET_AFPS_QUERY,
        fetchPolicy: "network-only",
      });
      setAfps(result.data.afps);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: GET_CIUDADES_QUERY,
        fetchPolicy: "network-only",
      });
      setCiudades(result.data.ciudades);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    empleadoId: Yup.string().required("Empleado es requerido"),
    afpId: Yup.string().required("AFP es requerido"),
    ciudadId: Yup.string().required("Ciudad es requerido"),
    codigoAfp: Yup.string().required("Código AFP es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getAsignacionAfpById(id);
    }
    return userActions.resetAsignacionAfp;
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

      // Seleccionar AFP
      setAfpSeleccionada({
        id: aporte.afp.id,
        nombre: aporte.afp.nombre,
      });

      // Seleccionar ciudad
      setCiudadSeleccionada({
        id: aporte.ciudad.id,
        nombre: aporte.ciudad.nombre,
        divisionPoliticaId: aporte.ciudad.divisionPoliticaId,
        divisionPolitica: {
          id: aporte.ciudad.divisionPolitica.id,
          nombre: aporte.ciudad.divisionPolitica.nombre,
          paisId: aporte.ciudad.divisionPolitica.paisId,
          pais: {
            id: aporte.ciudad.divisionPolitica.pais.id,
            nombre: aporte.ciudad.divisionPolitica.pais.nombre,
          },
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
    await userActions.registrarAsignacionAfp(data);
    history.push("/gestionarAsignacionAfp");
    alertActions.success("Asignación AFP añadida");
  }
  async function updateAporte(id, data) {
    await userActions.updateAsignacionAfp(id, data);
    history.push("/gestionarAsignacionAfp");
    alertActions.success("Asignación AFP actualizada");
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
    setCiudadSeleccionada({
      id: "",
      nombre: "",
      divisionPolitica: {
        id: "",
        nombre: "",
        pais: {
          id: "",
          nombre: "",
        },
      },
    });
    setAfpSeleccionada({
      id: "",
      nombre: "",
    });
  };
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{mode.add ? "Agregar Asignación AFP" : "Editar Asignación AFP"}</h1>
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
              <Form.Group className="mb-3" controlId="formAFP">
                <Form.Label>AFP</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="afpId"
                      type="text"
                      value={`${afpSeleccionada.nombre}`}
                      {...register("afpId", {
                        value: afpId,
                      })}
                      className={`form-control ${
                        errors.afpId && afpSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.afpId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowAfp}>
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
                <Form.Label>Ciudad</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="ciudadId"
                      type="text"
                      value={`${ciudadSeleccionada.nombre} - ${ciudadSeleccionada.divisionPolitica.nombre}`}
                      {...register("ciudadId", {
                        value: ciudadId,
                      })}
                      className={`form-control ${
                        errors.ciudadId && ciudadSeleccionada.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.ciudadId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowCiudad}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formCodigoAfp">
                <Form.Label>Código AFP</Form.Label>
                <Form.Control
                  name="codigoAfp"
                  type="text"
                  {...register("codigoAfp")}
                  className={`form-control ${
                    errors.codigoAfp ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.codigoAfp?.message}
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
            <Link to="/gestionarAsignacionAfp" className="btn btn-link">
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
      <Modal show={showAfp} onHide={handleCloseAfp}>
        <Modal.Header>
          <Modal.Title>Buscar AFP</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>#</th>
                <th style={{ width: "80%" }}>Nombre</th>
                <th style={{ width: "10%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {afps?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarAfp(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!afps && (
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
          <Button variant="danger" onClick={handleCloseAfp}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={showCiudad} onHide={handleCloseCiudad}>
        <Modal.Header>
          <Modal.Title>Buscar Ciudad</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }}>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>#</th>
                <th style={{ width: "20%" }}>Ciudad</th>
                <th style={{ width: "20%" }}>Departamento</th>
                <th style={{ width: "20%" }}>País</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {ciudades
                ?.slice()
                .sort((a, b) => {
                  if (
                    a.divisionPolitica.pais.nombre <
                    b.divisionPolitica.pais.nombre
                  ) {
                    return -1;
                  }
                  if (
                    a.divisionPolitica.pais.nombre >
                    b.divisionPolitica.pais.nombre
                  ) {
                    return 1;
                  }
                  if (a.divisionPolitica.nombre < b.divisionPolitica.nombre) {
                    return -1;
                  }
                  if (a.divisionPolitica.nombre > b.divisionPolitica.nombre) {
                    return 1;
                  }
                  return 0;
                })
                .map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nombre}</td>
                    <td>{item.divisionPolitica.nombre}</td>
                    <td>{item.divisionPolitica.pais.nombre}</td>
                    <td>
                      <Button
                        onClick={() => seleccionarCiudad(item)}
                        className="btn btn-sm btn-succes"
                      >
                        Seleccionar
                      </Button>
                    </td>
                  </tr>
                ))}
              {!ciudades && (
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
          <Button variant="danger" onClick={handleCloseCiudad}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
