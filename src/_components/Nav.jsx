import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import colmena2 from "../assets/img/colmena3.png";
import { GiExitDoor } from "react-icons/gi";
import { authAtom } from "_state";
import { useUserActions } from "_actions";

export { Nav };

function Nav() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();

  // only show nav when logged in
  if (!auth) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <NavLink exact to="/" className="navbar-brand mb-0 h1 text-white">
          <img src={colmena2} alt="" width="30" height="24"></img>
          Colmena
        </NavLink>
        <div >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a
                href=""
                onClick={userActions.logout}
                className="nav-link logout-link text-white align-items-center"
              >
                <GiExitDoor className="mr-1" size={25} />
                <span>Salir</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
