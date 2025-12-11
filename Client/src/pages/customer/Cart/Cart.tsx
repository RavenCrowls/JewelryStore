import {
  CheckOutlined,
  DoubleLeftOutlined,
  ReloadOutlined,
  RollbackOutlined
} from "@ant-design/icons";
import { Button } from "antd";
import { useRef } from "react";
import formatNumberWithDots from "../../../utils/formatNumberWithDots";
import Heading from "../components/Heading";
import CartProductItem from "./components/CartProductItem";
import { Link } from "react-router-dom";

const productList = [
  {
    productImageUrl: "/src/assets/product-imgs/product1/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 11555000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product2/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 11949000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product3/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 12242000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product4/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 12539000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product5/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 19957000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product6/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 17338000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product7/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 20951000,
    quantity: 1,
    stock: 24
  },
  {
    productImageUrl: "/src/assets/product-imgs/product8/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 17557000,
    quantity: 1,
    stock: 24
  }
];

export default function Cart() {
  const quantity = useRef(0);
  const totalPrice = useRef(
    productList.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0)
  );

  return (
    <div className="main-container">
      <Heading className="!mt-12 !mb-0" text="Giỏ hàng của bạn" />
      <p className="text-center text-[18px]">Có {quantity.current} sản phẩm trong giỏ hàng</p>
      <div className="h-[4px] bg-black w-[80px] mx-auto rounded mt-4 mb-6" />
      <div className="flex flex-col gap-4">
        {productList.map((item, index) => (
          <CartProductItem
            key={index}
            productImageUrl={item.productImageUrl}
            productName={item.productName}
            price={item.price}
            quantity={item.quantity}
            stock={item.stock}
          />
        ))}
      </div>
      <div className="flex">
        <span className="ml-auto text-4xl mt-8">
          <span className="text-2xl">Tổng tiền: </span>
          {formatNumberWithDots(totalPrice.current)}₫
        </span>
      </div>
      <div>
        <div className="flex justify-center mt-4 mb-8">
          <Link to="/">
            <Button
              className="p-6 ml-2 bg-blue rounded-none pt-8"
              style={{ fontFamily: "Josefin Sans" }}
              icon={<DoubleLeftOutlined />}
            >
              TIẾP TỤC MUA HÀNG
            </Button>
          </Link>
          <Button
            className="p-6 ml-2 bg-blue rounded-none pt-8"
            style={{ fontFamily: "Josefin Sans" }}
            icon={<ReloadOutlined />}
            onClick={() => {
              window.location.reload();
            }}
          >
            CẬP NHẬT
          </Button>
          <Button
            className="p-6 ml-2 bg-blue rounded-none pt-8"
            style={{ fontFamily: "Josefin Sans" }}
            icon={<CheckOutlined />}
          >
            THANH TOÁN
          </Button>
        </div>
      </div>
    </div>
  );
}
