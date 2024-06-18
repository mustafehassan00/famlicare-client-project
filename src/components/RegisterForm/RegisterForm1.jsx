import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterForm1() {
  const [phoneNumber, setphoneNumber] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const Continue = (event) => {
    event.preventDefault();

    dispatch({
      type: "PHONE_NUMBER",
      payload: {
        phoneNumber: phoneNumber,
      },
    });
    history.push("/registerpage/registerpage2");
  }; // end registerUser

  return (
    <>
      <div>
        <label htmlFor="Phone Number">
          Phone Number:
          <input
            type="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(event) => setphoneNumber(event.target.value)}
          />
        </label>
      </div>
      <button onClick={Continue}>Continue</button>
    </>
  );
}

export default RegisterForm1;
