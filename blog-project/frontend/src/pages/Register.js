import React, { useEffect } from "react";
import InputForm from "../components/Register/InputForm";

function Register() {
  useEffect(() => {
    if (localStorage.getItem("user")) {
      window.location.href = "/homepage";
    }
  }, []);
  return (
    <div>
      <InputForm />
    </div>
  );
}

export default Register;
