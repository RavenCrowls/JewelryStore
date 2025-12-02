export type ImportState = "pending" | "success" | "failed";

export type ImportRow = {
  lot: string;
  supplier: string;
  date: string;
  total: number;
  currency?: string;
  state: ImportState;
};

type ImportTableProps = {
  rows: ImportRow[];
  onView?: (row: ImportRow) => void;
};

export default function ImportTable({ rows, onView }: ImportTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-center">
        <thead>
          <tr className="bg-[#1279C3] text-white">
            <th className="px-4 py-3 rounded-l-xl font-medium text-left">
              LOT
            </th>
            <th className="px-4 py-3 font-medium">Supplier</th>
            <th className="px-4 py-3 font-medium">
              Date <span className="text-xs">↕</span>
            </th>
            <th className="px-4 py-3 font-medium">
              Total <span className="text-xs">↕</span>
            </th>
            <th className="px-4 py-3 font-medium">State</th>
            <th className="px-4 py-3 rounded-r-xl font-medium">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const bg =
              index % 2 === 0
                ? "bg-slate-50/60 border-b border-slate-100"
                : "border-b border-slate-100";

            // icon trực tiếp từ public/img
            let stateIcon = "";
            let stateBorder = "";

            if (row.state === "pending") {
              stateIcon = "/img/loading.png";
              stateBorder = "border-[#1279C3]";
            } else if (row.state === "success") {
              stateIcon = "/img/success.png";
              stateBorder = "border-[#2ECC71]";
            } else {
              stateIcon = "/img/failed.png";
              stateBorder = "border-[#E74C3C]";
            }

            return (
              <tr key={row.lot} className={`${bg} text-center`}>
                {/* LOT */}
                <td className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                  {row.lot}
                </td>

                {/* Supplier */}
                <td className="px-4 py-3 text-xs text-slate-700">
                  {row.supplier}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-xs text-slate-700">
                  {row.date}
                </td>

                {/* Total */}
                <td className="px-4 py-3 text-xs text-slate-700">
                  {row.total.toLocaleString("vi-VN")} {row.currency ?? "VND"}
                </td>

                {/* State */}
                <td className="px-4 py-3 text-xs">
                  <div
                    className={`inline-flex h-8 w-10 items-center justify-center rounded-md border ${stateBorder}`}
                  >
                    <img
                      src={stateIcon}
                      alt={row.state}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <button className="rounded-md border border-[#DDE4F0] px-5 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                    onClick={() => onView?.(row)} 
                  >
                    View
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
