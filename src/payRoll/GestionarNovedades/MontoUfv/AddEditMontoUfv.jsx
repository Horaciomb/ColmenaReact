import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { MontoUfvAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditMontoUfv };
function AddEditMontoUfv({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(MontoUfvAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    monto: Yup.string().required("Monto es requerido"),
    fecha: Yup.string().required("Fecha es requerida"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;
  useEffect(() => {
    if (mode.edit) {
      userActions.getMonteUfvById(id);
    }
    return userActions.resetMontoUfv;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
      const formattedAporte = {
        ...aporte,
        fecha: dayjs(aporte.fecha).format("YYYY-MM-DD"),      
      };
      reset(formattedAporte);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(aporte.id, data);
  }
  async function createAporte(data) {
    await userActions.resgistrarMontoUfv(data);
    history.push("/gestionarMontoUfv");
    alertActions.success("Monto UFV añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateMontoUfv(id, data);
    history.push("/gestionarMontoUfv");
    alertActions.success("Monto UFV actualizado");
  }
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Monto UFV`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
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
              <label>Fecha</label>
              <input
                name="fecha"
                type="date"
                {...register("fecha")}
                className={`form-control ${
                  errors.fecha ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.fecha?.message}
              </div>
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
              Resetear
            </button>
            <Link to="/gestionarMontoUfv" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
