import React from 'react';

import { useHistory } from 'react-router-dom';
// import RegisterForm2 from '../RegisterForm/RegisterForm2';

function RegisterPage4() {
  const history = useHistory();

  return (
    <div>
<h1>in the last component</h1>
         <button  onClick={() => {
            history.push("registerpage/registerpage5");
          }}> NEXT </button>

       {/* <RegisterForm2 />  */}

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

export default RegisterPage4;