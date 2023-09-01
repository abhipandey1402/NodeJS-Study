import React, { useEffect, useState } from "react";
import UserCard from "../components/Users/UserCard";
import axios from "axios";
import Header from "../components/Header";

function FollowingList() {
  const [followingList, setFollowingList] = useState();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/follow/followingList/${userData.userId}`
      )
      .then((res) => {
        let followingListArr = [];
        res.data.data.forEach((user) => {
          const userObj = {
            _id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            follow: true,
          };

          followingListArr.push(userObj);
        });

        setFollowingList(followingListArr);
      })
      .catch((err) => alert(err));
  }, [userData.userId]);

  return (
    <div>
      <Header />
      <h1 className="m-5">Following List</h1>
      {followingList ? (
        followingList.map((user) => <UserCard props={user} />)
      ) : (
        <></>
      )}
    </div>
  );
}

export default FollowingList;
