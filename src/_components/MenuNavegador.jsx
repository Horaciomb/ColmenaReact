import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
export  {MenuNavegador};
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
        <Breadcrumb.Item key={index} href={links[index]}>
          {title}
        </Breadcrumb.Item>
      );
    }
  });

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
}


