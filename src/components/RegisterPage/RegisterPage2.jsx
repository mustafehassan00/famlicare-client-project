import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm2 from '../RegisterForm/RegisterForm2';

function RegisterPage2() {
  const history = useHistory();

  return (
    <div>

        

       <RegisterForm2 /> 

       <button  onClick={() => {
            history.push("/registerpage/registerpage3");
          }}> Continue </button>

      {/* <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center>  */}
    </div>
  );
}

export default RegisterPage2;