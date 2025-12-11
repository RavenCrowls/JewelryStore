import { ShoppingOutlined } from "@ant-design/icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { type Options } from "@splidejs/splide";
import { Button, Col, Divider, Image, InputNumber, Row } from "antd";
import React, { useEffect, useRef } from "react";
import formatNumberWithDots from "../../../utils/formatNumberWithDots";
import Heading from "../components/Heading";
import "./ProductDetail.css";
import ProductCard from "../Home/components/ProductCard";

const productList = [
  {
    productImageUrl: "/src/assets/product-imgs/product1/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 11555000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product2/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 11949000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product3/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 12242000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product4/1.png",
    productName: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    price: 12539000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product5/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 19957000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product6/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 17338000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product7/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 20951000
  },
  {
    productImageUrl: "/src/assets/product-imgs/product8/1.png",
    productName: "Nhẫn cưới Vàng 14K Kim cương Lab-grown",
    price: 17557000
  }
];

export const ProductDetail: React.FC = () => {
  const mainRef = useRef<Splide>(null);
  const thumbsRef = useRef<Splide>(null);

  const productData = useRef({
    name: "Nhẫn cầu hôn Vàng 14K đá Moissanite",
    stock: 24,
    price: 11555000,
    images: [
      "/src/assets/product-imgs/product1/1.png",
      "/src/assets/product-imgs/product1/2.jpg",
      "/src/assets/product-imgs/product1/3.jpg",
      "/src/assets/product-imgs/product1/4.png",
      "/src/assets/product-imgs/product1/5.png",
      "/src/assets/product-imgs/product1/6.png"
    ]
  });

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  const mainOptions: Options = {
    type: "loop",
    height: "100%",
    perMove: 1,
    pagination: false
  };

  const thumbsOptions: Options = {
    type: "slide",
    rewind: true,
    arrows: false,
    gap: "8px",
    pagination: false,
    fixedWidth: 110,
    fixedHeight: 110,
    cover: true,
    focus: "center",
    isNavigation: true
  };

  /**
   * Render the component.
   *
   * @return A React node.
   */
  return (
    <div className="main-container mx-auto">
      <Row className="mt-6">
        <Col span={10}>
          <Splide options={mainOptions} ref={mainRef} aria-labelledby="thumbnail-slider-example">
            {productData.current.images.map((image, index) => (
              <SplideSlide key={index}>
                <Image
                  styles={{
                    cover: {
                      background: "rgba(0, 0, 0, 0.03)"
                    }
                  }}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-full object-cover mb-[12px] rounded"
                />
              </SplideSlide>
            ))}
          </Splide>

          <Splide
            options={thumbsOptions}
            ref={thumbsRef}
            aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
          >
            {productData.current.images.map((image, index) => (
              <SplideSlide key={index}>
                <img src={image} alt={`Product image ${index + 1}`} className="object-cover" />
              </SplideSlide>
            ))}
          </Splide>
        </Col>
        <Col span={14} className="px-28 flex flex-col">
          <h2 className="text-2xl font-bold mt-4">{productData.current.name}</h2>
          <span className="text-3xl font-bold text-[var(--primary-color)] my-2">
            {formatNumberWithDots(productData.current.price)}₫
          </span>
          <div className="border border-solid border-black rounded flex items-center justify-between px-8 py-2 my-4">
            <span>Số lượng:</span>
            <InputNumber
              mode="spinner"
              min={1}
              size="large"
              max={productData.current.stock}
              defaultValue={1}
              formatter={(value) => `${value}/${productData.current.stock}`}
              parser={(value) => parseInt(value!.replace(`/${productData.current.stock}`, ""))}
              className="w-full mr-6"
              variant="filled"
              placeholder="Filled"
            />
            <span className="teeter block w-auto h-auto text-[var(--primary-color)]">Còn hàng</span>
          </div>
          <div className="flex mx-auto">
            <button className="buy-btn">
              <h4 className="text-[21.28px] leading-7 ">MUA NGAY</h4>
              <span className="text-[11px]">(Giao nhanh từ 2 giờ hoặc nhận từ cửa hàng)</span>
            </button>
            <button className="add-to-cart-btn">
              <ShoppingOutlined className="text-[20px]" />
              <span className="text-[var(--primary-color)] text-[11px] leading-3">
                Thêm vào giỏ
              </span>
            </button>
          </div>

          <Divider />

          <div>
            <div className="flex items-center">
              <svg
                className="relative top-[1px] mr-1"
                width="18"
                height="18"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.6074 3.54932H8.01703C6.56482 3.54932 5.83871 3.54932 5.30404 3.95262C4.76937 4.35592 4.56989 5.05409 4.17094 6.45043L3.57126 8.54932H7.6699L8.6074 3.54932ZM3.11719 10.4735C3.11949 10.4902 3.12234 10.5068 3.12576 10.5233C3.17548 10.764 3.33779 10.9624 3.66241 11.3591L3.66241 11.3591L9.40831 18.3819L7.69493 10.5493H3.49983C3.36429 10.5493 3.23506 10.5224 3.11719 10.4735ZM14.5913 18.3819L20.3372 11.3591C20.6619 10.9624 20.8242 10.764 20.8739 10.5233C20.8773 10.5068 20.8802 10.4902 20.8825 10.4735C20.7646 10.5224 20.6354 10.5493 20.4998 10.5493H16.3047L14.5913 18.3819ZM20.4284 8.54932L19.8287 6.45043L19.8287 6.45042C19.4298 5.05409 19.2303 4.35592 18.6956 3.95262C18.1609 3.54932 17.4348 3.54932 15.9826 3.54932H15.3923L16.3298 8.54932H20.4284ZM13.3574 3.54932H10.6423L9.70475 8.54932H14.2949L13.3574 3.54932ZM11.9998 20.8698L9.74222 10.5493H14.2574L11.9998 20.8698Z"
                ></path>
              </svg>
              <h3 className="text-xl">Mô tả sản phẩm</h3>
            </div>
            <ul className="list-disc ml-5 mt-2">
              <li className="py-1">
                Kích thước đá: <strong>1 carat</strong>
              </li>
              <li className="py-1">
                Hình dạng: <strong>Round Cut</strong>
              </li>
              <li className="py-1">
                Màu sắc: <strong>Near Colorless</strong>
              </li>
              <li className="py-1">
                Độ tinh khiết: <strong>SI</strong>
              </li>
              <li className="py-1">
                Chất liệu trang sức: <strong>Vàng</strong>
              </li>
              <li className="py-1">
                Ni số: <strong>19.5</strong>
              </li>
            </ul>
          </div>
        </Col>
      </Row>

      <Divider />

      <Heading text="SẢN PHẨM TƯƠNG TỰ" />

      <Row gutter={[16, 16]}>
        {productList.map((item, index) => (
          <Col span={6} key={index}>
            <ProductCard
              productImageUrl={item.productImageUrl}
              productName={item.productName}
              price={item.price}
            />
          </Col>
        ))}
      </Row>

      <div className="flex mt-6 mb-8">
        <Button type="primary" size="large" danger className="mx-auto p-5">
          Xem Tất Cả
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;
