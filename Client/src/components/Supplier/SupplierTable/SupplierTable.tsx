import { displayOrDash } from "../../../utils/display";

export type SupplierRow = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

type SupplierTableProps = {
  rows: SupplierRow[];
  onEdit?: (row: SupplierRow) => void;
  onDelete?: (row: SupplierRow) => void;
};

export default function SupplierTable({ rows, onEdit, onDelete }: SupplierTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-center">
        <thead>
          <tr className="bg-[#1279C3] text-white">
            <th className="px-4 py-3 rounded-l-xl font-medium text-center align-middle">ID</th>
            <th className="px-4 py-3 font-medium text-center align-middle">Name</th>
            <th className="px-4 py-3 font-medium text-center align-middle">Address</th>
            <th className="px-4 py-3 font-medium text-center align-middle">Phone</th>
            <th className="px-4 py-3 rounded-r-xl font-medium text-center align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            const bg =
              index % 2 === 0
                ? "bg-slate-50/60 border-b border-slate-100"
                : "border-b border-slate-100";
            return (
              <tr
                key={row.id}
                className={`${bg} text-center cursor-pointer hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-3 text-xs font-semibold text-slate-700 text-center align-middle">
                  {row.id}
                </td>
                <td className="px-4 py-3 text-xs text-slate-700">{displayOrDash(row.name)}</td>
                <td className="px-4 py-3 text-xs text-slate-700">{displayOrDash(row.address)}</td>
                <td className="px-4 py-3 text-xs text-slate-700">{displayOrDash(row.phone)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      className="rounded-md border border-[#DDE4F0] px-4 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                      onClick={() => onEdit?.(row)}
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-md border border-[#FACDC3] px-4 py-1 text-xs font-medium text-[#EB2F06] hover:bg-[#1279C3]/5"
                      onClick={() => onDelete?.(row)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
