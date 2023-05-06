import React, { Fragment, useState } from 'react';
import MetaData from '../component/MetaData';
import "./home.css";
import Carousel from "react-material-ui-carousel";
import { Link } from 'react-router-dom';
import img1 from '../component/Images/crop1.jpg';
import img2 from '../component/Images/crop2.jpg';
import img3 from '../component/Images/crop3.jpg';
import img4 from '../component/Images/crop4.jpg';

const Home = () => {

  const images = [
    {cname : "fruit", url : img1},
    {cname : "spice", url : img2},
    {cname : "vegetable", url : img3},
    {cname : "grain", url : img4},
  ]

  return (
    <Fragment>
      <MetaData title="Crop Buyer Seller Portal" />

      <h3 style={{ textAlign: 'center' }} className='headerTitle'>Welcome To Crop Buyer Seller Portal</h3>
      <Carousel>
        {images &&
          images.map((item, i) => (
            <img
              className="CarouselImage"
              key={i}
              src={item.url}
              alt={`${i} Slide`}
            />
          ))}
      </Carousel>
      <div className='showHide'>
        <div className='info'>
          <p>
            For earn money from your product Please <a href='/product/create'>Add Product</a> in out Portal.
          </p>
          <p>
            You can see which type of <a href='/products'>Products</a> we have
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
