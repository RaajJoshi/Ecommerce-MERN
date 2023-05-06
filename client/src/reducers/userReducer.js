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
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_RESET,
  UPDATE_PASSWORD_FAIL,
  ALL_FARMERS_FAIL,
  ALL_FARMERS_REQUEST,
  ALL_FARMERS_SUCCESS,
  DELETE_FARMER_FAIL,
  DELETE_FARMER_REQUEST,
  DELETE_FARMER_RESET,
  DELETE_FARMER_SUCCESS,
  ALL_CUSTOMER_FAIL,
  ALL_CUSTOMER_REQUEST,
  ALL_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_RESET,
  DELETE_CUSTOMER_SUCCESS,
  UPDATE_FARMER_FAIL,
  UPDATE_FARMER_REQUEST,
  UPDATE_FARMER_RESET,
  UPDATE_FARMER_SUCCESS,
  UPDATE_FARMPASSWD_FAIL,
  UPDATE_FARMPASSWD_REQUEST,
  UPDATE_FARMPASSWD_RESET,
  UPDATE_FARMPASSWD_SUCCESS,
  LOAD_FARMER_FAIL,
  LOAD_FARMER_REQUEST,
  LOAD_FARMER_SUCCESS,
  LOAD_ADMIN_FAIL,
  LOAD_ADMIN_REQUEST,
  LOAD_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAIL,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_RESET,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMNPASSWD_FAIL,
  UPDATE_ADMNPASSWD_REQUEST,
  UPDATE_ADMNPASSWD_RESET,
  UPDATE_ADMNPASSWD_SUCCESS,
  CLEAR_ERRORS
} from "../constants/uaerConstants";

export const userReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOAD_FARMER_REQUEST:
    case LOAD_ADMIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
    case LOAD_FARMER_SUCCESS:
    case LOAD_ADMIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        customer: action.payload,
      };

    case LOGOUT_FARMER_SUCCESS:
    case LOGOUT_ADMIN_SUCCESS:
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        customer: null,
        isAuthenticated: false,
      };

    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        customer: null,
        error: action.payload,
      };

    case LOAD_USER_FAIL:
    case LOAD_FARMER_FAIL:
    case LOAD_ADMIN_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        customer: null,
        error: action.payload,
      };

    case LOGOUT_FAIL:
    case LOGOUT_FARMER_FAIL:
    case LOGOUT_ADMIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case DELETE_FARMER_REQUEST:
    case DELETE_CUSTOMER_REQUEST:
    case UPDATE_FARMER_REQUEST:
    case UPDATE_FARMPASSWD_REQUEST:
    case UPDATE_ADMIN_REQUEST:
    case UPDATE_ADMNPASSWD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PROFILE_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_FARMER_SUCCESS:
    case UPDATE_FARMPASSWD_SUCCESS:
    case UPDATE_ADMIN_SUCCESS:
    case UPDATE_ADMNPASSWD_SUCCESS:
      console.log(action);
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_FARMER_SUCCESS:
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };

    case UPDATE_PROFILE_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case DELETE_FARMER_FAIL:
    case DELETE_CUSTOMER_FAIL:
    case UPDATE_FARMER_FAIL:
    case UPDATE_FARMPASSWD_FAIL:
    case UPDATE_ADMIN_FAIL:
    case UPDATE_ADMNPASSWD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_PROFILE_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_FARMER_RESET:
    case UPDATE_FARMPASSWD_RESET:
    case UPDATE_ADMIN_RESET:
    case UPDATE_ADMNPASSWD_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_FARMER_RESET:
    case DELETE_CUSTOMER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allFarmersReducer = (state = { farmers: [] }, action) => {
  switch (action.type) {
    case ALL_FARMERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_FARMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        farmers: action.payload,
      };

    case ALL_FARMERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allCustomerReducer = (state = { customer: [] }, action) => {
  switch (action.type) {
    case ALL_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
      };

    case ALL_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

