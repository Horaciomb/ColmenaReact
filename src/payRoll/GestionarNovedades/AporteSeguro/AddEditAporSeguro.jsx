import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";

import { AporteSeguroAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";

export { AddEditAporSeguro };
function AddEditAporSeguro({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(AporteSeguroAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    porcentaje: Yup.string().required("Porcentaje es requerido"),
    fechaInicio: Yup.string().required("Fecha Inicial es requerida"),
    fechaFin: Yup.string().required("Fecha Final es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (mode.edit) {
      userActions.getAporteSeguroId(id);
    }
    return userActions.resetAporteSeguro;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    await userActions.registrarAporteSeguro(data);
    history.push("/gestionarAporteSeguro");
    alertActions.success("Porcentaje de Aporte Seguro a Corto Plazo añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateAporteSeguro(id, data);
    history.push("/gestionarAporteSeguro");
    alertActions.success(
      "Porcentaje de Aporte Seguro a Corto Plazo actualizado"
    );
  }
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Aporte Seguro a Corto Plazo`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Porcentaje</label>
              <input
                name="porcentaje"
                type="text"
                {...register("porcentaje")}
                className={`form-control ${
                  errors.porcentaje ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.porcentaje?.message}
              </div>
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
              onClick={() => reset(aporte)}
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Reseter
            </button>
            <Link
              to="/gestionarAporteSeguro"
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
