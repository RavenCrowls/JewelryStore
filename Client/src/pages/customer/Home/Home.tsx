import { Carousel, ConfigProvider } from "antd";
import CarouselItem from "./components/CarouselItem";

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

export default function Home() {
  return (
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
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={3000} effect="fade" arrows infinite>
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
  );
}
