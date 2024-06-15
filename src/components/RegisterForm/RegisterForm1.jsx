import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm1() {
  const [phoneNumber, setphoneNumber] = useState('');


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     username: username,
  
    //   },
    // });

  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2>Register User</h2>
      <div>
        <label htmlFor="Phone Number">
          Password:
          <input
            type="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            required
            onChange={(event) => setphoneNumber(event.target.value)}
          />
        </label>
      </div>
    
    </form>
  );
}

export default RegisterForm1;