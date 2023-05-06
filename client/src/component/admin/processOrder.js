import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import SideBar from "./Sidebar";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";
import { useParams } from "react-router-dom";

const ProcessOrder = () => {

  const { id } = useParams();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();
  const alert = useAlert();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Process Order" />
      <div className="updateOrderContainer">
        <SideBar />
        <div className="processOrderContainer">
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <div className="infoContainer" style={{width : order.orderStatus === "Delivered" ? "50%" : "30%"}}>
                <div>
                  <div className="orderInfo">
                    <Typography>Shipping Information</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Name:</p>
                        <span>{order.customer && order.customer.name}</span>
                      </div>
                      <div>
                        <p>Phone:</p>
                        <span>
                          {order.transportInfo && order.transportInfo.phoneno}
                        </span>
                      </div>
                      <div>
                        <p>Address:</p>
                        <span>
                          {order.transportInfo &&
                            `${order.transportInfo.address}, ${order.transportInfo.city}, ${order.transportInfo.state}, ${order.transportInfo.pincode}, ${order.transportInfo.country}`}
                        </span>
                      </div>
                    </div>

                    <Typography>Payment</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Status : </p>
                        <span
                          className={
                            order.paymentInfo &&
                              order.paymentInfo.status === "Successed"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                            order.paymentInfo.status === "Successed"
                            ? "PAID"
                            : "NOT PAID"}
                        </span>
                      </div>

                      <div>
                        <p>Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                      </div>
                    </div>

                    <Typography>Order</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Created At : </p>
                        <span>{order.createdAt && order.createdAt}</span>
                      </div>
                      <div>
                        <p>Stage : </p>
                        <span
                          className={
                            order.orderStatus && order.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.orderStatus && order.orderStatus}
                        </span>
                      </div>
                      <div style={{
                        display: order.orderStatus === "Delivered" ? "block" : "none",
                      }}>
                        <p>Delivered At : </p>
                        <span>{order.deliveredAt && order.deliveredAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="itemContainer" style={{width : order.orderStatus === "Delivered" ? "50%" : "40%"}}>
                <div className="confirmItems">
                  <Typography>Cart Items</Typography>
                  <div className="confirmItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quant} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quant}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="formContainer" style={{width : order.orderStatus === "Delivered" ? "0%" : "30%"}}>
                <div
                  style={{
                    display: order.orderStatus === "Delivered" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Process Order</h1>
                    <div>
                      <AccountTreeIcon />
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Category</option>
                        {order.orderStatus === "Processing" && (
                          <option value="Shipped">Shipped</option>
                        )}
                        {order.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    </div>
                    <Button
                      id="createProductBtn"
                      type="submit"
                      className="updtButton"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Process
                    </Button>
                  </form>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment >
  );
};

export default ProcessOrder;