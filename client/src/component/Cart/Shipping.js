import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "./CheckoutSteps.js";
import { useNavigate } from "react-router-dom";

const Shipping = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { transportInfo } = useSelector((state) => state.cart);
    const {customer} = useSelector((state) => state.userDetail);

    const [address, setAddress] = useState(transportInfo.address);
    const [city, setCity] = useState(transportInfo.city);
    const [state, setState] = useState(transportInfo.state);
    const [country, setCountry] = useState(transportInfo.country);
    const [pincode, setPincode] = useState(transportInfo.pincode);
    const [phoneno, setPhoneno] = useState(customer.phoneno);

    const shippingSubmit = (e) => {
        e.preventDefault();

        dispatch(
            saveShippingInfo({ address, city, state, country, pincode, phoneno })
        );
        navigate("/order/confirm");
    };

    return (
        <Fragment>
          <MetaData title="Shipping Details" />
    
          <CheckoutSteps activeStep={0} />
    
          <div className="shippingContainer">
            <div className="shippingBox">
              <h2 className="shippingHeading">Shipping Details</h2>
    
              <form
                className="shippingForm"
                encType="multipart/form-data"
                onSubmit={shippingSubmit}
              >
                <div>
                  <HomeIcon />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
    
                <div>
                  <LocationCityIcon />
                  <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
    
                <div>
                  <PinDropIcon />
                  <input
                    type="number"
                    placeholder="Pin Code"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
        
                <div>
                  <PublicIcon />
    
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
    
                {country && (
                  <div>
                    <TransferWithinAStationIcon />
    
                    <select
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    >
                      <option value="">State</option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}
    
                <input
                  type="submit"
                  value="Continue"
                  className="shippingBtn"
                  disabled={state ? false : true}
                />
              </form>
            </div>
          </div>
        </Fragment>
      );

};

export default Shipping;