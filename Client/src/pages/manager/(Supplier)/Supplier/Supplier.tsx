import { useRef } from "react";
import SupplierTable from "../../../../components/Supplier/SupplierTable/SupplierTable";
import { useSuppliers } from "../../../../hooks/useSuppliers";

export default function Supplier() {
  const { rows, error } = useSuppliers(0, 100);
  const filterRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">Supplier</h2>
        </div>
        <div className="justify-end">
          <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
            Export
          </button>
        </div>
      </div>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {error ? (
          <div className="text-sm text-red-600">{error}</div>
        ) : (
          <SupplierTable rows={rows} onEdit={() => {}} onDelete={() => {}} />
        )}
      </section>
    </div>
  );
}
