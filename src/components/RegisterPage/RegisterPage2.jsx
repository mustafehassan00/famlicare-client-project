import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm2 from "../RegisterForm/RegisterForm2";

function RegisterPage2() {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.goBack()}> ⬅️ </button>
      <button
        onClick={() => {
          history.push("/registerpage/registerpage3");
        }}
      >
        {" "}
        ➡️{" "}
      </button>

      <RegisterForm2 />
    </div>
  );
}

export default RegisterPage2;
