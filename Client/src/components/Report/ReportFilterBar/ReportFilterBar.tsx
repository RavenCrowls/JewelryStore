import { useEffect, useRef, useState } from "react";
import { Search } from 'lucide-react';
type Period = "monthly" | "annually";

export default function ReportFilterBar() {
  const [period, setPeriod] = useState<Period>("monthly");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  // Click ra ngoài thì đóng popup
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
    <div className="space-y-4">
      {/* Hàng trên: Search + Export (nếu muốn giữ) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full max-w-sm">
          <label className="sr-only" htmlFor="report-search">
            
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              id="report-search"
              type="text"
              placeholder="Search"
              className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            </span>
          </div>
        </div>

        {/* Export button */}
        <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">
          Export
        </button>
      </div>

      {/* Hàng dưới: Report + filter icon + Monthly/Annually */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Report + nút filter + popup date-range */}
        <div className="flex items-center gap-3" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-black">
            Report
          </h2>

          {/* nút 3 gạch */}
          <button
            type="button"
            onClick={() => setIsDateOpen((prev) => !prev)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 text-xs hover:bg-slate-50 transition"
          >
            ☰
          </button>

          {/* Popup date-range */}
          {isDateOpen && (
            <div className="absolute z-20 mt-10 rounded-2xl border border-slate-300 bg-white px-4 py-3 shadow-lg">
              <div className="flex flex-col gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-500">From</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        defaultValue="2024-09-01"
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>

                  <div className="h-10 w-px bg-slate-200" />

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] text-slate-500">To</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        defaultValue="2024-09-07"
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs outline-none focus:border-blue-400"
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Switch Monthly / Annually */}
        <div className="inline-flex items-center rounded-full bg-slate-100 p-1 text-xs">
          <button
            onClick={() => setPeriod("monthly")}
            className={
              "rounded-full px-4 py-1.5 transition " +
              (period === "monthly"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500")
            }
          >
            Monthly
          </button>
          <button
            onClick={() => setPeriod("annually")}
            className={
              "rounded-full px-4 py-1.5 transition " +
              (period === "annually"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500")
            }
          >
            Annually
          </button>
        </div>
      </div>
    </div>
  );
}
