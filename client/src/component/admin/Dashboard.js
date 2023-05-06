import React, { useEffect } from 'react';
import './dashboard.css';
import Sidebar from "./Sidebar";
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../actions/productActions';
import { getAllOrders } from '../../actions/orderActions';
import { getAllCustomers } from '../../actions/userActions';
import { getAllFarmers } from '../../actions/userActions';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import MetaData from "../MetaData";

const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { customer } = useSelector((state) => state.allCustomer);

    const { farmers } = useSelector((state) => state.allFarmers);

    let inStock = 0;
    products &&
        products.forEach((item) => {
            if (item.Stock !== 0) {
                inStock += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllCustomers());
        dispatch(getAllFarmers());
    }, [dispatch]);

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    let pOrders = 0;
    let dOrders = 0;
    orders &&
        orders.forEach((item) => {
            if (item.status === "Proccessing" || item.status === "Shipping") {
                pOrders += 1;
            } else {
                dOrders += 1;
            }
        });

    return (
        <div className='dashboard'>
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div className='banner'>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <div className='totals'>
                            <Link to="/admin/products">
                                <p>Product</p>
                                <p>{products && products.length}</p>
                            </Link>
                            <Link to="/admin/products">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                            <Link to="/admin/products">
                                <p>Customers</p>
                                <p>{customer && customer.length}</p>
                            </Link>
                            <Link to="/admin/products">
                                <p>Farmers</p>
                                <p>{farmers && farmers.length}</p>
                            </Link>
                        </div>
                        <div className='category'>
                            <Link to="/admin/products">
                                <p>Available Products</p>
                                <p>{inStock}</p>
                            </Link>
                            <Link to="/admin/products">
                                <p>Proccess Orders</p>
                                <p>{pOrders}</p>
                            </Link>
                            <Link to="/admin/products">
                                <p>Delivered Orders</p>
                                <p>{dOrders}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard