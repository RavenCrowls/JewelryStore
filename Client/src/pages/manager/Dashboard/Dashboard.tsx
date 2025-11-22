import { useNavigate } from "react-router-dom";
import RevenueChart from "../../../components/RevenueChart/RevenueChart";
import SalesList from "../../../components/SalesList/SalesList";
import SellersList from "../../../components/SellersList/SellersList";
import BillChart from "../../../components/BillChart/BillChart";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleGoToProducts = () => {
    navigate("/manager/products");
  };

  return (
    <div className="space-y-5 mt-4">
      {/* Hàng tiêu đề + nút */}
      <div className="flex items-center justify-between mx-5">
        <h2 className="text-xl font-semibold tracking-tight">Dashboard</h2>

        <button
          onClick={handleGoToProducts}
          className="px-4 py-2 rounded-xl bg-[#1279C3] text-white text-sm font-medium hover:bg-[#0f69aa] active:scale-[0.98] transition"
        >
          Xem danh sách sản phẩm
        </button>
      </div>

      {/* Revenue Card */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg">Revenue</h3>
        <p className="text-2xl font-bold mt-1">79.852.000 VND</p>
        <span className="text-green-600 text-sm">↑ 2.1% vs last week</span>

        <div className="mt-4">
          <RevenueChart />
        </div>
      </section>

      {/* Bottom section */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        <SalesList />
        <SellersList />
        <BillChart />
      </section>
    </div>
  );
}
