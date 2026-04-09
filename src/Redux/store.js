import { legacy_createStore as createStore } from "redux";

/* ================= AUTH REDUCER ================= */

const initialState = {
  user: null,      // { uid, email, role }
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    /* ---------- LOGIN ---------- */
    case "LOGIN_START":
    case "REGISTER_START":
      return {
        ...state,
        loading: true,
        error: null
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };

    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    /* ---------- LOGOUT ---------- */
    case "LOGOUT":
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
};

/* ================= STORE ================= */

export const store = createStore(authReducer);

/* ================= ACTION CREATORS ================= */

export const loginStart = () => ({ type: "LOGIN_START" });
export const loginSuccess = (user) => ({ type: "LOGIN_SUCCESS", payload: user });
export const loginFail = (err) => ({ type: "LOGIN_FAIL", payload: err });

export const registerStart = () => ({ type: "REGISTER_START" });
export const registerSuccess = (user) => ({ type: "REGISTER_SUCCESS", payload: user });
export const registerFail = (err) => ({ type: "REGISTER_FAIL", payload: err });

export const logout = () => ({ type: "LOGOUT" });
