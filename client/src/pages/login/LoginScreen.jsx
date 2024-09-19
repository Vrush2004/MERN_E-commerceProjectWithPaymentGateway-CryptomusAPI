import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Alert from "../../components/Alert";
import FormContainer from "../../components/FormContainer";
import { login } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";

const LoginScreen = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect")
    ? "/" + searchParams.get("redirect")
    : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const inputChangeHandler = (e) => {
    const { value, name } = e.target;
    setInputValues((curState) => {
      return { ...curState, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(inputValues.email, inputValues.password));
  };
