import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";

import { SalarioMinimoAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditSalarioMinimo };
function AddEditSalarioMinimo({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(SalarioMinimoAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    monto: Yup.string().required("Monto es requerido"),
    fechaInicio: Yup.string().required("Fecha Inicial es requerida"),
    fechaFin: Yup.string().required("Fecha Final es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (mode.edit) {
      userActions.getSalarioMinimoById(id);
    }
    return userActions.resetSalarioMinimo;
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
    await userActions.resgistrarSalarioMinimo(data);
    history.push("/gestionarSalarioMinimo");
    alertActions.success("Monto Salario Mínimo añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateSalarioMinimo(id, data);
    history.push("/gestionarSalarioMinimo");
    alertActions.success(
      "Monto Salario Mínimo actualizado"
    );
  }
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Monto Salario Mínimo`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Monto</label>
              <input
                name="monto"
                type="number"
                {...register("monto")}
                className={`form-control ${
                  errors.monto ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.monto?.message}
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
              to="/gestionarSalarioMinimo"
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