import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
 
export { LinkedItems };
function LinkedItems({ titles, links }) {
  return (
    <div>
      <ListGroup style={{        
        overflow: "hidden",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        marginRight: "10px",
      }}
      >
        {titles.map((title, index) => (
          <ListGroup.Item
            action
            key={index}
            style={{
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to={links[index]}>{title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
