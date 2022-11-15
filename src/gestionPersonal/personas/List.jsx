import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { personasAtom } from '_state';
import { useUserActions } from '_actions';

export { List };

function List({ match }) {
    const { path } = match;
    const personas = useRecoilValue(personasAtom);
    const userActions = useUserActions();

    useEffect(() => {
        userActions.getPersonas();
        
        return userActions.resetPersonas;
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h1 >Gestionar Personas</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Agregar Persona</Link>
            <table className="table table-striped ">
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Perfil</th>
                        <th style={{ width: '20%' }}>Nombre</th>                       
                        <th style={{ width: '20%' }}>Apellido</th>
                        <th style={{ width: '20%' }}>CI</th>
                        <th style={{ width: '20%' }}>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas?.map(persona =>
                        <tr key={persona.id}>
                            
                            <td className="pt-1 px-0">
                            <div className="user-avatar lg-avatar me-3 center">
                                <img className="rounded-circle border-white " src={persona.foto} alt="img" width="80" height="80" />
                            </div>
                                
                            </td>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellidoPaterno}</td>
                            <td>{persona.carnetIdentidad}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/ver/${persona.id}`} className="btn btn-sm btn-success mr-1">Ver</Link>
                                <Link to={`${path}/edit/${persona.id}`} className="btn btn-sm btn-primary mr-1">Editar</Link>
                                <button onClick={() => userActions.delete(persona.id)} className="btn btn-sm btn-danger" style={{ width: '70px' }} disabled={persona.isDeleting}>
                                    {persona.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Eliminar</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!personas &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}