import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import ReactStars from 'react-rating-stars-component';
import MetaData from "../component/MetaData";
import { getProduct } from '../actions/productActions';
import { useDispatch, useSelector } from "react-redux";
import Loader from '../component/Loader';
import { useAlert } from "react-alert";
import Slider from "@material-ui/core/Slider";
import { Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import "./Product.css";

const categories = [
  "Grains",
  "Spices",
  "Vegetables",
  "Fruit",
];

const ProductsList = () => {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [price, setPrice] = useState([0, 60]);
  const [category, setCategory] = useState();

  const { loading, error, products } = useSelector(
    (state) => state.products
  );
  const { isAuthenticated } = useSelector((state) => state.userDetail);

  const { keyword } = useParams();

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  

  useEffect(() => {
    if (error) {
      return alert.show("Error");
    }

    if(isAuthenticated === false){
      navigate('/login');
    }

    else {
      dispatch(getProduct(keyword, price, category));
    }

  }, [dispatch, error, alert, keyword, price, category, isAuthenticated, navigate])


  return <Fragment>
    {loading ? <Loader /> : <Fragment>
      <MetaData title="All Products" />
      <h2 className="productsHeading">Products</h2>

      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={60}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
              className="category-link"
              key={category}
              onClick={() => setCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

      </div>

      <div className="products">
        {products && products.map((product) => {

          const options = {
            edit: false,
            color: "rgba(20,20,20,0.1)",
            activeColor: "green",
            size: window.innerWidth < 600 ? 20 : 25,
            value: product.ratings,
            isHalf: true,
          };

          return <Fragment>
            <Link to={`/product/${product._id}`}>
              <img width="300px" height="300px" src={product.images[0].url} alt={product.name} />
              <p>{product.name}</p>
              <ReactStars {...options} /> <span> {product.numOfReviews} </span>
              <span>{`₹${product.price}`}</span>
            </Link>
          </Fragment>
        })}
      </div>
    </Fragment>}
  </Fragment>

};

export default ProductsList;