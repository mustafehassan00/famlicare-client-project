import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm2() {
//   const [imgae, setphoneNumber] = useState('');


//   const errors = useSelector((store) => store.errors);
//   const dispatch = useDispatch();

//   const registerUser = (event) => {
//     event.preventDefault();

    // dispatch({
    //   type: 'REGISTER',
    //   payload: {
    //     username: username,
  
    //   },
    // });

//   }; // end registerUser

  return (
    
    // <form className="formPanel" onSubmit={registerUser}>
    <div>
      <h2>Registered User Profile picture</h2>
      {/* <div>
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
      </div> */}
      </div>
    
    // </form>
  );
}

export default RegisterForm2;