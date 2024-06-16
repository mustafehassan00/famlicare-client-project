import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <h1>page1 email/pass</h1>
      
      <RegisterForm />

      <button  onClick={() => {
            history.push('/registerpage/registerpage1');
          }}> Continue </button>
      

      <center>
        {/* <button
          type="button"
          // className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button> */}
      </center>
    </div>
  );
}

export default RegisterPage;
