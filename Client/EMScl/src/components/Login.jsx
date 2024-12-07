import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginEMS } from '../APIs/FetchApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [log,setLog]=useState({
        username:"",password:""
    })
    const Navigate=useNavigate()

    const FormSubmit=()=>{
        const {username,password}=log
        if(!username || !password){
            toast.error("Username or Password is incorrect")
        }else{
            LoginEMS(log).then((res)=>{
                console.log(res.data);
                sessionStorage.setItem('token',res.data.token)
                console.log("Stored Token:", sessionStorage.getItem("token"))
                toast.success("Login Successfull")
                Navigate('/home')
            })
        }
    }
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center ">
        <div className="card shadow-sm p-4 bg-dark" style={{ width: '100%', maxWidth: '400px' }}>
            <h2 className="text-center mb-4 text-white" style={{ fontSize: '25px', fontFamily: '"Bakbak One", sans-serif' ,fontWeight:'700',}}>EmpNova</h2>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="John Doe"
                        onChange={(e)=>{setLog({...log,username:e.target.value})}}
                        required
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e)=>{setLog({...log,password:e.target.value})}}
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <div className="form-check mb-3">
                    {/* <input type="checkbox" className="form-check-input" id="rememberMe" />   */}
                    {/* <label className="form-check-label" htmlFor="rememberMe">Remember me</label> */}
                </div>
                <button className="btn btn-primary w-100" onClick={(e)=>{FormSubmit(e)}}>Sign in</button>
            
            <div className="container d-flex justify-content-between mt-3">
                <small>
                    <Link to="/reg" className='text-decoration-none'>Register here</Link>
                </small>
                <small>
                    <Link to="/changepass" className='text-decoration-none'>Change Password</Link>
                </small>
            </div>
        </div>
    </div>
  )
}

export default Login
