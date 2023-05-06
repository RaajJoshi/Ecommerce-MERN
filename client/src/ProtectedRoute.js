import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const { isAuthenticated, customer } = useSelector((state) => state.userDetail);

    if (isAuthenticated === false) {
        return <Navigate to="/login" />;
    }
    if (customer.role !== "admin") {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;