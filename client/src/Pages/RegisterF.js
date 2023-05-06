import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate, Link } from 'react-router-dom';
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import * as AiIcons from "react-icons/ai";
import "./signUpLogin.css";
import profileImg from "../component/Images/profile.jpg";
import MetaData from '../component/MetaData';
import { clearErrors, registerCustomer, registerFarmer } from '../actions/userActions';
import Loader from '../component/Loader';
const RegisterF = () => {

    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated, customer } = useSelector((state) => state.userDetail);

    const [pass, setPass] = useState(false);
    const [cnpass, setCnpass] = useState(false);
    const [valuesReg, setValuesReg] = useState([{
        cname: '',
        email: '',
        password: '',
        phoneno: '',
        cnfpasswd: '',
        city: '',
    }]);
    const [avatar, setAvatar] = useState(profileImg);
    const [avatarPreview, setAvatarPreview] = useState(profileImg);
    const [status, setStatus] = useState("");

    const changeHandle = (e) => {

        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setValuesReg({
                ...valuesReg, [e.target.name]: e.target.value
            });
        }
    };

    const changeHandlePhone = (e) => {
        setValuesReg({
            ...valuesReg, [e.target.name]: e.target.value.replace(/\D/g, '')
        });
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isAuthenticated && customer.role === "customer") {
            navigate("/products");
        }else if(isAuthenticated && customer.role === "farmer") {
            navigate("/myProducts");
        }

    }, [dispatch, error, alert, navigate, isAuthenticated])


    const regSubmit = (e) => {
        e.preventDefault();
        if(status === "farmer") {
            dispatch(registerFarmer(valuesReg.cname, valuesReg.email, valuesReg.password, valuesReg.phoneno, valuesReg.city, avatar, status));
        } else if(status === "customer") {
            dispatch(registerCustomer(valuesReg.cname, valuesReg.email, valuesReg.password, valuesReg.phoneno, valuesReg.city, avatar, status));
        }
    }


    return <Fragment>
        {loading ? <Loader /> :
            <Fragment>
                <MetaData title="Register" />
                <div className='LoginSignUpContainer'>
                    <div className='signUpBox'>
                        <div>
                            <h2 className='title'>Sign-up</h2>
                        </div>
                        <form method='POST' className='signUpForm'>
                            <div className='selectRole'>
                                <AccountTreeIcon />
                                <select onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Role</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </div>
                            <div className='signUpName'>
                                <FaceIcon />
                                <input type="text" name="cname"
                                    placeholder='Name'
                                    value={valuesReg.cname}
                                    onChange={changeHandle}
                                    required
                                />
                            </div>
                            <div className='signUpEmail'>
                                <MailOutlineIcon />
                                <input type="email" name="email"
                                    placeholder='abc@xyz.com'
                                    value={valuesReg.email}
                                    onChange={changeHandle}
                                    required
                                />
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon />
                                <input type={pass ? "text" : "password"} name="password"
                                    placeholder='password'
                                    value={valuesReg.password}
                                    onChange={changeHandle}
                                    required
                                />
                                {!pass && <AiIcons.AiFillEye className='eye' onClick={() => setPass(!pass)} />}
                                {pass && <AiIcons.AiFillEyeInvisible className='eye' onClick={() => setPass(!pass)} />}
                            </div>
                            <div className='loginPassword'>
                                <LockOpenIcon />
                                <input type={cnpass ? "text" : "password"} name="cnfpasswd"
                                    placeholder='It must be same as above'
                                    value={valuesReg.cnfpasswd}
                                    onChange={changeHandle}
                                    required
                                />
                                {!cnpass && <AiIcons.AiFillEye className='eye' onClick={() => setCnpass(!cnpass)} />}
                                {cnpass && <AiIcons.AiFillEyeInvisible className='eye' onClick={() => setCnpass(!cnpass)} />}
                            </div>
                            <div className='signUpPhoneno'>
                                <LocalPhoneIcon />
                                <input type="text" name="phoneno"
                                    placeholder='Enter digits only...'
                                    value={valuesReg.phoneno}
                                    onChange={changeHandlePhone}
                                    minLength='10'
                                    maxLength='10'
                                    required
                                />
                            </div>
                            <div className='signUpCity'>
                                <LocationCityIcon />
                                <input type="text" name="city"
                                    placeholder='city'
                                    value={valuesReg.city}
                                    onChange={changeHandle}
                                    required
                                />
                            </div>
                            <div id="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={changeHandle}
                                />
                            </div>
                            <Link to="/login">already account?? ?</Link>
                            <input type="submit" onClick={regSubmit} className="signUpBtn" />
                        </form>
                    </div>
                </div>
            </Fragment>};
    </Fragment>;
}

export default RegisterF