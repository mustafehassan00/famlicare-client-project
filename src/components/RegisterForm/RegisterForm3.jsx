import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterForm3() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const Continue = () => {
    dispatch({
      type: "FIRST_LAST_NAME",
      payload: {
        firstName: firstName,
        lastName: lastName,
      },
    });
    history.push("/registerpage/registerpage4");
  }; // end registerUser

  return (
    <>
      <div>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(event) => setfirstName(event.target.value)}
          />
        </label>
        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(event) => setlastName(event.target.value)}
          />
        </label>
      </div>
      <button onClick={Continue}>Continue</button>
    </>
  );
}

export default RegisterForm3;
