import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineEye } from "react-icons/ai";

import Alert from "../../components/Alert";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import { listMyOrders } from "../../actions/orderActions";
import Loader from "../../components/Loader";

const ProfileScreen = () => {
  const [inputValues, setInputValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: userLoginInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userLoginInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setInputValues((curState) => {
          return { ...curState, name: user.name, email: user.email };
        });
      }
    }
  }, [navigate, userLoginInfo, dispatch, user.email, user.name]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (inputValues.password !== inputValues.confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      dispatch(
        updateUserProfile({
          id: user._id,
          name: inputValues.name,
          email: inputValues.email,
          password: inputValues.password,
        })
      );
    }
  };