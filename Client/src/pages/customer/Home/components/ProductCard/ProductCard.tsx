import React from "react";
import formatNumberWithDots from "../../../../../helpers/formatNumberWithDots";
import { HeartOutlined } from "@ant-design/icons";
import "./ProductCard.css";

type ProductCardProps = {
  productImageUrl: string;
  productName: string;
  price: number;
};

const ProductCard: React.FC<ProductCardProps> = ({ productImageUrl, productName, price }) => {
  return (
    <div className="wrapper">
      <div
        style={{
          background: `url(${productImageUrl}) no-repeat center`,
          width: "100%",
          paddingBottom: "100%",
          backgroundSize: "contain",
          position: "relative"
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer"
          }}
        >
          <HeartOutlined />
        </button>
      </div>

      <div style={{ padding: "5px" }}>
        <p className="product-name">{productName}</p>
        <span
          style={{
            display: "block",
            color: "#ed8383",
            margin: "4px 0 2px",
            fontWeight: "bold",
            fontSize: "18px"
          }}
        >
          {formatNumberWithDots(price)}₫
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
