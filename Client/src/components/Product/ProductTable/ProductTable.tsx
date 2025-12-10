export type ProductRow = {
  id: string;
  name: string;
  subtitle?: string;
  imageUrl: string;
  category: string;
  price: number;
  quantity: number;
  currency?: string;
};

type ProductTableProps = {
  rows: ProductRow[];
  onRowClick?: (row: ProductRow) => void;
};

export default function ProductTable({ rows, onRowClick}: ProductTableProps) {
  return (
    <div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="bg-[#1279C3] text-white">
              <th className="px-4 py-3 rounded-l-xl font-medium text-left">
                ID
              </th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">
                Price <span className="text-xs">↕</span>
              </th>
              <th className="px-4 py-3 font-medium">Quantity</th>
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
                  {/* ID */}
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                    {row.id}
                  </td>

                  {/* Name + subtitle */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    <div className="font-semibold text-sm">{row.name}</div>
                    {row.subtitle && (
                      <div className="text-[11px] text-slate-500">
                        {row.subtitle}
                      </div>
                    )}
                  </td>

                  {/* Image */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <img
                        src={row.imageUrl}
                        alt={row.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-3 text-xs text-slate-600">
                    {row.category}
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.price.toLocaleString("vi-VN")}{" "}
                    {row.currency ?? "VND"}
                  </td>

                  {/* Quantity */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.quantity}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="rounded-md border border-[#DDE4F0] px-4 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                      onClick={() => onRowClick?.(row)}>
                        Edit
                      </button>
                      <button className="rounded-md border border-[#FACDC3] px-4 py-1 text-xs font-medium text-[#EB2F06] hover:bg-[#1279C3]/5">
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
    </div>
  );
}
