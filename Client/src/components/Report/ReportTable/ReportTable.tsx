export default function ReportTable() {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">Income and expenses</h3>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="bg-[#1279C3] text-white">
              <th className="px-4 py-3 rounded-l-xl font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Content</th>
              <th className="px-4 py-3 font-medium">
                Date <span className="text-xs">↕</span>
              </th>
              <th className="px-4 py-3 rounded-r-xl font-medium text-right">
                Total <span className="text-xs">↕</span>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-slate-100 bg-slate-50/60">
              <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                LOT1
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                Import product
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                07/09/2024
              </td>
              <td className="px-4 py-3 text-xs text-right text-red-500">
                -100,000,000 VND
              </td>
            </tr>

            <tr className="border-b border-slate-100">
              <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                B070924096523
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                Sell product
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                07/09/2024
              </td>
              <td className="px-4 py-3 text-xs text-right text-green-600">
                +27,000,000 VND
              </td>
            </tr>

            <tr className="border-b border-slate-100 bg-slate-50/60">
              <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                B070924096524
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                Sell product
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                07/09/2024
              </td>
              <td className="px-4 py-3 text-xs text-right text-green-600">
                +32,000,000 VND
              </td>
            </tr>

            <tr>
              <td className="px-4 py-3 text-xs font-semibold text-slate-700">
                F0709240001
              </td>
              <td className="px-4 py-3 text-xs text-slate-600">
                Rent fee
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                07/09/2024
              </td>
              <td className="px-4 py-3 text-xs text-right text-red-500">
                -15,000,000 VND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
