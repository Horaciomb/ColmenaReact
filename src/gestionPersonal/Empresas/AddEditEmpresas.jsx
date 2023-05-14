import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRecoilValue } from "recoil";
import { empresaAtom } from "_state";
import { useUserActions, useAlertActions } from "_actions";
export { AddEditEmpresas };
function AddEditEmpresas({ history, match }) {
  const { id } = match.params;
  const mode = { add: !id, edit: !!id };
  const userActions = useUserActions();
  const alertActions = useAlertActions();
  const aporte = useRecoilValue(empresaAtom);
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
    if (mode.edit) {
      userActions.getEmpresaId(id);
    }
    return userActions.resetEmpresa;
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
    await userActions.registrarEmpresa(data);
    history.push("/gestionarEmpresas");
    alertActions.success("Empresa añadida");
  }
  async function updateAporte(id, data) {
    await userActions.updateEmpresa(id, data);
    history.push("/gestionarEmpresas");
    alertActions.success("Empresa actualizada");
  }
  const loading = mode.edit && !aporte;
  return (
    <>
      <h1>{`${mode.add ? "Agregar" : "Editar"} Empresa`}</h1>
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group col">
              <label>Nombre</label>
              <input
                name="nombre"
                type="text"
                {...register("nombre")}
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.nombre?.message}</div>
            </div>
            <div className="form-group col">
              <label>Descripción</label>
              <input
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
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label>Nit</label>
              <input
                name="nit"
                type="text"
                {...register("nit")}
                className={`form-control ${errors.nit ? "is-invalid" : ""}`}
              />
            </div>
            <div className="form-group col">
              <label>Registro Patronal</label>
              <input
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
            <Link to="/gestionarEmpresas" className="btn btn-link">
              Cancelar
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
