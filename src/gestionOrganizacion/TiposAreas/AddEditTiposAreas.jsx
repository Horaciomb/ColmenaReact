import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, { GRUPO_AREAS_QUERY } from "../../grafql/graphql";
import { TipoAreaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import TablaModal from "_components/TablaModal";
export { AddEditTiposAreas };
function AddEditTiposAreas({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const tipoArea = useRecoilValue(TipoAreaAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [grupoAreas, setGrupoAreas] = useState(null);
  const [grupoAreaSeleccionado, setgrupoAreaSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarGrupoArea = (grupoArea) => {
    setgrupoAreaSeleccionado(grupoArea);
    setShow(false);
    console.log(grupoAreaSeleccionado);
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
        query: GRUPO_AREAS_QUERY,
      });
      setGrupoAreas(result.data.grupoAreas);
      setDatos(result.data.grupoAreas);
      setData(transformarDatos(result.data.grupoAreas));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    grupoAreaId: Yup.string().required("Grupo Área es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getTipoAreaById(id);
    }
    return userActions.resetTipoArea;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && tipoArea) {
      const grupoArea = tipoArea.grupoArea;
      const item = {
        id: grupoArea.id,
        nombre: grupoArea.nombre,
      };
      setgrupoAreaSeleccionado(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, tipoArea]);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && tipoArea) {
      reset(tipoArea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoArea]);
  function onSubmit(data) {
    return mode.add ? createPersona(data) : updatePersona(tipoArea.id, data);
  }
  async function createPersona(data) {
    //console.log(data);
    try {
      await userActions.registrarTipoArea(data);
      history.push("/gestionarTiposAreas");
      alertActions.success("Tipo Área añadida");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear el Tipo Área");
    }
  }

  async function updatePersona(id, data) {
    await userActions.updateTipoArea(id, data);
    history.push("/gestionarTiposAreas");
    alertActions.success("Tipo Área actualizada");
  }
  const handleLimpiar = () => {
    reset(tipoArea);
    setgrupoAreaSeleccionado({
      id: "",
      nombre: "",
    });
  };

  const loading = mode.edit && !tipoArea;
  const grupoAreaId = grupoAreaSeleccionado?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Tipo Área" : "Editar Tipo Área"}</h1>
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
                <Form.Label>Grupo Área</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="grupoAreaId"
                      type="text"
                      value={`${grupoAreaSeleccionado?.nombre}`}
                      {...register("grupoAreaId", {
                        value: grupoAreaId,
                      })}
                      className={`form-control ${
                        errors.grupoAreaId && grupoAreaSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.grupoAreaId?.message}
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
            <Link to="/gestionarTiposAreas" className="btn btn-link">
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
          <Modal.Title>Buscar Grupo Área</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal data={data} columns={columns} datos={datos} handleClick={seleccionarGrupoArea
          } />
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
