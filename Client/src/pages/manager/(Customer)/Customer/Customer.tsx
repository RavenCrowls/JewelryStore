import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerTable from "../../../../components/Customer/CustomerTable/CustomerTable";
import { useCustomers } from "../../../../hooks/useCustomers";

export default function Customer() {
  const navigate = useNavigate();
  const { rows, error } = useCustomers(0, 200);
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewCustomer = (row: any) => {
    navigate(`/manager/customer/${row.name}`);
  };

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((row) =>
      [row.name, (row as any).email, (row as any).phone, (row as any).address]
        .filter(Boolean)
        .some((value) => value!.toString().toLowerCase().includes(term))
    );
  }, [rows, searchTerm]);
  const filterRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">Customer</h2>
        </div>
        <div className="flex-1 min-w-[240px] max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, phone, or address"
            className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div className="justify-end flex gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
            onClick={() => navigate("/manager/user/add")}
          >
            Add new customer
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
            Export
          </button>
        </div>
      </div>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <CustomerTable rows={filteredRows} onView={handleViewCustomer} />
        )}
      </section>
    </div>
  );
}
