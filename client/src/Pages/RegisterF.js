import React, { Fragment, useState } from 'react';
import {MdMailOutline} from "react-icons/md";
import {AiFillLock, AiFillEye, AiFillEyeInvisible} from "react-icons/ai";
import "./RegisterF.css";

const RegisterF = () => {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [pass, setPass] = useState(false);

    const loginSubmit = () => {
        console.log("form submitted");
    }


  return <Fragment>
    <div className='LoginSignUpContainer'>
        <div className='LoginSignUpBox'>
            <div>
                <p>LOGIN</p>
            </div>
            <form className='loginform' onSubmit={loginSubmit}>
                <div className='loginEmail'>
                    <MdMailOutline />
                    <input type="email" 
                        placeholder='abc@xyz.com' 
                        required 
                        value={loginEmail} 
                        onChange={(e) => setLoginEmail(e.target.value)} 
                    />
                </div>
                <div className='loginPassword'>
                    <AiFillLock />
                    <input type={pass ? "text" : "password"} 
                        placeholder='Password' 
                        required 
                        value={loginPassword} 
                        onChange={(e) => setLoginPassword(e.target.value)} 
                    />
                    {!pass && <AiFillEye className='eye' 
                        onClick={() => setPass(!pass)} 
                    />}
                    {pass && <AiFillEyeInvisible className='eye' 
                        onClick={() => setPass(!pass)} 
                    />}
                </div>
                <input type="submit" value="login" className='loginBtn' />
            </form>
        </div>
    </div>
  </Fragment>;
}

export default RegisterF