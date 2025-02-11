import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const SubMenu = ({ data }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <li className="nav-item">
        <div
          className="nav-link"
          onClick={() => setSubMenuOpen(!subMenuOpen)}
        >
          <data.icon size={23} className="min-w-max" />
          <span className="flex-1 text-capitalize">{data.name}</span>
          <IoIosArrowDown
            className={` ${subMenuOpen ? "rotate-180" : ""} duration-200 `}
          />
        </div>
      </li>
      <ul
        className={`nav flex-column pl-4 ${
          subMenuOpen ? "visible" : "invisible"
        }`}
      >
        {data.menus?.map((menu) => (
          <li key={menu}>
            <Link
              to={`/${data.name}/${menu}`}
              className="nav-link text-capitalize"
            >
              {menu}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubMenu;
