import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  // Nếu đã ở /manager/products thì ẩn nút

  return (
    <header className="w-full px-6 py-2 flex items-center justify-end bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src="/img/avt.png"
          alt="Avatar"
          className="w-9 h-9 rounded-full object-cover"
        />
        <span className="font-medium text-sm">Quang Hạo</span>
      </div>
    </header>
  );
}
