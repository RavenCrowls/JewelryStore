export type CustomerPurchaseRow = {
  id: string;
  content: string;
  date: string;
  total: number;
  currency?: string;
  loyalty: number;
};

type CustomerPurchaseProps = {
  rows: CustomerPurchaseRow[];
};

export default function CustomerPurchaseTable({ rows }: CustomerPurchaseProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold text-[#1279C3]">Purchase History</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-center text-sm">
          <thead>
            <tr className="bg-[#1279C3] text-white">
              <th className="px-4 py-3 rounded-l-xl font-medium text-left">ID</th>
              <th className="px-4 py-3 font-medium">Content</th>
              <th className="px-4 py-3 font-medium">
                Date <span className="text-xs">↕</span>
              </th>
              <th className="px-4 py-3 font-medium">
                Total <span className="text-xs">↕</span>
              </th>
              <th className="px-4 py-3 font-medium">Loyalty Point</th>
              <th className="px-4 py-3 rounded-r-xl font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => {
              const bg =
                index % 2 === 0
                  ? "bg-slate-50/60 border-b border-slate-100"
                  : "border-b border-slate-100";

              return (
                <tr key={row.id} className={`${bg} text-center`}>
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {row.content}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {row.date}
                  </td>
                  <td
                    className={`px-4 py-3 text-xs text-center text-black`}
                  >
                    {row.total.toLocaleString("vi-VN")}{" "}
                    {row.currency ?? "VND"}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {row.loyalty}
                  </td>

                  <td className="px-4 py-3">
                  <button className="rounded-md border border-[#DDE4F0] px-5 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                    // onClick={() => onView?.(row)} route to bill info page
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
    </div>
  );
}
