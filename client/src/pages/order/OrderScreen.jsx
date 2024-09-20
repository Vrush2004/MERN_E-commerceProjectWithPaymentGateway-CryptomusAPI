import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "../../components/Loader";
import Alert from "../../components/Alert";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import { getOrderDetails, deliverOrder } from "../../actions/orderActions";
import {
  orderPayActions,
  orderDeliverActions,
} from "../../reducers/orderReducers";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!order || successPay || successDeliver) {
      dispatch(orderPayActions.orderPayReset());
      dispatch(orderDeliverActions.orderDeliverReset());
      dispatch(getOrderDetails(orderId));
    }
  }, [
    dispatch,
    order,
    orderId,
    successPay,
    successDeliver,
    navigate,
    userInfo,
  ]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const payOrderHandler = async () => {
    setPaymentLoading(true);

    // request to the backend to create invoice and then redirect the user to the payment URL

    setPaymentLoading(false);
  };

  const deliverHandler = async () => {
    dispatch(deliverOrder(order));
  };
