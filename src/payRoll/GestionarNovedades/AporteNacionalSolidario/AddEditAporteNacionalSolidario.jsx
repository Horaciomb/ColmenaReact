import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { AporteNacionalSolidarioAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditAporteNacionalSolidario };
function AddEditAporteNacionalSolidario({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(AporteNacionalSolidarioAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    totalCotizableMin: Yup.string().required("Monto Mínimo  es requerido"),
    totalCotizableMax: Yup.string().required("Monto Máximo es requerido"),
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
      userActions.getAporteNacionalSolidarioId(id);
    }
    return userActions.resetAporteNacionalSolidario;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
        //console.log(aporte);
        const formattedAporte = {
          ...aporte,
          fechaInicio: dayjs(aporte.fechaInicio).format("YYYY-MM-DD"),
          fechaFin: dayjs(aporte.fechaFin).format("YYYY-MM-DD"),
        };
        reset(formattedAporte);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aporte]);
  function onSubmit(data) {
    return mode.add ? createAporte(data) : updateAporte(aporte.id, data);
  }
  async function createAporte(data) {
    await userActions.resgistrarAporteNacionalSolidario(data);
    history.push("/gestionarAporteNacionalSolidario");
    alertActions.success("Porcentaje de Aporte Nacional Solidario añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateAporteNacionalSolidario(id, data);
    history.push("/gestionarAporteNacionalSolidario");
    alertActions.success("Porcentaje de Aporte Nacional Solidario actualizado");
  }
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Aporte Nacional Solidario`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col-md-3 col-sm-6">
              <label>Monto Mínimo</label>
              <input
                name="totalCotizableMin"
                type="number"
                {...register("totalCotizableMin")}
                className={`form-control ${
                  errors.totalCotizableMin ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.totalCotizableMin?.message}
              </div>
            </div>
            <div className="form-group col-md-3 col-sm-6">
              <label>Monto Máximo</label>
              <input
                name="totalCotizableMax"
                type="number"
                {...register("totalCotizableMax")}
                className={`form-control ${
                  errors.totalCotizableMax ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.totalCotizableMax?.message}
              </div>
            </div>
            <div className="form-group col-md-3 col-sm-6">
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
            <div className="form-group col-md-3 col-sm-6">
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
            <div className="form-group col-md-3 col-sm-6">
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
              Resetear
            </button>
            <Link
              to="/gestionarAporteNacionalSolidario"
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
