import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import {
  Carousel,
  Col,
  ConfigProvider,
  Input,
  InputNumber,
  Pagination,
  Row,
  Slider,
  Tree,
  type SliderSingleProps,
  type TreeDataNode,
  type TreeProps
} from "antd";
import { useState } from "react";
import FastDeliveryIcon from "../../../assets/benefit-icons/FastDeliveryIcon.svg";
import GemstoneIcon from "../../../assets/benefit-icons/GemstoneIcon.svg";
import ProtectedIcon from "../../../assets/benefit-icons/ProtectedIcon.svg";
import formatNumberWithDots from "../../../helpers/formatNumberWithDots";
import parseNumberFromDots from "../../../helpers/parseNumberFromDots";
import Heading from "../components/Heading";
import BenefitItem from "./components/BenefitItem";
import CarouselItem from "./components/CarouselItem";
import ProductCard from "./components/ProductCard";

const { Search } = Input;

const carouselItemList = [
  {
    leftImageUrl: "/src/assets/carousel-imgs/necklace.jpg",
    heading: "NECKLACES",
    subheading: "GRACE REFINED",
    rightImageUrl: "/src/assets/carousel-imgs/necklace-1.jpg",
    message:
      "Elevate every look with our exquisite necklaces. From pendants to chokers, these designs add sophistication to any style.",
    btnText: "SHOP NECLACES"
  },
  {
    leftImageUrl: "/src/assets/carousel-imgs/ring.jpg",
    heading: "RINGS",
    subheading: "A CIRCLE OF PERFECTION",
    rightImageUrl: "/src/assets/carousel-imgs/ring-1.jpg",
    message: "Celebrate every milestone with a ring that tells your story.",
    btnText: "SHOP RINGS"
  },
  {
    leftImageUrl: "/src/assets/carousel-imgs/earrings.jpg",
    heading: "EARRINGS",
    subheading: "ELEGANCE IN EVERY DETAIL",
    rightImageUrl: "/src/assets/carousel-imgs/earrings-1.jpg",
    message:
      "From everyday essentials to show-stopping chandeliers, our earrings are designed to captivate and complement every moment.",
    btnText: "SHOP EARRINGS"
  },
  {
    leftImageUrl: "/src/assets/carousel-imgs/bracelet.jpg",
    heading: "BRACELETS",
    subheading: "STYLE ON YOUR SLEEVE",
    rightImageUrl: "/src/assets/carousel-imgs/bracelet-1.jpg",
    message:
      "Add the perfect finishing touch with our bracelets. From classic bangles to modern cuffs, each piece is a work of art.",
    btnText: "SHOP BRACELETS"
  }
];

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

const treeData: TreeDataNode[] = [
  {
    title: "Loại trang sức",
    key: "category",
    children: [
      {
        title: "Dây chuyền",
        key: "category-necklaces"
      },
      {
        title: "Nhẫn",
        key: "category-rings"
      },
      {
        title: "Bông tai",
        key: "category-earrings"
      },
      {
        title: "Vòng tay",
        key: "category-bracelets"
      }
    ]
  },
  {
    title: "Loại đá",
    key: "gemstone",
    children: [
      {
        title: "Kim cương",
        key: "gemstone-diamond"
      },
      {
        title: "Ruby",
        key: "category-ruby"
      },
      {
        title: "Shapphire",
        key: "category-shapphire"
      },
      {
        title: "Emerald",
        key: "category-emerald"
      }
    ]
  }
];

const formatter: NonNullable<SliderSingleProps["tooltip"]>["formatter"] = (value) =>
  `${formatNumberWithDots(value!)}₫`;

export default function Home() {
  const [priceFilterRange, setPriceFilterRange] = useState([0, 20000000]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Carousel: {
              arrowOffset: 20,
              arrowSize: 32,
              dotWidth: 64,
              dotActiveWidth: 64,
              dotOffset: 12
            }
          }
        }}
      >
        <Carousel
          autoplay={{ dotDuration: true }}
          autoplaySpeed={5000}
          effect="fade"
          arrows
          infinite
          pauseOnHover={false}
          pauseOnDotsHover
        >
          {carouselItemList.map((item, index) => (
            <CarouselItem
              key={index}
              leftImageUrl={item.leftImageUrl}
              heading={item.heading}
              subheading={item.subheading}
              rightImageUrl={item.rightImageUrl}
              message={item.message}
              btnText={item.btnText}
            />
          ))}
        </Carousel>
      </ConfigProvider>
      <div style={{ backgroundColor: "#faf2e7" }}>
        {/* NEW PRODUCTS */}
        <Heading text="NEW PRODUCTS" />
        <div className="mx-8">
          <Splide
            options={{
              rewind: true,
              perPage: 4,
              perMove: 1,
              gap: "1rem",
              breakpoints: {
                1000: {
                  perPage: 1
                }
              },
              autoplay: true,
              interval: 3000
            }}
            aria-label="Splide"
          >
            {productList.map((item, index) => (
              <SplideSlide key={index}>
                <ProductCard
                  productImageUrl={item.productImageUrl}
                  productName={item.productName}
                  price={item.price}
                />
              </SplideSlide>
            ))}
          </Splide>
        </div>

        {/* BENEFITS BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#686863",
            margin: "60px 0",
            width: "100%",
            height: "120px"
          }}
        >
          <BenefitItem src={FastDeliveryIcon} text="Fast and Free Delivery" />
          <BenefitItem src={GemstoneIcon} text="Gem Authencity Guaranteed" />
          <BenefitItem src={ProtectedIcon} text="Gem Laboratory Certification" />
        </div>

        {/* ALL PRODUCTS */}
        <Heading text="ALL PRODUCTS" />
        <div className="mx-8">
          <Row gutter={[24, 24]}>
            <Col span={6}>
              <Search
                placeholder="Search Product Here"
                allowClear
                style={{ width: "100%" }}
                size="large"
              />
              <div className="my-6">
                <div className="flex items-center ">
                  <InputNumber
                    size="large"
                    prefix="₫"
                    style={{ width: "100%" }}
                    value={priceFilterRange[0]}
                    onChange={(value) =>
                      setPriceFilterRange([value as number, priceFilterRange[1]])
                    }
                    formatter={(value) => `${formatNumberWithDots(value!)}`}
                    parser={(value) => parseNumberFromDots(value!)}
                    min={0}
                    max={priceFilterRange[1]}
                  />
                  <span className="mx-4"> - </span>
                  <InputNumber
                    size="large"
                    prefix="₫"
                    style={{ width: "100%" }}
                    value={priceFilterRange[1]}
                    onChange={(value) =>
                      setPriceFilterRange([priceFilterRange[0], value as number])
                    }
                    formatter={(value) => `${formatNumberWithDots(value!)}`}
                    parser={(value) => parseNumberFromDots(value!)}
                    min={priceFilterRange[0]}
                    max={20000000}
                  />
                </div>
                <Slider
                  className="mx-4"
                  range
                  defaultValue={[20, 50]}
                  min={0}
                  max={20000000}
                  step={100000}
                  tooltip={{ formatter }}
                  value={priceFilterRange}
                  onChange={(value) => setPriceFilterRange(value as [number, number])}
                />
              </div>
              <Tree
                checkable
                defaultExpandedKeys={["category", "gemstone"]}
                defaultCheckedKeys={["category", "gemstone"]}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={treeData}
              />
            </Col>
            <Col span={18} className="flex flex-col">
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

              <Pagination
                size="default"
                className="mx-auto my-6"
                showSizeChanger={false}
                defaultCurrent={1}
                total={160}
                defaultPageSize={16}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
