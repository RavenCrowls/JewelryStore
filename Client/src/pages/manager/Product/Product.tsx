import { useNavigate } from "react-router-dom";
import RevenueChart from "../../../components/Dashboard/RevenueChart/RevenueChart";
import SalesList from "../../../components/Dashboard/SalesList/SalesList";
import SellersList from "../../../components/Dashboard/SellersList/SellersList";
import StatLineCard from "../../../components/common/StatLineCard/StatLineCard";
import { useEffect, useRef, useState } from "react";
import PriceFilterPopup from "../../../components/common/PriceFilterPopup/PriceFilterPopup";

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

 

  const [isDateOpen, setIsDateOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setIsDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 relative" ref={filterRef}>
                <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
                  Product
                </h2>
      
                {/* nút 3 gạch */}
                <button
                  type="button"
                  onClick={() => setIsDateOpen((prev) => !prev)}
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 text-xs hover:bg-slate-50 transition"
                >
                  ☰
                </button>
      
                {/* Popup price-range */}
                <PriceFilterPopup 
                  isOpen={isDateOpen} 
                  className="top-1 left-20"
                />
            </div>
            <div className="justify-end">
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">
                  Add new product
                </button>
                {/* Export button */}
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
                  Export
                </button>
            </div>
                
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
