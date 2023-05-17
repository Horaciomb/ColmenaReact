import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
export  {Carta};
function Carta({ title, text, link }) {
  return (
    <Card bg="dark" text="light">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="success" href={link}>Ingresar</Button>
      </Card.Body>
    </Card>
  );
}


