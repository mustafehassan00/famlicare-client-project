import React from 'react';

import { useHistory } from 'react-router-dom';

import RegisterForm1 from '../RegisterForm/RegisterForm1';

function RegisterPage1() {
  const history = useHistory();

  return (
    <div>
     <h1>phone number?</h1>
      <button  onClick={() => {
            history.push('/registerpage/registerpage2');
          }}> NEXT </button>

<RegisterForm1 />

      <center>
        {/* <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login part 1
        </button> */}
      </center>
    </div>
  );
}

export default RegisterPage1;