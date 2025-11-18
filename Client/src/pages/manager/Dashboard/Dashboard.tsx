import RevenueChart from "../../../components/RevenueChart/RevenueChart";
import SalesList from "../../../components/SalesList/SalesList";
import SellersList from "../../../components/SellersList/SellersList";
import BillChart from "../../../components/BillChart/BillChart";




export default function Dashboard() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Dashboard</h2>

      {/* Revenue Card */}
      <div className="bg-white rounded-xl p-6 shadow mb-6">
        <h3 className="font-semibold text-lg">Revenue</h3>
        <p className="text-2xl font-bold mt-1">79.852.000 VND</p>
        <span className="text-green-600 text-sm">↑ 2.1% vs last week</span>

        <RevenueChart />
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-3 gap-6">
        <SalesList />
        <SellersList />
        <BillChart />
      </div>
    </div>
  );
}
