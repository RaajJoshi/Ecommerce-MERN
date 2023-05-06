import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, Link } from 'react-router-dom';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import * as AiIcons from "react-icons/ai";
import "./signUpLogin.css";
import MetaData from '../component/MetaData';
import { clearErrors, loginCustomer, loginFarmer, loginAdmin } from '../actions/userActions';
import Loader from '../component/Loader';
import { useLocation } from 'react-router-dom';

const LoginC = () => {
    const navigate = useNavigate();
    const alert = useAlert();
    const location = useLocation();
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated, customer } = useSelector((state) => state.userDetail);

    const [status, setStatus] = useState("");
    const [pass, setPass] = useState(false);
    const [valuesLog, setValuesLog] = useState([{
        email: '',
        password: '',
    }]);

    const changeHandle = (e) => {
        setValuesLog({
            ...valuesLog, [e.target.name]: e.target.value
        });
    };

    const redirect = location.search ? location.search.split("=")[1] : "/products";
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated && customer.role === "customer") {
            navigate(redirect);
        }else if(isAuthenticated && customer.role === "farmer") {
            navigate("/myProducts");
        }else if (isAuthenticated && customer.role === "admin") {
            navigate("/dashboard");
        }

    }, [dispatch, error, alert, isAuthenticated, redirect, navigate])


    const logSubmit = (e) => {
        e.preventDefault();
        if(status === "farmer") {
            dispatch(loginFarmer(valuesLog.email, valuesLog.password, status));
        } else if(status === "customer") {
            dispatch(loginCustomer(valuesLog.email, valuesLog.password, status));
        } else if (status === "admin") {
            dispatch(loginAdmin(valuesLog.email, valuesLog.password, status));
        }
    }


    return <Fragment>
        {loading ? <Loader /> :
            <Fragment>
                <MetaData title="Login" />
                <div className='LoginSignUpContainer'>
                    <div className='LoginSignUpBox'>
                        <div>
                            <h2 className='title'>Log-in</h2>
                        </div>
                        <form method='POST' className='loginForm'>
                            <div className='selectRole'>
                                <AccountTreeIcon />
                                <select onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Role</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className='loginEmail'>
                                < MailOutlineIcon />
                                <input type="email" name="email"
                                    placeholder='abc@xyz.com'
                                    value={valuesLog.email}
                                    onChange={changeHandle}
                                    required
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon />
                                <input type={pass ? "text" : "password"} name="password"
                                    placeholder='password'
                                    value={valuesLog.password}
                                    onChange={changeHandle}
                                    required
                                />
                                {!pass && <AiIcons.AiFillEye className='eye' onClick={() => setPass(!pass)} />}
                                {pass && <AiIcons.AiFillEyeInvisible className='eye' onClick={() => setPass(!pass)} />}
                            </div>
                            <Link to="/register">don't have account?? ?</Link>
                            <input type="submit" onClick={logSubmit} className="loginBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>};
    </Fragment>;
}
export default LoginC