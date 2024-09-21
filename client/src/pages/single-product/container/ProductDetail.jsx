import React, { useRef, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "react-rating";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

import { screens } from "../../../constants";
import QuantityInput from "../../../components/cart/QuantityInput";

const ProductImages = styled.div`
  ${screens.lg(css`
    height: ${(props) => `${props.productImageHeight}px`};
  `)};
`;

const ProductSingleImage = styled.div`
  grid-row: 1;

  ${screens.lg(css`
    grid-row: auto;
  `)};
`;

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const ProductImagesContainerRef = useRef(null);
  const [productImageHeight, setProductImageHeight] = useState(0);
  const [error, setError] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setProductImageHeight(entries[0].contentRect.height);
    });
    observer.observe(ProductImagesContainerRef.current);
    return () =>
      ProductImagesContainerRef.current &&
      observer.unobserve(ProductImagesContainerRef.current);
  }, []);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${productQuantity}`);
  };

  return (
    <>
      <section className="grid gap-y-5 lg:gap-x-10 lg:grid-cols-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 grid-flow-dense min-h-0">
          <ProductImages
            className="flex overflow-auto lg:flex-col lg:col-span-2 lg:overflow-y-auto"
            productImageHeight={productImageHeight}
          >
            {[...Array(5)].map((item, index) => (
              <img
                key={index}
                className="w-[22%] lg:w-full"
                src="/images/sample.jpg"
                alt="product"
              />
            ))}
          </ProductImages>
          <ProductSingleImage className="lg:col-span-10 border border-gray-200 h-fit">
            <img
              ref={ProductImagesContainerRef}
              className="w-full object-cover"
              src={product.image}
              alt="product_image"
            />
          </ProductSingleImage>
        </div>