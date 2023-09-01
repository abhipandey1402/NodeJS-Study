import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function UserCard({ props }) {
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleFollowOrUnfollow = (followingUserId, followStatus) => {
    if (followStatus === false) {
      const followObj = { followingUserId };
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/follow/followUser/${userData.userId}`,
          followObj
        )
        .then((res) => alert("Successfully followed!"))
        .catch((err) => alert(err));
    } else {
      const followObj = { followingUserId };
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/follow/unfollowUser/${userData.userId}`,
          followObj
        )
        .then((res) => alert("Successfully unfollowed!"))
        .catch((err) => alert(err));
    }

    window.location.reload();
  };

  return (
    <Card style={{ width: "18rem" }} className="m-2">
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.username}</Card.Text>
        <Card.Text>{props.email}</Card.Text>
        <Button
          variant="primary"
          onClick={() => handleFollowOrUnfollow(props._id, props.follow)}
        >
          {props.follow === true ? "Unfollow" : "Follow"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
