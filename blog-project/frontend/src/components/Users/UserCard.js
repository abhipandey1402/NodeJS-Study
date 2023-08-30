import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserCard({ props }) {
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleFollow = (followingUserId) => {
    const followObj = { followingUserId };
    axios
      .post(
        `http://localhost:8001/follow/followUser/${userData.userId}`,
        followObj
      )
      .then((res) => alert("Successfully followed!"))
      .catch((err) => alert(err));
  };

  return (
    <Card style={{ width: "18rem" }} className="m-2">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.username}</Card.Text>
        <Card.Text>{props.email}</Card.Text>
        <Button variant="primary" onClick={() => handleFollow(props._id)}>
          Follow
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
