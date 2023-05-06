import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutCustomer, logoutFarmer, logoutAdmin } from "../actions/userActions";
import Loader from '../component/Loader';


const LogoutA = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { isAuthenticated, customer } = useSelector((state) => state.userDetail);

    useEffect(() => {

        if(!isAuthenticated) {
            navigate('/login');
        }
    
      }, [isAuthenticated, navigate]);


    if (customer.role === "customer") {
        dispatch(logoutCustomer());
    } else if (customer.role === "farmer") {
        dispatch(logoutFarmer());
    } else {
        dispatch(logoutAdmin());
    }

};

export default LogoutA;