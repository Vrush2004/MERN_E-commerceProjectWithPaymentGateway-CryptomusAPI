import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
    setInputValues((curState) => ({
      ...curState,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(inputValues.email, inputValues.password));
  };

  return (
    <Layout>
      <Header className="justify-end">
        <div className="flex items-center divide-x divide-gray-200 border-x border-b border-gray-200">
          <Cart className="hidden lg:block p-6 text-palette-graniteGray" />
          <UserProfileButton className="hidden lg:block p-6 text-palette-graniteGray" />
        </div>
      </Header>
      <FormContainer className="flex flex-col items-center justify-center py-10 px-5 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-4xl font-semibold mb-4 text-center text-gray-800">Sign In</h1>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}
        <form onSubmit={submitHandler} className="w-full">
          <div className="form-control mb-4">
            <label className="label text-gray-600" htmlFor="email">
              Email Address
            </label>
            <input
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              id="email"
              type="email"
              placeholder="Enter your email"
              value={inputValues.email}
              name="email"
              onChange={inputChangeHandler}
              required
            />
          </div>
          <div className="form-control mb-6">
            <label className="label text-gray-600" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={inputValues.password}
              name="password"
              onChange={inputChangeHandler}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-150 ease-in-out"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <div className="py-4 text-center">
          <p className="text-gray-600">New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-blue-500 hover:underline"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </FormContainer>
    </Layout>
  );
};

export default LoginScreen;
