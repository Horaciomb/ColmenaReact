import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import {  Form, Row, Col } from "react-bootstrap";
import { BancoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, { getBancoQuery } from "../../grafql/graphql";
export { AddEditBancos };
function AddEditBancos({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const [dato, setDato] = useState({
    id: "",
    nombre: "",
    descripcion: "",
  });
  const alertActions = useAlertActions();
  const banco = useRecoilValue(BancoAtom);

  // form validation rules
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    descripcion: Yup.string().required("Descripción es requerido"),
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
      const result = await client.query(getBancoQuery(id));
      setDato(result.data.banco);
      console.log(result.data.banco);
    }
    if (mode.edit) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && dato) {
      reset(dato);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dato]);
  function onSubmit(data) {
    return mode.add ? createPersona(data) : updatePersona(dato.id, data);
  }

  async function createPersona(data) {
    console.log(data);
    try {
      await userActions.registrarBanco(data);
      history.push("/gestionarBancos");
      alertActions.success("Banco añadido");
    } catch (error) {
      console.error(error);
      alertActions.error("Hubo un error al crear la persona");
    }
  }

  async function updatePersona(id, data) {
    await userActions.updateBanco(id, data);
    history.push("/gestionarBancos");
    alertActions.success("Banco actualizado");
  }
  const handleLimpiar = () => {
    reset(banco);
  };

  const loading = mode.edit && !dato;
  return (
    <>
      <h1>{mode.add ? "Agregar Banco" : "Editar Banco"}</h1>
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
                <div className="invalid-feedback">
                  {errors.descripcion?.message}
                </div>
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
            <Link to="/gestionarBancos" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </Form>
      )}
      {loading && (
        <div className="text-center p-3">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
      )}
    </>
  );
}
