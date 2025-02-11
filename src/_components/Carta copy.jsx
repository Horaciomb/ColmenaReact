import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
export { Carta };
function Carta({ title, text, link, img }) {
  return (
    <Card style={{ position: "relative", height: "100%" }}>
      <Card.Img src={img} alt="Card image" />
      <Card.ImgOverlay
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
          <Button variant="success" href={link}>
            Ingresar
          </Button>
        </div>
      </Card.ImgOverlay>
    </Card>
  );
}
