import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailAddress, setemailAddress] = useState('');

  const errors = useSelector((store) => store.errors);
  // const dispatch = useDispatch();
  

  const signUp = (event) => {
    event.preventDefault();

    dispatch({
      type: 'PHONE_NUMBER',
      payload: {
        phoneNumber: phoneNumber,
  
      },
    });

  }; // submit phone number

  return (

<>
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label htmlFor="emailAddress">
          email:
          <input
            type="text"
            name="emailAddress"
            value={emailAddress}
            required
            onChange={(event) => setemailAddress(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <button onSubmit={signUp}>Sign Up</button>
    </>
  );
}

export default RegisterForm;
