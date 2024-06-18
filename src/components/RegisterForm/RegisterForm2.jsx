import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RegisterForm2() {
  const [image, setimage] = useState("");

  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const Continue = (event) => {
    dispatch({
      type: "IMAGE",
      payload: {
        image: image,
      },
    });
    history.push("/registerpage/registerpage3");
  }; // end registerUser

  return (
    <>
      <div>
        <h2>Registered User Profile picture</h2>
        <div>
          <label htmlFor="image">
            Image:
            <input
              type="image"
              name="image"
              value={image}
              placeholder="image url"
              required
              onChange={(event) => setimage(event.target.value)}
            />
          </label>
        </div>
      </div>
      <button onClick={Continue}>Continue</button>
    </>
  );
}

export default RegisterForm2;
