import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
//import { useRecoilValue } from "recoil";
import {Modal,Button, Form, Row, Col } from "react-bootstrap";
//import { CuentaBancariaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, {
  getCuentaBancariaQuery,
  GET_PERSONAS_QUERY,
  CUENTA_BANCARIA_VARIABLES,
} from "../../grafql/graphql";
export { AddEditCuentaBancaria };
function AddEditCuentaBancaria({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  //const aporte = useRecoilValue(CuentaBancariaAtom);
  const [dato, setDato] = useState({
    id: "",
    persona: {
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    },
    banco: {
      id: "",
      nombre: "",
      descripcion: "",
    },
    divisionPolitica: {
      id: "",
      nombre: "",
      pais: {
        id: "",
        nombre: "",
      },
    },
    tipoCuenta: {
      id: "",
      nombre: "",
    },
    nroCuenta: "",
  });
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
  const [bancos, setBancos] = useState(null);
  // Banco
  const [showBanco, setShowBanco] = useState(false);
  const handleCloseBanco = () => setShowBanco(false);
  const handleShowBanco = () => setShowBanco(true);
  const [bancoSeleccionado, setBancoSeleccionado] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });
  const seleccionarBanco = (banco) => {
    setBancoSeleccionado(banco);
    setShowBanco(false);
  };
  const bancoId = bancoSeleccionado?.id || "";
  // Departamento
  const [departamentos, setDepartamentos] = useState(null);
  const [showDepartamento, setShowDepartamento] = useState(false);
  const handleCloseDepartamento = () => setShowDepartamento(false);
  const handleShowDepartamento = () => setShowDepartamento(true);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState({
    id: "",
    nombre: "",
    pais: {
      id: "",
      nombre: "",
    },
  });
  const seleccionarDepartamento = (departamento) => {
    setDepartamentoSeleccionado(departamento);
    setShowDepartamento(false);
  };
  const divisionPoliticaId = departamentoSeleccionado?.id || "";
  // Tipo Cuenta
  const [tiposCuenta, setTiposCuenta] = useState(null);
  const [showTipoCuenta, setShowTipoCuenta] = useState(false);
  const handleCloseTipoCuenta = () => setShowTipoCuenta(false);
  const handleShowTipoCuenta = () => setShowTipoCuenta(true);
  const [tipoCuentaSeleccionado, setTipoCuentaSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarTipoCuenta = (tipoCuenta) => {
    setTipoCuentaSeleccionado(tipoCuenta);
    setShowTipoCuenta(false);
  };
  const tipoCuentaId = tipoCuentaSeleccionado?.id || "";
  // Obtener Datos
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
        query: CUENTA_BANCARIA_VARIABLES,
      });
      setBancos(result.data.bancos);
      setDepartamentos(result.data.divisionesPoliticas);
      setTiposCuenta(result.data.tipoCuentaBancarias);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // form validation rules
  const validationSchema = Yup.object().shape({
    personaId: Yup.string().required("Persona es requerido"),
    bancoId: Yup.string().required("Banco es requerido"),
    tipoCuentaId: Yup.string().required("Tipo de Cuenta es requerido"),
    divisionPoliticaId: Yup.string().required("Departamento es requerido"),
    nroCuenta: Yup.string().required("Número de Cuenta es requerido"),
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
      const result = await client.query(getCuentaBancariaQuery(id));
      setDato(result.data.cuentasBancaria);
      console.log(result.data.cuentasBancaria);
    }
    if (mode.edit) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && dato) {
      // Seleccionar persona
      setPersonaSeleccionada({
        id: dato.persona.id,
        nombre: dato.persona.nombre,
        apellidoPaterno: dato.persona.apellidoPaterno,
        apellidoMaterno: dato.persona.apellidoMaterno,
      });

      // Seleccionar Banco
      setBancoSeleccionado({
        id: dato.banco.id,
        nombre: dato.banco.nombre,
        descripcion: dato.banco.descripcion,
      });

      // Seleccionar Departamento
      setDepartamentoSeleccionado({
        id: dato.divisionPolitica.id,
        nombre: dato.divisionPolitica.nombre,
        pais: { nombre: dato.divisionPolitica.pais.nombre },
      });

      // Seleccionar tipo de cargo
      setTipoCuentaSeleccionado({
        id: dato.tipoCuenta.id,
        nombre: dato.tipoCuenta.nombre,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, dato]);
  useEffect(() => {
    if (mode.edit && dato) {
      reset(dato);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dato]);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(dato.id, data);
  }
  async function createAporte(data) {
    console.log(data);
    await userActions.registrarCuentaBancaria(data);
    history.push("/gestionarCuentasBancarias");
    alertActions.success("Cuenta Bancaria añadida");
  }
  async function updateAporte(id, data) {
    await userActions.updateCuentaBancaria(id, data);
    history.push("/gestionarCuentasBancarias");
    alertActions.success("Cuenta Bancaria actualizada");
  }
  const handleLimpiar = () => {
    reset(dato);
    setPersonaSeleccionada({
      id: "",
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
    });
    setBancoSeleccionado({
      id: "",
      nombre: "",
      descripcion: "",
    });
    setDepartamentoSeleccionado({
      id: "",
      nombre: "",
      pais: {
        nombre: "",
      },
    });
    setTipoCuentaSeleccionado({
      id: "",
      nombre: "",
    });
  };
  const loading = mode.edit && !dato;
  return (
    <>
      <h1>{mode.add ? "Agregar Cuenta Bancaria" : "Editar Cuenta Bancaria"}</h1>
      {!loading && (
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formPersona">
                <Form.Label>Persona</Form.Label>
                <Row>
                  <Col sm={10}>
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
              <Form.Group className="mb-3" controlId="formBanco">
                <Form.Label>Banco</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="bancoId"
                      type="text"
                      value={`${bancoSeleccionado.nombre} - ${bancoSeleccionado.descripcion}`}
                      {...register("bancoId", {
                        value: bancoId,
                      })}
                      className={`form-control ${
                        errors.bancoId && bancoSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.bancoId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowBanco}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Departamento</Form.Label>
                <Row>
                  <Col sm={10}>
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
                    <Button variant="info" onClick={handleShowDepartamento}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formTipoCuenta">
                <Form.Label>Tipo de Cuenta</Form.Label>
                <Row>
                  <Col sm={9}>
                    <Form.Control
                      disabled
                      name="tipoCuentaId"
                      type="text"
                      value={`${tipoCuentaSeleccionado.nombre}`}
                      {...register("tipoCuentaId", {
                        value: tipoCuentaId,
                      })}
                      className={`form-control ${
                        errors.tipoCuentaId && tipoCuentaSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.tipoCuentaId?.message}
                    </div>
                  </Col>
                  <Col sm={1}>
                    <Button variant="info" onClick={handleShowTipoCuenta}>
                      Buscar
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formnroCuenta">
                <Form.Label>Número de Cuenta</Form.Label>
                <Form.Control
                  name="nroCuenta"
                  type="text"
                  {...register("nroCuenta")}
                  className={`form-control ${
                    errors.nroCuenta ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.nroCuenta?.message}
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
            <Link to="/gestionarCuentasBancarias" className="btn btn-link">
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
      <Modal size="lg" show={showBanco} onHide={handleCloseBanco}>
        <Modal.Header>
          <Modal.Title>Buscar Banco</Modal.Title>
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
              {bancos?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarBanco(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!bancos && (
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
          <Button variant="danger" onClick={handleCloseBanco}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showDepartamento} onHide={handleCloseDepartamento}>
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
          <Button variant="danger" onClick={handleCloseDepartamento}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showTipoCuenta} onHide={handleCloseTipoCuenta}>
        <Modal.Header>
          <Modal.Title>Buscar Tipo de Cuenta</Modal.Title>
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
              {tiposCuenta?.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nombre}</td>
                  <td>
                    <Button
                      onClick={() => seleccionarTipoCuenta(item)}
                      className="btn btn-sm btn-succes"
                    >
                      Seleccionar
                    </Button>
                  </td>
                </tr>
              ))}
              {!tiposCuenta && (
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
          <Button variant="danger" onClick={handleCloseTipoCuenta}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
