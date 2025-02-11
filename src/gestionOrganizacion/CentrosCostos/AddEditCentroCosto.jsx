import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import client, { GET_AREAS_QUERY } from "../../grafql/graphql";
import { CentroCostoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import TablaModal from "_components/TablaModal";
export { AddEditCentroCosto };
function AddEditCentroCosto({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const centroCosto = useRecoilValue(CentroCostoAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [areaSeleccionado, setAreaSeleccionado] = useState({
    id: "",
    nombre: "",
  });
  const seleccionarArea = (area) => {
    setAreaSeleccionado(area);
    setShow(false);
    console.log(areaSeleccionado);
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
        query: GET_AREAS_QUERY,
      });
      //console.log(result.data);
      setDatos(result.data.areas);
      setData(transformarDatos(result.data.areas));
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    areaId: Yup.string().required("Área es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      userActions.getCentroCostoById(id);
    }
    return userActions.resetCentroCosto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && centroCosto) {
      const area = centroCosto.area;
      const item = {
        id: area.id,
        nombre: area.nombre,
      };
      setAreaSeleccionado(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode.edit, centroCosto]);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && centroCosto) {
      reset(centroCosto);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centroCosto]);
  function onSubmit(data) {
    return mode.add ? createcentroCosto(data) : updatecentroCosto(centroCosto.id, data);
  }
  async function createcentroCosto(data) {
    //data.empresaId=1;
    console.log(data);
    
    try {
      await userActions.registrarCentroCosto(data);
      history.push("/gestionarCentroCostos");
      alertActions.success("Centro de Costo añadido");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear el Centro de Costo");
    }
  }

  async function updatecentroCosto(id, data) {
    await userActions.updateCentroCosto(id, data);
    history.push("/gestionarCentroCostos");
    alertActions.success("Centro de Costo actualizado");
  }
  const handleLimpiar = () => {
    reset(centroCosto);
    setAreaSeleccionado({
      id: "",
      nombre: "",
    });
  };

  const loading = mode.edit && !centroCosto;
  const areaId = areaSeleccionado?.id || "";
  return (
    <>
      <h1>{mode.add ? "Agregar Centro de Costo" : "Editar Centro de Costo"}</h1>
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
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  name="descripcion"
                  type="text"
                  {...register("descripcion")}
                  className={`form-control ${
                    errors.descripcion ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.descripcion?.message}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Presupuesto Asignado</Form.Label>
                <Form.Control
                  name="presupuestoAsignado"
                  type="text"
                  {...register("presupuestoAsignado")}
                  className={`form-control ${
                    errors.presupuestoAsignado ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">{errors.presupuestoAsignado?.message}</div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Área</Form.Label>
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      disabled
                      name="areaId"
                      type="text"
                      value={`${areaSeleccionado?.nombre}`}
                      {...register("areaId", {
                        value: areaId,
                      })}
                      className={`form-control ${
                        errors.areaId &&
                        areaSeleccionado.id === ""
                          ? "is-invalid"
                          : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.areaId?.message}
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
            <Link to="/gestionarCentroCostos" className="btn btn-link">
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
          <Modal.Title>Buscar Área</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TablaModal
            data={data}
            columns={columns}
            datos={datos}
            handleClick={seleccionarArea}
          />
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
