import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import { listUsers, deleteUser } from "../../actions/userActions";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import UserProfileButton from "../../components/UserProfileButton";

const UserListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id, name) => {
    if (window.confirm(`Are you sure that you want to delete ${name}`)) {
      dispatch(deleteUser(id));
    }
  };