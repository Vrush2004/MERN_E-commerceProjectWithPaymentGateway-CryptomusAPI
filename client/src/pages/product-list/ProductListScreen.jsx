import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import Layout from "../../layouts/Layout";
import Header from "../../layouts/Header";
import Cart from "../../components/cart/Cart";
import Pagination from "../../components/Pagination";
import UserProfileButton from "../../components/UserProfileButton";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../actions/productActions";
import { productCreateActions } from "../../reducers/productReducers";

const ProductListScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();

  const pageNumber = params.pageNumber || 1;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(productCreateActions.productCreateReset());
    if (!userInfo.isAdmin) {
      navigate("/login");
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    createdProduct?._id,
    successCreate,
    pageNumber,
  ]);
