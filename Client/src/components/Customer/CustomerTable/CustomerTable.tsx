export type CustomerRow = {
  name: string;
  address: string; 
  phone: string;
  email: string;
  birthday: string;
};

type CustomerTableProps = {
  rows: CustomerRow[];
  onView?: (row:CustomerRow) => void;
};

export default function CustomerTable({ rows,onView }: CustomerTableProps) {
  return (
    <div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="bg-[#1279C3] text-white">
              <th className="px-4 py-3 rounded-l-xl font-medium text-left">
                Name
              </th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Birthday</th>
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
                <tr key={row.name} className={`${bg} text-center`}>
                  {/* Name */}
                  <td className="px-4 py-3 text-xs font-semibold text-slate-700 text-left">
                    {row.name}
                  </td>

                  {/* Address */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.address}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.phone}
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.email}
                  </td>

                  {/* Birthday */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.birthday}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="rounded-md border border-[#DDE4F0] px-4 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                        onClick={() => onView?.(row)}>
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
