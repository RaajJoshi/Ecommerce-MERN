import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, removeOrder, clearErrors } from "../../actions/orderActions";
import { removeItems } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
import {v4 as uuid} from "uuid";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);

  const { transportInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const { customer } = useSelector((state) => state.userDetail);

//   const paymentData = {
//     amount: Math.round(orderInfo.totalPrice * 100),
//   };

  
    
    const orderItems  = cartItems;
    const oCustomer = customer._id;
    const itemsPrice = orderInfo.subtotal;
    const taxPrice = orderInfo.tax;
    const transportPrice = orderInfo.shippingCharges;
    const totalPrice = orderInfo.totalPrice;
  

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
    //   const config = {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   };
    //   const { data } = await axios.post(
    //     "/api/v1/payment/process",
    //     paymentData,
    //     config
    //   );

    //   const client_secret = data.client_secret;

    //   if (!stripe || !elements) return;

    //   const result = await stripe.confirmCardPayment(client_secret, {
    //     payment_method: {
    //       card: elements.getElement(CardNumberElement),
    //       billing_details: {
    //         name: user.name,
    //         email: user.email,
    //         address: {
    //           line1: shippingInfo.address,
    //           city: shippingInfo.city,
    //           state: shippingInfo.state,
    //           postal_code: shippingInfo.pinCode,
    //           country: shippingInfo.country,
    //         },
    //       },
    //     },
    //   });

    //   if (result.error) {
    //     payBtn.current.disabled = false;

    //     alert.error(result.error.message);
    //   } else {
        // if (result.paymentIntent.status === "succeeded") {
          const paymentInfo = {
            id: uuid().slice(0,8).toString(),
            status: "Successed",
          };

          //console.log(order);
          dispatch(createOrder({transportInfo, orderItems, paymentInfo, oCustomer, itemsPrice, taxPrice, transportPrice, totalPrice}));
          
          dispatch(removeItems());

          setTimeout(() => { dispatch(removeOrder); }, 3000);

          navigate("/success");
        // } else {
         // alert.error("There's some issue while processing payment ");
        //}
      //}
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Payment Information</Typography>
          <div>
            <CreditCardIcon />
            <input
                    className="paymentInput"
                    type="number"
                    placeholder="1234 5678 9000"
                    required
                  />          
          </div>
          <div>
            <EventIcon />
            <input
                    className="paymentInput"
                    type="date"
                    placeholder="mm/yy"
                    required
                  />
          </div>
          <div>
            <VpnKeyIcon />
            <input
                    className="paymentInput"
                    type="number"
                    placeholder="123"
                    required
                  />          
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;