import { Button, Image, InputNumber } from "antd";
import formatNumberWithDots from "../../../../../helpers/formatNumberWithDots";
import { CloseOutlined } from "@ant-design/icons";
import { useRef } from "react";

type CartProductItemProps = {
  productImageUrl: string;
  productName: string;
  price: number;
  quantity: number;
  stock: number;
};

const CartProductItem: React.FC<CartProductItemProps> = ({
  productImageUrl,
  productName,
  price,
  quantity,
  stock
}) => {
  const totalPrice = useRef(price);

  return (
    <div className="flex  border border-solid border-black mb-2 relative rounded p-2">
      <div className="w-[120px] h-[120px]">
        <Image
          styles={{
            cover: {
              background: "rgba(0, 0, 0, 0.03)"
            }
          }}
          src={productImageUrl}
        />
      </div>
      <div className="flex flex-col flex-1 ml-3">
        <h3 className="text-xl mt-3">{productName}</h3>
        <span className="text-xl mt-1">{formatNumberWithDots(price)}₫</span>
        <div className="w-[140px] mt-2">
          <InputNumber
            mode="spinner"
            min={1}
            max={stock}
            defaultValue={quantity}
            formatter={(value) => `${value}/${stock}`}
            parser={(value) => parseInt(value!.replace(`/${stock}`, ""))}
            variant="filled"
            placeholder="Filled"
          />
        </div>
      </div>
      <Button
        size="small"
        icon={<CloseOutlined />}
        shape="circle"
        className="absolute top-1.5 right-1.5"
      />
      <span className="absolute bottom-2 right-4 text-2xl">
        Tổng: {formatNumberWithDots(totalPrice.current)}₫
      </span>
    </div>
  );
};

export default CartProductItem;
