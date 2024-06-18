import React from "react";
import { useHistory } from "react-router-dom";
import RegisterForm1 from "../RegisterForm/RegisterForm1";

function RegisterPage1() {
  const history = useHistory();

  return (
    <div>
      <h1>phone number?</h1>
      <button onClick={() => history.goBack()}> ⬅️ </button>
      <button
        onClick={() => {
          history.push("/registerpage/registerpage2");
        }}
      >
        {" "}
        ➡️{" "}
      </button>
      <RegisterForm1 />
    </div>
  );
}

export default RegisterPage1;
