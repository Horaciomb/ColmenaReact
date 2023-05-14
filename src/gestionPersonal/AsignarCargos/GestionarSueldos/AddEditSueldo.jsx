import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
//import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { SueldoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditSueldo };
function AddEditSueldo({ history, match }) {
  const { idSueldo, idContrato } = useParams();
  const mode = { add: !idSueldo, edit: !!idSueldo };
  //console.log(idContrato);
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const sueldo = useRecoilValue(SueldoAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    tipoSueldoId: Yup.string().required("Tipo Sueldo es requerido"),
    monto: Yup.string().required("Monto es requerido"),
    fechaInicio: Yup.string().required("Fecha Inicio es requerida"),
    fechaFin: Yup.string().required("Fecha Fin es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (mode.edit) {
      userActions.getSueldoById(idSueldo);
    }
    return userActions.resetSueldo;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(sueldo);
  }, [sueldo]);
  useEffect(() => {
    if (mode.edit && sueldo) {
      reset(sueldo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sueldo]);
  function onSubmit(data) {
    return mode.add ? createAporte(data,idContrato) : updateAporte(sueldo.id, data);
  }
  async function createAporte(data,idContrato) {
    data.contratoId = (`${idContrato}`); // Añadir el campo contratoId a data
    //console.log(data);
    //console.log(idContrato);
    await userActions.registrarSueldo(data);
    history.push(`/gestionarSuledos/${idContrato}`);
    alertActions.success("Sueldo añadido");
  }
  async function updateAporte(ide, data) {
    console.log(data);
    await userActions.updateSueldo(ide, data);
    history.push(`/gestionarSuledos/${idContrato}`);
    alertActions.success("Sueldo actualizado");
  }
  const handleLimpiar = () => {
    reset(sueldo);
  };
  const loading = mode.edit && !sueldo;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Sueldo`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Tipo Sueldo</label>
              <select
                name="tipoSueldoId"
                {...register("tipoSueldoId")}
                className="custom-select mr-sm-2"
              >
                <option value="1">Incorporación</option>
                <option value="2">Incremento Discresional</option>
                <option value="3">Incremento Masivo</option>
                <option value="4">Decremento Salarial</option>
              </select>
              <div className="invalid-feedback">
                {errors.tipoSueldoId?.message}
              </div>
            </div>
            <div className="form-group col">
              <label>Monto</label>
              <input
                name="monto"
                type="text"
                {...register("monto")}
                className={`form-control ${errors.monto ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.monto?.message}</div>
            </div>
            <div className="form-group col">
              <label>Fecha Inicial</label>
              <input
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
            </div>
            <div className="form-group col">
              <label>Fecha Final</label>
              <input
                name="fechaFin"
                type="date"
                {...register("fechaFin")}
                className={`form-control ${
                  errors.fechaFin ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.fechaFin?.message}</div>
            </div>
          </div>
          <div className="form-group">
            <button
              type="submit"
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
            <Link
              to={`/gestionarSuledos/${idContrato}`}
              className="btn btn-link"
            >
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
