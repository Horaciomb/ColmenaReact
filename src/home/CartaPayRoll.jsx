import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function CartaPayRoll() {
  return (
    <Card bg="dark" text="light">
      <Card.Body>
        <Card.Title>PayRoll</Card.Title>
        <Card.Text>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa ipsum minima quis adipisci, consequatur illum dolore sint nostrum quos fugiat nesciunt tenetur! Quia dolorum qui iusto minima sunt ex quos.
        </Card.Text>
        <Button variant="success" href='/payRoll'>Ingresar</Button>
      </Card.Body>
    </Card>
  );
}

export default CartaPayRoll;