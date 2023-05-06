import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import MetaData from "../component/MetaData";
import { getProductDetails } from '../actions/productActions';
import ReactStars from "react-rating-stars-component";
import "./ProductDetails.css";
import Loader from "../component/Loader";
import ReviewCard from './ReviewCard';
import { useAlert } from 'react-alert';
import { addItemsToCart } from '../actions/cartAction';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core';
import { NEW_REVIEW_RESET } from '../constants/productConstants';
import { newReview, clearErrors } from '../actions/productActions';

const ProductDetails = () => {

  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [quant, setQuant] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const decreaseQuant = () => {
    if (quant <= 1) return;
    const qt = quant - 1;
    setQuant(qt);
  };
  const increaseQuant = () => {
    if (product.quantity <= quant) return;
    const qt = quant + 1;
    setQuant(qt);
  }

  const addCartHandler = () => {
    dispatch(addItemsToCart(id, quant));
    alert.success("Items added to Cart...");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success, alert]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "green",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  const ratingChange = (e) => {
    setRating(e);
  }

  const reviewOptions = {
    edit: true,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: rating,
    onChange: ratingChange
  };

  return <Fragment>
    {loading ? (<Loader />) : (
      <Fragment>

        <MetaData title="Product Details" />

        <div className="ProductDetails">
          <div>
            {/* <Mango /> */}
          </div>
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
            </div>
            <div className="detailsBlock-2">
              <ReactStars {...options} />
              <span> ({product.numOfReviews} Reviews) </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick={decreaseQuant}>-</button>
                  <input readOnly value={quant} type="number" />
                  <button onClick={increaseQuant}>+</button>
                </div>{" "}
                <button disabled={product.quantity < 1 ? true : false} onClick={addCartHandler}>
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product.quantity < 1 ? "redColor" : "greenColor"}>
                  {"    "}{product.quantity < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <span>{product.description}</span>
            </div>

            <button className="submitReview" onClick={submitReviewToggle}>
              Submit Review

            </button>
          </div>
        </div>

        <h3 className='reviewsHeading'>REVIEWS</h3>

        <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
        >
          <DialogTitle>Submit Review</DialogTitle>
          <DialogContent className="submitDialog">
            <ReactStars {...reviewOptions} />

            <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">
              Cancel
            </Button>
            <Button onClick={reviewSubmitHandler} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>

        {product.reviews && product.reviews[0] ? (
          <div className="reviews">
            {product.reviews &&
              product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
          </div>
        ) : (
          <p className="noReviews">No Reviews Yet</p>
        )}
      </Fragment>
    )}
  </Fragment>

}

export default ProductDetails;