import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm3 from '../RegisterForm/RegisterForm3';

function RegisterPage3() {
  const history = useHistory();

  return (
    <div>
        <h1> register Fn/Ln </h1>

 <button  onClick={() => {
            history.push('/registerpage/registerpage4');
          }}> NEXT </button>

      <RegisterForm3 />
{/* 
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center> */}
    </div>
  );
}

export default RegisterPage3;