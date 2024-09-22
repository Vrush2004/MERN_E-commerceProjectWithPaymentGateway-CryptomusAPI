import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import { getUserDetails, updateUser } from "../../actions/userActions";
import { userUpdateActions } from "../../reducers/userReducers";

const UserEditScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (!userLoginInfo || !userLoginInfo?.isAdmin) {
      navigate("/login");
    }
    if (successUpdate) {
      dispatch(userUpdateActions.userUpdateReset());
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setInputValues({
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    }
  }, [
    dispatch,
    user._id,
    user.email,
    user.isAdmin,
    user.name,
    userId,
    navigate,
    userLoginInfo,
    successUpdate,
  ]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };
