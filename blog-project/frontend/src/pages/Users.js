import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../components/Users/UserCard";
import "../App.css";
import Header from "../components/Header";

function Users() {
  const [users, setUsers] = useState();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get(`http://localhost:8001/user/getallusers/${userData.userId}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => alert(err));
  }, [userData.userId]);
  return (
    <>
      <Header />
      <h1 className="m-5">Users</h1>
      <div className="users_page">
        {users ? users.map((user) => <UserCard props={user} />) : <></>}
      </div>
    </>
  );
}

export default Users;
