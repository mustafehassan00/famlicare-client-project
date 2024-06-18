import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterPage4() {
  const errors = useSelector((store) => store.errors);
  const registerReducer = useSelector((store) => store.registerReducer);
console.log("What we received from the reducer",registerReducer);

  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    // history.push('/registerpage/registerpage2');

    dispatch({
      type: "REGISTER",
      payload: {
        registerReducer
      },
    });
  }; // end registerUser

  return (
    <>
      <button onClick={() => history.goBack()}> ⬅️ </button>
      <form className="formPanel" onSubmit={registerUser}>
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
{registerReducer.firstName}
<br></br>
{registerReducer.lastName}
<br></br>
{registerReducer.username}
<br></br>
{registerReducer.emailAddress}
<br></br>
{registerReducer.phoneNumber}
        <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
        {/* 👆 uncomment for the final component to log a user in. */}
      </form>
    </>
  );
}

export default RegisterPage4;
