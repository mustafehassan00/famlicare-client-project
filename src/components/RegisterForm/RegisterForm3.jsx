import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function RegisterForm3() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  



  return (
  

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

  );
}

export default RegisterForm3;
