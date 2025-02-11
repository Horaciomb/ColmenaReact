import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { useRecoilValue } from "recoil";
// import { empresaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
import client, { getEmpresaQuery } from "../../grafql/graphql";
import { Form, Row, Col } from "react-bootstrap";
export { PerfilEmpresa };
function PerfilEmpresa({ idEmpresa }) {
  const userActions = useUserActions();
  const [empresa, setEmpresa] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    nit: "",
    regPatronal: "",
  });
  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("Nombre es requerido"),
    descripcion: Yup.string().required("Descripción es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const alertActions = useAlertActions();
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (empresa) {
      reset(empresa);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [empresa]);
  async function getData() {
    const result = await client.query(getEmpresaQuery(idEmpresa));
    setEmpresa(result.data.empresa);
    //console.log(result.data.empresa);
  }
  async function onSubmit(data) {
    return  await updateEmpresa(idEmpresa, data);
  }
  async function updateEmpresa(id, data) {
    //console.log(id, data);
    //console.log(empresa);
    await userActions.updateEmpresa(id, data);
    //history.push("/gestionOrganizacion");
    alertActions.success("Empresa actualizada");
    getData();
  }
  const loading = !empresa;
  return (
    <div>
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
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>NIT</Form.Label>
                <Form.Control
                  name="nit"
                  type="text"
                  {...register("nit")}
                  className={`form-control ${errors.nit ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.nit?.message}</div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicFechaFin">
                <Form.Label>Registro Patronal</Form.Label>
                <Form.Control
                  name="regPatronal"
                  type="text"
                  {...register("regPatronal")}
                  className={`form-control ${
                    errors.regPatronal ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.regPatronal?.message}
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
              
              <Link to="/gestionOrganizacion" className="btn btn-link">
                Cancelar
              </Link>
            </div>
          </Row>
        </Form>
      )}
      {loading && (
        <div className="text-center p-3">
          <span className="spinner-border spinner-border-lg align-center"></span>
        </div>
      )}
    </div>
  );
}
