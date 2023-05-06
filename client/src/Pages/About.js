import React, { Fragment } from 'react';
import "./about.css";
import MetaData from '../component/MetaData';

const About = () => {
  return (
    <Fragment>
      <MetaData title="Crop Buyer Seller Portal" />
      <section className="background firstsection">
        <div className="box-main">
          <div className="firstHalf">
            <p className="text-big">About Us</p>
            <p className="text-small">
              This system is Developed by Raj Joshi.
            </p>
            <br />
            <p className="text-small">
              He is associate developer at GetOnCRM Solutions.
            </p>
          </div>
        </div>
      </section>
      <section className="service">
        <h1 className="h-primary center" style={{ marginTop: '30px' }}>
          Our Team
        </h1>
        <div className="detail">
          <div className="box center">
            <p className="text-big">
              Raj Joshi
            </p>
            <p>Devloper</p>
            <p>He is currently studying I.T Department at D.D. University.</p>
            <div style={{ display: 'inline-flex' }}>
              <p style={{ fontWeight: 'bold' }}>Email :</p>&nbsp;
              <p>joshiraj282002@gmail.com</p>
            </div>
            <div style={{ display: 'inline-flex' }}>
              <p style={{ fontWeight: 'bold' }}>Contact :</p>&nbsp;
              <p>7046178405</p>
            </div>
          </div>

        </div>
      </section>
    </Fragment>
  )
}

export default About