import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export { Carta };
function Carta({ title, text, link, img }) {
  return (
    <Card className="custom-card" text="white">
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ flex: "70%", padding: "1rem" }}>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </div>
        <div
          style={{
            flex: "30%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to={link} className="btn btn-success ">
            Ingresar
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}
