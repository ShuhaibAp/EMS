import React, { useState } from 'react'
import { ChangePassword } from '../APIs/FetchApi'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ChangePass() {
    const [password,setPassword]=useState({
        old_pass:"",new_pass:""
    })
    const Navigate=useNavigate()

    const FormSubmit=()=>{
        const {old_pass,new_pass}=password
        if(!old_pass || !new_pass){
            toast.error("Please fill both fields")
        } else if (new_pass.length<8){
            toast.error("New password must be atleast 8 characters")
        }else{
            const token = sessionStorage.getItem("token");
            if (!token){
                toast.error("You need to Sign in first")
                Navigate('/')
            }else{
                const header = {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
            ChangePassword(password,header).then((res)=>{
                console.log("changed password :",res);
                toast.success("Pasword changed successfully")
                Navigate('/')
                
            }).catch((err)=>{
                console.error(err);
                toast.error("Password Changing failed, try again.")
                
            })
            }
        }
    }
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow-sm p-4 bg-dark"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2
          className="text-center mb-4 text-white"
          style={{
            fontSize: "25px",
            fontFamily: '"Bakbak One", sans-serif',
            fontWeight: "700",
          }}
        >
          CHANGE PASSWORD
        </h2>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="oldPassword"
            placeholder="Old Password"
            onChange={(e) =>
              setPassword({ ...password, old_pass: e.target.value })
            }
            required
          />
          <label htmlFor="oldPassword">Old Password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="newPassword"
            placeholder="New Password"
            onChange={(e) =>
              setPassword({ ...password, new_pass: e.target.value })
            }
            required
          />
          <label htmlFor="newPassword">New Password</label>
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={(e) => {
            FormSubmit(e);
          }}
        >
          Update Password
        </button>
        <div className="text-center mt-3">
                <small className='text-light'>
                    <a href="/" className='text-decoration-none'>Back to Login</a>
                </small>
            </div>
      </div>
    </div>
  )
}

export default ChangePass
