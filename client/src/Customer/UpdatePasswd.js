import React, { Fragment, useState, useEffect } from "react";
import "./UpdatePassword.css";
import * as AiIcons from "react-icons/ai";
import Loader from "../component/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../actions/userActions";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../constants/uaerConstants";
import MetaData from "../component/MetaData";
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const UpdatePasswd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [oldPass, setOldPass] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [cnfPass, setCnfPass] = useState(false);

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");

      navigate('/profile');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type={oldPass ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  {!oldPass && <AiIcons.AiFillEye className='eye' onClick={() => setOldPass(!oldPass)} />}
                  {oldPass && <AiIcons.AiFillEyeInvisible className='eye' onClick={() => setOldPass(!oldPass)} />}
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type={newPass ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {!newPass && <AiIcons.AiFillEye className='eye' onClick={() => setNewPass(!newPass)} />}
                  {newPass && <AiIcons.AiFillEyeInvisible className='eye' onClick={() => setNewPass(!newPass)} />}
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type={cnfPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {!cnfPass && <AiIcons.AiFillEye className='eye' onClick={() => setCnfPass(!cnfPass)} />}
                  {cnfPass && <AiIcons.AiFillEyeInvisible className='eye' onClick={() => setCnfPass(!cnfPass)} />}
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePasswd;