import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
        let navigator=useNavigate();
        const [cred, setcred] = useState({name:"", email: "", password: "" ,cpassword:""});

        const handlechange = (e) => {
          setcred({ ...cred, [e.target.name]: e.target.value });
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
          if(cred.password !== cred.cpassword){
                props.showAlert("Password is not Matching","danger");
                return;
          }
          const response = await fetch(`http://localhost:5000/user/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:cred.name,email: cred.email, password: cred.password }),
          });
          const json = await response.json();
          if(json.success) {
              //redirect
              localStorage.setItem('token',json.authToken);
              navigator("/");
              props.showAlert("Successfull Signed in","success");
          }
          else{
              props.showAlert(json.errors,"danger");
          }
        };
      

  return (
        <div className="mt-3">
        <h2>Create a account to use iNoteBook</h2><form onSubmit={handleSubmit}>
         <div className="form-group my-3">
      <label htmlFor="exampleInputPassword1">Name</label>
      <input type="text" className="form-control" minLength={3}  placeholder="Name" name="name" onChange={handlechange}/>
    </div>
    <div className="form-group my-3">
      <label htmlFor="exampleInputEmail1">Email address</label>
      <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handlechange}/>
      <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div className="form-group my-3">
      <label htmlFor="exampleInputPassword1">Password</label>
      <input type="password" name="password" minLength={5} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlechange}/>
    </div>
    <div className="form-group my-3">
      <label htmlFor="exampleInputPassword1">Confirm Password</label>
      <input type="password" name="cpassword" minLength={5} className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handlechange}/>
    </div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default Signup