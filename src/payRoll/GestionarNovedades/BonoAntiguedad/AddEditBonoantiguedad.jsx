import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { BonoAntigedadPorcentajeAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditBonoantiguedad };
function AddEditBonoantiguedad({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(BonoAntigedadPorcentajeAtom);
  // form validation rules
  const validationSchema = Yup.object().shape({
    aniosDeAntiguedad: Yup.string().required("Año de Antigüedad es requerido"),
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
      userActions.getBonoAntiguedadesById(id);
    }
    return userActions.resetBonoAntiguedad;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (mode.edit && aporte) {
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
    await userActions.registrarBonoAntiguedad(data);
    history.push("/gestionarBonoAntiguedad");
    alertActions.success("Porcentaje de Bono de Antigüedad añadido");
  }
  async function updateAporte(id, data) {
    await userActions.updateBonoAntiguedad(id, data);
    history.push("/gestionarBonoAntiguedad");
    alertActions.success("Porcentaje de Bono de Antigüedad actualizado");
  }
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Bono de Antigüedad`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Año de Antigüedad</label>
              <input
                name="aniosDeAntiguedad"
                type="number"
                {...register("aniosDeAntiguedad")}
                className={`form-control ${
                  errors.aniosDeAntiguedad ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {errors.aniosDeAntiguedad?.message}
              </div>
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
              Resetear
            </button>
            <Link to="/gestionarBonoAntiguedad" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
