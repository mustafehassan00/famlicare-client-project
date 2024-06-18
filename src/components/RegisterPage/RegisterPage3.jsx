import React from "react";

import { useHistory } from "react-router-dom";
import RegisterForm3 from "../RegisterForm/RegisterForm3";

function RegisterPage3() {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.goBack()}> ⬅️ </button>

      <button
        onClick={() => {
          history.push("/registerpage/registerpage4");
        }}
      >
        {" "}
        ➡️{" "}
      </button>

      <RegisterForm3 />
    </div>
  );
}

export default RegisterPage3;
