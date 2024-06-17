import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function RegisterPage4() {

  

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  

  const registerUser = (event) => {
    event.preventDefault();

    // history.push('/registerpage/registerpage2');
   
    dispatch({
      type: 'REGISTER',
      payload: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        emailAddress: emailAddress,
        phoneNumber: phoneNumber
      },
    });

  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
{/* {firstName}
{lastName}
{username}
{password}
{emailAddress}
{phoneNumber} */}


      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
      {/* 👆 uncomment for the final component to log a user in. */}
    </form>
  );
}

export default RegisterPage4;