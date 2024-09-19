import { createSlice } from "@reduxjs/toolkit";

// PRODUCT LIST SLICE
const productListInitialState = { products: [] };

const productListSlice = createSlice({
  name: "productList",
  initialState: productListInitialState,
  reducers: {
    productListRequest() {
      return { loading: true, products: [] };
    },
    productListSuccess(state, action) {
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    },
    productListFail(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

// PRODUCT DETAIL SLICE
const productDetailInitialState = {
  product: { reviews: [] },
};

const productDetailsSlice = createSlice({
  name: "productDetail",
  initialState: productDetailInitialState,
  reducers: {
    productDetailsRequest(state) {
      return { loading: true, ...state };
    },
    productDetailsSuccess(state, action) {
      return { loading: false, product: action.payload };
    },
    productDetailsFail(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

// PRODUCT DELETE SLICE
const productDeleteInitialState = {
  product: {},
};

const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: productDeleteInitialState,
  reducers: {
    productDeleteRequest(state) {
      return { loading: true };
    },
    productDeleteSuccess(state, action) {
      return { loading: false, success: true };
    },
    productDeleteFail(state, action) {
      return { loading: false, error: action.payload };
    },
  },
});

// PRODUCT CREATE SLICE
const productCreateInitialState = {};

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: productCreateInitialState,
  reducers: {
    productCreateRequest(state) {
      return { loading: true };
    },
    productCreateSuccess(state, action) {
      return { loading: false, success: true, product: action.payload };
    },
    productCreateFail(state, action) {
      return { loading: false, error: action.payload };
    },
    productCreateReset(state, action) {
      return {};
    },
  },
});
