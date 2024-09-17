import axios from "axios";
import { orderListMyActions } from "../reducers/orderReducers";

import {
  userDeleteActions,
  userDetailsActions,
  userListActions,
  userLoginActions,
  userRegisterActions,
  userUpdateActions,
  userUpdateProfileActions,
} from "../reducers/userReducers";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginActions.userLoginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch(userLoginActions.userLoginSuccess(data));

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      userLoginActions.userLoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLoginActions.userLogout());
  dispatch(userDetailsActions.userDetailsReset());
  dispatch(orderListMyActions.orderListMyReset());
  dispatch(userListActions.userListReset());
};