import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm3() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  

  const errors = useSelector((store) => store.errors);
  // const dispatch = useDispatch();
  

//   const registerUser = (event) => {
//     event.preventDefault();

//     // history.push('/registerpage/registerpage2');
   
//     // dispatch({
//     //   type: 'REGISTER',
//     //   payload: {
//     //     username: username,
//     //     password: password,
//     //     emailAddress: emailAddress,
//     //   },
//     // });

//   }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
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
     
      {/* <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div> */} 
      {/* 👆 uncomment for the final component to log a user in. */}
    </form>
  );
}

export default RegisterForm3;
