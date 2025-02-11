import React from "react";
import { useState } from "react";
import colmena3 from "../../assets/img/colmena3.png";
import { FaUserTie } from "react-icons/fa";
import { BsCashCoin } from "react-icons/bs";
import { IoPieChart } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa";
import { IoAccessibility } from "react-icons/io5";
import { AiOutlineRadarChart } from "react-icons/ai";
import { GiExitDoor } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authAtom } from "_state";
import { useUserActions } from "_actions";

function SideBar() {
  const auth = useRecoilValue(authAtom);
  const userActions = useUserActions();
  const userRoles = auth?.roles || [];
  const isAdmin = userRoles.includes("app-gerenteGeneral");
  const isAnalistaPersonal = userRoles.includes("app-analistaPersonal");
  const isGerenteRRHH = userRoles.includes("app-gerenteRRHH");
  const isResponsablePayRoll = userRoles.includes("app-responsablePayRoll");


  const [open, setOpen] = useState(true);
  let modulos = [];

  if (isAdmin) {
    modulos = [
      {
        title: "Gestión de Personal",
        link: "/gestionPersonal",
        logo: <FaUserTie size={25} />,
      },
      {
        title: "PayRoll",
        link: "/payRoll",
        logo: <BsCashCoin size={25} />,
      },
      {
        title: "KPI",
        link: "/kpi",
        logo: <IoPieChart size={25} />,
      },
      {
        title: "Gestión de Organización",
        link: "/gestionOrganizacion",
        logo: <FaBuilding size={25} />,
      },
      {
        title: "Gestión de Capacitación",
        link: "/gestionCapacitacion",
        logo: <IoAccessibility size={25} />,
      },
      {
        title: "Desarrollo de Personal",
        link: "/desarrolloPersonal",
        logo: <AiOutlineRadarChart size={25} />,
      },
    ];
  } else if (isAnalistaPersonal) {
    modulos = [
      {
        title: "Gestión de Personal",
        link: "/gestionPersonal",
        logo: <FaUserTie size={25} />,
      },
      {
        title: "Gestión de Organización",
        link: "/gestionOrganizacion",
        logo: <FaBuilding size={25} />,
      },
    ];
  } else if (isGerenteRRHH) {
    modulos = [
      {
        title: "KPI",
        link: "/kpi",
        logo: <IoPieChart size={25} />,
      },
      {
        title: "Gestión de Capacitación",
        link: "/gestionCapacitacion",
        logo: <IoAccessibility size={25} />,
      },
      {
        title: "Desarrollo de Personal",
        link: "/desarrolloPersonal",
        logo: <AiOutlineRadarChart size={25} />,
      },
    ];
  } else if (isResponsablePayRoll) {
    modulos = [
      {
        title: "PayRoll",
        link: "/payRoll",
        logo: <BsCashCoin size={25} />,
      },
    ];
  }
  // only show nav when logged in
  if (!auth) return null;
  return (
    <div
      className={`col-2 vh-100 text-white relative sidebar position-fixed`}
    >
      <NavLink
        to="/"
        className="d-flex align-items-center font-weight-bold gap-2 py-3 mx-3 text-white text-decoration-none"
      >
        <img src={colmena3} alt="" width={45} />
        <span className="text-xl">Colmena</span>
      </NavLink>
      <div className="d-flex flex-column">
        <ul className="list-unstyled whitespace-pre px-2.5 text-sm py-5 d-flex flex-column gap-1 font-weight-bold overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100 md:h-68 h-70">
          {modulos.map((modulo) => (
            <li key={modulo.link} className="mb-3">
              <NavLink
                to={modulo.link}
                className="link text-white d-flex align-items-center"
              >
                <span className="mr-2">{modulo.logo}</span>
                {modulo.title}
              </NavLink>
            </li>
          ))}
          {/* Contenido de la lista */}
        </ul>
        <div className="d-flex align-items-center mb-2">
          <GiExitDoor className="mr-2" size={25} />
          <NavLink
            to=""
            onClick={userActions.logout}
            className="link text-xl text-white text-decoration-none "
          >
            Salir
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
