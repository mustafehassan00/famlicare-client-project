import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <h1>page1 email/pass</h1>
      <button onClick={() => history.goBack()}> ⬅️ </button>
      <button
        onClick={() => {
          history.push("/registerpage/registerpage1");
        }}
      >
        {" "}
        ➡️{" "}
      </button>

      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
