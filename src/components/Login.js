import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
        let navigator=useNavigate();
  const [cred, setcred] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: cred.email, password: cred.password }),
    });
    const json = await response.json();
    if(json.success) {
        //redirect
        localStorage.setItem('token',json.authToken);
        navigator("/");
        props.showAlert("Successfully loged in","success");
    }
    else{
      props.showAlert(json.errors,"danger");
    }
  };

  return (
    
    <div className="mt-3">
      <h2>Login to continue iNoteBook</h2>
      <form onSubmit={handleSumbit}>
        <div className="form-group my-3">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            value={cred.email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted my-3">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={handleChange}
            value={cred.password}
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
