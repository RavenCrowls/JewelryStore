import { useNavigate } from "react-router-dom";
import RevenueChart from "../../../components/Dashboard/RevenueChart/RevenueChart";
import SalesList from "../../../components/Dashboard/SalesList/SalesList";
import SellersList from "../../../components/Dashboard/SellersList/SellersList";
import StatLineCard from "../../../components/common/StatLineCard/StatLineCard";

const billData = [
  { day: "01", thisWeek: 20, lastWeek: 35 },
  { day: "02", thisWeek: 45, lastWeek: 40 },
  { day: "03", thisWeek: 55, lastWeek: 52 },
  { day: "04", thisWeek: 38, lastWeek: 37 },
  { day: "05", thisWeek: 50, lastWeek: 43 },
  { day: "06", thisWeek: 42, lastWeek: 39 },
  { day: "07", thisWeek: 63, lastWeek: 52 },
];


export default function Dashboard() {
  const navigate = useNavigate();

  const handleGoToReport = () => {
    navigate("/manager/report");
  };

  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">Dashboard</h2>
        <button 
          onClick={handleGoToReport}
          className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">
          View Report
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
        <StatLineCard
        title="Bill"
        total={120}
        diffPercent={2.1}
        isUp={false}
        data={billData}
        currentKey="thisWeek"
        lastKey="lastWeek"
      />
      </section>
    </div>
  );
}
