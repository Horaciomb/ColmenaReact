import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';

import { personaAtom } from '_state';
import { useUserActions, useAlertActions } from '_actions';

export { AddEdit };

function AddEdit({ history, match }) {
    const { id } = match.params;
    const mode = { add: !id, edit: !!id };
    const userActions = useUserActions();
    const alertActions = useAlertActions();
    const persona = useRecoilValue(personaAtom);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        
        tratamiento: Yup.string()
            .required('Tratamiento es requerido'),
        nombre: Yup.string()
            .required('Nombre es requerido'),
        apellidoPaterno: Yup.string()
            .required('Apellido Paterno es requerido'),
        apellidoMaterno: Yup.string()
            .required('Apellido Materno es requerido'),
        genero: Yup.string()
            .required('Género es requerido'),
        fechaNac: Yup.string()
            .required('Fecha de Nacimiento es requerido'),
        paisNac: Yup.string()
            .required('País es requerido'),
        departamentoNac: Yup.string()
            .required('Departamento es requerido'),
        estadoCivil: Yup.string()
            .required('Estado Civil es requerido'),
        carnetIdentidad: Yup.string()
            .required('Carnet de Identidad es requerido'),
        foto: Yup.string()
            .required('Foto es requerido'),
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        // fetch user details into recoil state in edit mode
        if (mode.edit) {
            userActions.getPersonasId(id);
        }

        return userActions.resetPersona;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // set default form values after user set in recoil state (in edit mode)
        if (mode.edit && persona) {
            reset(persona);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [persona])

    function onSubmit(data) {
        return mode.add
            ? createPersona(data)
            : updatePersona(persona.id, data);
    }

    function createPersona(data) {
        return userActions.registrarPersona(data)
            .then(() => {
                history.push('/personas');
                alertActions.success('Persona añadida');
            });
    }

    function updatePersona(id, data) {
        return userActions.updatePersona(id, data)
            .then(() => {
                history.push('/personas');
                alertActions.success('Persona actualizada');
            });
    }

    const loading = mode.edit && !persona;
    return (
        <>
            <h1>{mode.add ? 'Agregar Persona' : 'Editar Persona'}</h1>
            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="form-row">
                        <div className="form-group col-1">
                            <label>Tratamiento</label>
                            <select name="tratamiento" {...register('tratamiento')} className='custom-select mr-sm-2'>
                                <option value="0">Sr.</option>
                                <option value="1">Sra.</option>
                                <option value="2">Srita.</option>
                            </select>
                            <div className="invalid-feedback">{errors.tratamiento?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Nombre</label>
                            <input name="nombre" type="text" {...register('nombre')} className={`form-control ${errors.nombre ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.nombre?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Apellido Paterno</label>
                            <input name="apellidoPaterno" type="text" {...register('apellidoPaterno')} className={`form-control ${errors.apellidoPaterno ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.apellidoPaterno?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Apellido Materno</label>
                            <input name="apellidoMaterno" type="text" {...register('apellidoMaterno')} className={`form-control ${errors.apellidoMaterno ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.apellidoMaterno?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Carnet de Identidad</label>
                            <input name="carnetIdentidad" placeholder='0' type="text" {...register('carnetIdentidad')} className={`form-control ${errors.carnetIdentidad ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.carnetIdentidad?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Estado Civil</label>
                            <select name="estadoCivil" {...register('estadoCivil')} className='custom-select mr-sm-2'>
                                <option value="0">Soltero</option>
                                <option value="1">Casado</option>
                                <option value="2">Viudo</option>
                                <option value="3">Divorciado</option>
                                <option value="4">Concubino</option>
                            </select>
                            <div className="invalid-feedback">{errors.estadoCivil?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Género</label>
                            <select name="genero" {...register('genero')} className='custom-select mr-sm-2'>
                                <option value="0">Masculino</option>
                                <option value="1">Femenino</option>
                                <option value="2">Otro</option>
                                <option value="3">NoEspecífico</option>
                            </select>
                            <div className="invalid-feedback">{errors.genero?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Fecha de Nacimiento</label>
                            <input name="fechaNac" type="date" {...register('fechaNac')} className={`form-control ${errors.fechaNac ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.fechaNac?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>País</label>
                            <input name="paisNac" type="text" {...register('paisNac')} className={`form-control ${errors.paisNac ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.paisNac?.message}</div>
                        </div>
                        <div className="form-group col">
                            <label>Departamento</label>
                            <input name="departamentoNac" type="text" {...register('departamentoNac')} className={`form-control ${errors.departamentoNac ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.departamentoNac?.message}</div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-5">
                            <label>Foto</label>
                            <input name="foto" type="file" {...register('foto')} className={`form-control ${errors.foto ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.foto?.message}</div>
                        </div>  
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset(persona)} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/personas" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            }
            {loading &&
                <div className="text-center p-3">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
        </>
    );
}