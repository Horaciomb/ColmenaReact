import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

export { MenuNavegador };
function MenuNavegador({ titles, links }) {
  const breadcrumbItems = titles.map((title, index) => {
    if (index === titles.length - 1) {
      return (
        <Breadcrumb.Item key={index} active>
          {title}
        </Breadcrumb.Item>
      );
    } else {
      return (
        <Breadcrumb.Item key={index}>
          <Link to={links[index]}>{title}</Link>
        </Breadcrumb.Item>
      );
    }
  });

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}
