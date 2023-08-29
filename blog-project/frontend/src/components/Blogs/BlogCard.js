import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function BlogCard({ props }) {
  return (
    <Card>
      <Card.Body>
        {console.log(props)}
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.textBody}</Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
