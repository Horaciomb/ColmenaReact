import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, { ROL_MAPAGRAMAS_QUERY } from "../../grafql/graphql";
import { AreaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import TablaModal from "_components/TablaModal"; 
export { AddEditAreas };
function AddEditAreas({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const area = useRecoilValue(AreaAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const [rolMapagrama, setRolMapagrama] = useState(null);
  const [rolMapagramaSeleccionado, setRolMapagramaSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarRolMapagrama = (rolMapagrama) => {
    setRolMapagramaSeleccionado(rolMapagrama);
    setShow(false);
    console.log(rolMapagramaSeleccionado);
  };
  // Para Modal
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState([]);
  const columns = [
    {
      header: "Nombre",
      accessorKey: "nombre",
    },
  ];
  function transformarDatos(datos) {
    return datos.map((item) => ({
      id: item.id,
      nombre: item.nombre,
    }));
  }
  useEffect(() => {
    async function getData() {
      const result = await client.query({
        query: ROL_MAPAGRAMAS_QUERY,
      });
      //console.log(result.data);
      //setRolMapagrama(result.data.rolMapagramas);
      setDatos(result.data.rolMapagramas);
      setData(transformarDatos(result.data.rolMapagramas));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    objetivo: Yup.string().required("Objetivo es requerido"),
    rolMapagramaId: Yup.string().required("Rol Mapagrama es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getAreaById(id);
    }
    return userActions.resetArea;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && area) {
      const rolMapagrama = area.rolMapagrama;
      const item = {
        id: rolMapagrama.id,
        nombre: rolMapagrama.nombre,
      };
      setRolMapagramaSeleccionado(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, area]);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && area) {
      reset(area);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);
  function onSubmit(data) {
    return mode.add ? createArea(data) : updateArea(area.id, data);
  }
  async function createArea(data) {
    data.empresaId=1;
    console.log(data);
    
    try {
      await userActions.registrarArea(data);
      history.push("/gestionarAreas");
      alertActions.success("Área añadida");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear el Área");
    }
  }

  async function updateArea(id, data) {
    await userActions.updateArea(id, data);
    history.push("/gestionarAreas");
    alertActions.success("Área actualizada");
  }
  const handleLimpiar = () => {
    reset(area);
    setRolMapagramaSeleccionado({
      id: "",
      nombre: "",
    });
  };

  const loading = mode.edit && !area;
  const rolMapagramaId = rolMapagramaSeleccionado?.id || "";
  // console.log(client.query(getRolMapagramasQuery()));
  return (
    <>
      <h1>{mode.add ? "Agregar Área" : "Editar Área"}</h1>
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
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Objetivo</Form.Label>
                <Form.Control
                  name="objetivo"
                  type="text"
                  {...register("objetivo")}
                  className={`form-control ${
                    errors.objetivo ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.objetivo?.message}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Rol Mapagrama</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="rolMapagramaId"
                      type="text"
                      value={`${rolMapagramaSeleccionado?.nombre}`}
                      {...register("rolMapagramaId", {
                        value: rolMapagramaId,
                      })}
                      className={`form-control ${
                        errors.rolMapagramaId &&
                        rolMapagramaSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.rolMapagramaId?.message}
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
            <Link to="/gestionarAreas" className="btn btn-link">
              Cancelar
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
          <Modal.Title>Buscar Rol Mapagrama</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal
            data={data}
            columns={columns}
            datos={datos}
            handleClick={seleccionarRolMapagrama}
          />
          {/* <table className="table table-striped ">
            <thead>
              <tr>
                <th style={{ width: "80%" }}>Nombre</th>
                <th style={{ width: "20%" }}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {grupoAreas?.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>
                      <Button
                        onClick={() => seleccionarGrupoArea(item)}
                        className="btn btn-sm btn-succes"
                      >
                        Seleccionar
                      </Button>
                    </td>
                  </tr>
                ))}
              {!grupoAreas && (
                <tr>
                  <td colSpan="4" className="text-center">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                  </td>
                </tr>
              )}
            </tbody>
          </table> */}
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
