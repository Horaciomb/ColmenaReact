import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import colmena2 from '../assets/img/colmena3.png';

import { authAtom } from '_state';
import { useUserActions } from '_actions';

export { Nav };

function Nav() {
    const auth = useRecoilValue(authAtom);
    const userActions = useUserActions();

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className='container-fluid'>
                <NavLink exact to="/" className="navbar-brand mb-0 h1">
                    <img src={colmena2} alt="" width="30" height="24"></img>
                    Colmena
                </NavLink>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav me-auto'>
                        <li className='nav-item'>
                            <NavLink to="/users" className="nav-item me-2 nav-link">Usuarios</NavLink>
                        </li>
                        <li className='nav-item'>
                        <a href="" onClick={userActions.logout} className="nav-item nav-link">Salir</a>
                        </li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    );
}
