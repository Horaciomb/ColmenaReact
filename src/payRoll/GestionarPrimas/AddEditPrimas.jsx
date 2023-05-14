import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { primaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditPrimas };
function AddEditPrimas({ history, match }) {
  const { id } = match.params;

  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const prima = useRecoilValue(primaAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    anio: Yup.string().required("Año es requerido"),
    porcentaje: Yup.string().required("Porcentaje es requerido"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (mode.edit) {
      userActions.getPrimaId(id);
    }
    return userActions.resetPrima;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && prima) {
      reset(prima);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prima]);
  function onSubmit(data) {
    return mode.add ? createPrima(data) : updatePrima(prima.id, data);
  }
  async function createPrima(data) {
    await userActions.registrarPrima(data);
    history.push("/gestionarPrimas");
    alertActions.success("Prima añadida");
  }
  async function updatePrima(id, data) {
    await userActions.updatePrima(id, data);
    history.push("/gestionarPrimas");
    alertActions.success("Prima actualizada");
  }
  const loading = mode.edit && !prima;
  return (
    <>
      <h1>{mode.add ? "Agregar Prima" : "Editar Prima"}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Año</label>
              <input
                name="anio"
                type="text"
                {...register("anio")}
                className={`form-control ${errors.anio ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.anio?.message}</div>
            </div>
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
              <div className="invalid-feedback">{errors.porcentaje?.message}</div>
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
              Save
            </button>
            <button
              onClick={() => reset(prima)}
              type="button"
              disabled={isSubmitting}
              className="btn btn-secondary"
            >
              Reset
            </button>
            <Link to="/gestionarPrimas" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
