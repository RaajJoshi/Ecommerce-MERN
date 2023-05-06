import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MetaData from "../component/MetaData";
import "./updateProfile.css";
import Loader from "../component/Loader";
import { useAlert } from "react-alert"
import { loadUser, updateProfile, clearErrors } from '../actions/userActions';
import { UPDATE_PROFILE_RESET } from '../constants/uaerConstants';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const navigate = useNavigate();

  const { customer } = useSelector(
    (state) => state.userDetail
  );
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [cname, setCname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/cus1.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProfile(cname, email, phoneno, city, avatar));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const passwordUpdateHandler = (e) => {
    navigate('/profile/updatePasswd');
  }

  useEffect(() => {

    //dispatch(loadUser());

    if (customer) {
      setCname(customer.name);
      setEmail(customer.email);
      setPhoneno(customer.phoneno);
      setCity(customer.city);
      setAvatarPreview(customer.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate('/profile');

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }

  }, [dispatch, error, navigate, customer, isUpdated]);

  return (<Fragment>
    {loading ? (<Loader />) :
      (
        <Fragment>

          <MetaData title={`${customer.name}'s Profile`} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={cname}
                    onChange={(e) => setCname(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="updateProfilePhoneno">
                  <input
                    type="text"
                    placeholder="Phoneno"
                    required
                    name="phoneno"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                  />
                </div>
                <div className="updateProfileCity">
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
            <input
              type="submit"
              value="Update Password"
              className="updatePasswdBtn"
              onClick={passwordUpdateHandler}
            />
          </div>
        </Fragment>)}
  </Fragment>);


};

export default Profile;