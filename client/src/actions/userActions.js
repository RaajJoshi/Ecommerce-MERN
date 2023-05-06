import { 
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FARMER_FAIL,
    LOGOUT_FARMER_SUCCESS,
    LOGOUT_ADMIN_FAIL,
    LOGOUT_ADMIN_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    ALL_FARMERS_FAIL,
    ALL_FARMERS_REQUEST,
    ALL_FARMERS_SUCCESS,
    DELETE_FARMER_FAIL,
    DELETE_FARMER_REQUEST,
    DELETE_FARMER_SUCCESS,
    ALL_CUSTOMER_FAIL,
    ALL_CUSTOMER_REQUEST,
    ALL_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAIL,
    DELETE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_SUCCESS,
    LOAD_FARMER_REQUEST,
    LOAD_FARMER_SUCCESS,
    LOAD_FARMER_FAIL,
    UPDATE_FARMER_REQUEST,
    UPDATE_FARMER_SUCCESS,
    UPDATE_FARMER_FAIL,
    UPDATE_FARMPASSWD_REQUEST,
    UPDATE_FARMPASSWD_SUCCESS,
    UPDATE_FARMPASSWD_FAIL,
    LOAD_ADMIN_FAIL,
    LOAD_ADMIN_REQUEST,
    LOAD_ADMIN_SUCCESS,
    UPDATE_ADMIN_FAIL,
    UPDATE_ADMIN_REQUEST,
    UPDATE_ADMIN_SUCCESS,
    UPDATE_ADMNPASSWD_FAIL,
    UPDATE_ADMNPASSWD_REQUEST,
    UPDATE_ADMNPASSWD_SUCCESS,
    CLEAR_ERRORS
 } from "../constants/uaerConstants";
import axios from "axios";

// Login - Customer
export const loginCustomer = (email, password, status) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/customer/login`,
      { email, password, status },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.User });
    console.log(data.User);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Login - Farmer
export const loginFarmer = (email, password, status) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/farmer/login`,
      { email, password, status },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.User });
    console.log(data.User);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Login - Admin
export const loginAdmin = (email, password, status) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/loginAdmin`,
      { email, password, status },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.User });
    console.log(data.User);
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// Register - Customer
export const registerCustomer = (name,email,password,phoneno,city,avatar,role) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
        "/api/v1/customer/register", 
        {name,email,password,phoneno,city,avatar,role}, 
        config
    );

    console.log(data);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.User });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register - Farmer
export const registerFarmer = (name,email,password,phoneno,city,avatar,role) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
        "/api/v1/farmer/register", 
        {name,email,password,phoneno,city,avatar,role}, 
        config
    );

    console.log(data);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.User });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/oneCustomer`);

    console.log(data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.oneCustomer });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

// Load Farmer
export const loadFarmer = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_FARMER_REQUEST });

    const { data } = await axios.get(`/api/v1/oneFarmer`);

    console.log(data);
    dispatch({ type: LOAD_FARMER_SUCCESS, payload: data.oneFarmer });
  } catch (error) {
    dispatch({ type: LOAD_FARMER_FAIL, payload: error.response.data.message });
  }
};

// Load Admin
export const loadAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_ADMIN_REQUEST });

    const { data } = await axios.get(`/api/v1/getAdmin`);

    console.log(data);
    dispatch({ type: LOAD_ADMIN_SUCCESS, payload: data.oneAdmin });
  } catch (error) {
    dispatch({ type: LOAD_ADMIN_FAIL, payload: error.response.data.message });
  }
};

// Logout Customer
export const logoutCustomer = () => async (dispatch) => {
  console.log("In logout action");
  try {
    await axios.get(`/api/v1/customer/logout`);

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};

// Logout Farmer
export const logoutFarmer = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/farmer/logout`);

    dispatch({ type: LOGOUT_FARMER_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FARMER_FAIL, payload: error.response.data.message });
  }
};

// Logout Admin
export const logoutAdmin = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logoutAdmin`);

    dispatch({ type: LOGOUT_ADMIN_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_ADMIN_FAIL, payload: error.response.data.message });
  }
};

// Update Profile - Customer
export const updateProfile = (name, email, phoneno, city, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/updateCustProfile", 
      {name, email, phoneno, city, avatar}, 
      config
    );

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    console.log(data);
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile - Farmer
export const updateFarmProfile = (name, email, phoneno, city, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FARMER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/updateFarmProfile", 
      {name, email, phoneno, city, avatar}, 
      config
    );

    dispatch({ type: UPDATE_FARMER_SUCCESS, payload: data.success });
    console.log(data);
  } catch (error) {
    dispatch({
      type: UPDATE_FARMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile - Admin
export const updateAdmnProfile = (name, email, phoneno, city, avatar) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADMIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/updtAdmnProf", 
      {name, email, phoneno, city, avatar}, 
      config
    );

    dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: data.success });
    console.log(data);
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password - Customer
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/updateCustomerPass", 
      passwords, 
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.User });
    console.log(data);
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password - Farmer
export const updateFarmPassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FARMPASSWD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/updateFarmerPass", 
      passwords, 
      config
    );

    dispatch({ type: UPDATE_FARMPASSWD_SUCCESS, payload: data.User });
    console.log(data);
  } catch (error) {
    dispatch({
      type: UPDATE_FARMPASSWD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password - Admin
export const updateAdmnPassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ADMNPASSWD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      "/api/v1/updtAdmnPass", 
      passwords, 
      config
    );

    dispatch({ type: UPDATE_ADMNPASSWD_SUCCESS, payload: data.User });
    console.log(data);
  } catch (error) {
    dispatch({
      type: UPDATE_ADMNPASSWD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All Farmers
export const getAllFarmers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_FARMERS_REQUEST });
    const { data } = await axios.get(`/api/v1/allFarmers`);

    dispatch({ type: ALL_FARMERS_SUCCESS, payload: data.allFarmers });
  } catch (error) {
    dispatch({ type: ALL_FARMERS_FAIL, payload: error.response.data.message });
  }
};

// get All Customers
export const getAllCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CUSTOMER_REQUEST });
    const { data } = await axios.get(`/api/v1/allCustomers`);

    dispatch({ type: ALL_CUSTOMER_SUCCESS, payload: data.allCustomer });
  } catch (error) {
    dispatch({ type: ALL_CUSTOMER_FAIL, payload: error.response.data.message });
  }
};

// Delete Farmer
export const deleteFarmer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FARMER_REQUEST });

    const { data } = await axios.delete(`/api/v1/deleteFarmer/${id}`);

    dispatch({ type: DELETE_FARMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_FARMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Customer
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CUSTOMER_REQUEST });

    const { data } = await axios.delete(`/api/v1/deleteCustomer/${id}`);

    dispatch({ type: DELETE_CUSTOMER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };