import React from 'react'
import { useState } from 'react'
import { RegisterEMS } from '../APIs/FetchApi'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [reg,setReg]=useState({
        username:"",email:"",password:""
    })
    const Navigate=useNavigate()
    console.log(reg);

    const FormSubmit=()=>{
        const {username,email,password}=reg
        if (!username || !email ||!password){
            toast.error("Invalid Input")
        }else{
            RegisterEMS(reg).then((res)=>{
                console.log(res.data);
                toast.success("Signup Successfull")
                Navigate('/')
                
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
                        onChange={(e)=>{setReg({...reg,username:e.target.value})}}
                        required
                    />
                    <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Johndoe@gmail.com"
                        onChange={(e)=>{setReg({...reg,email:e.target.value})}}
                        required
                    />
                    <label htmlFor="username">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={(e)=>{setReg({...reg,password:e.target.value})}}
                        required
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button  className="btn btn-primary w-100" onClick={(e)=>{FormSubmit(e)}}>Sign up</button>
          
            
            <div className="text-center mt-3">
                <small className='text-light'>
                    Already have an account? <a href="/" className='text-decoration-none'>Login here</a>
                </small>
            </div>
        </div>
    </div>
  )
}

export default Register
