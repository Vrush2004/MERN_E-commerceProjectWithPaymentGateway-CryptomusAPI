import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import CheckoutSteps from "../../components/cart/CheckoutSteps";
import Alert from "../../components/Alert";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";
import { createOrder } from "../../actions/orderActions";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  // Calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = 0;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };