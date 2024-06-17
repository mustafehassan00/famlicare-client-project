import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm1() {
  const [phoneNumber, setphoneNumber] = useState('');


  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const CONTINUE = (event) => {
    event.preventDefault();

    dispatch({
      type: 'PHONE_NUMBER',
      payload: {
        phoneNumber: phoneNumber,
  
      },
    });

  }; // end registerUser

  return (
    <>
    <form className="formPanel" >
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
            <button onSubmit={CONTINUE}>CONTINUE</button>
</>
  );
}

export default RegisterForm1;