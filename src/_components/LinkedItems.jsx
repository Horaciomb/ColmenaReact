import ListGroup from "react-bootstrap/ListGroup";
export  {LinkedItems};
function LinkedItems({ titles, links }) {
  return (
    <ListGroup>
      {titles.map((title, index) => (
        <ListGroup.Item action href={links[index]} key={index}>
          {title}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}


