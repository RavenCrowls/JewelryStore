import { CheckOutlined, DoubleLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Modal, Input, message } from "antd";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import formatNumberWithDots from "../../../utils/formatNumberWithDots";
import Heading from "../components/Heading";
import CartProductItem from "./components/CartProductItem";
import { CartService, type CartDto } from "../../../services";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await CartService.getMyCart();
      setCart(data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      message.error("Không thể tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveProduct = async (productId: number) => {
    try {
      await CartService.removeProduct(productId);
      message.success("Đã xóa sản phẩm khỏi giỏ hàng");
      fetchCart();
    } catch (err) {
      console.error("Failed to remove product:", err);
      message.error("Không thể xóa sản phẩm");
    }
  };

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    try {
      await CartService.updateQuantity({ productId, quantity });
      fetchCart();
    } catch (err) {
      console.error("Failed to update quantity:", err);
      message.error("Không thể cập nhật số lượng");
    }
  };

  const handleConfirmCart = async () => {
    if (!shippingAddress || !phoneNumber) {
      message.error("Vui lòng nhập đầy đủ thông tin giao hàng");
      return;
    }

    try {
      const result = await CartService.confirmCart({ shippingAddress, phoneNumber });
      message.success("Đặt hàng thành công!");
      setIsConfirmModalOpen(false);
      navigate(`/order/${result.orderId}`);
    } catch (err) {
      console.error("Failed to confirm cart:", err);
      message.error("Không thể đặt hàng. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <div className="main-container">
        <div className="text-center py-12">Đang tải giỏ hàng...</div>
      </div>
    );
  }

  const itemCount = cart?.items.length || 0;
  const totalPrice = cart?.totalPrice || 0;

  return (
    <div className="main-container">
      <Heading className="!mt-12 !mb-0" text="Giỏ hàng của bạn" />
      <p className="text-center text-[18px]">Có {itemCount} sản phẩm trong giỏ hàng</p>
      <div className="h-[4px] bg-black w-[80px] mx-auto rounded mt-4 mb-6" />
      {itemCount === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
          <Link to="/">
            <Button type="primary" size="large">
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart?.items.map((item) => (
              <CartProductItem
                key={item.productId}
                productId={item.productId}
                productImageUrl={item.productImage || "/img/placeholder.png"}
                productName={item.productName}
                price={item.priceAtAdd}
                quantity={item.quantity}
                onRemove={handleRemoveProduct}
                onQuantityChange={handleUpdateQuantity}
              />
            ))}
          </div>
          <div className="flex">
            <span className="ml-auto text-4xl mt-8">
              <span className="text-2xl">Tổng tiền: </span>
              {formatNumberWithDots(totalPrice)}₫
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
                onClick={fetchCart}
              >
                CẬP NHẬT
              </Button>
              <Button
                className="p-6 ml-2 bg-blue rounded-none pt-8"
                style={{ fontFamily: "Josefin Sans" }}
                icon={<CheckOutlined />}
                onClick={() => setIsConfirmModalOpen(true)}
              >
                THANH TOÁN
              </Button>
            </div>
          </div>
        </>
      )}

      <Modal
        title="Xác nhận đặt hàng"
        open={isConfirmModalOpen}
        onOk={handleConfirmCart}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText="Đặt hàng"
        cancelText="Hủy"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Địa chỉ giao hàng:</label>
            <Input.TextArea
              rows={3}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Nhập địa chỉ giao hàng"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Số điện thoại:</label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
