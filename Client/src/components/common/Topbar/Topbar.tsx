import { useNavigate, useLocation } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const goToProducts = () => {
    navigate("/manager/products");
  };

  // Nếu đã ở /manager/products thì ẩn nút
  const showProductButton = !location.pathname.startsWith("/manager/products");

  return (
    <header className="w-full h-16 px-6 flex items-center justify-between bg-white shadow-sm">
      {/* Bên trái: có thể để trống hoặc sau này thêm breadcrumb / search */}
      <div />

      {/* Bên phải: nút + avatar */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3">
          <img
            src="/img/avt.png"
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="font-medium text-sm">Quang Hạo</span>
        </div>
      </div>
    </header>
  );
}
