export type EmployeeRow = {
  name: string;
  imageUrl: string;
  address: string; 
  phone: string;
  email: string;
  position: string;
  account: string;
  bill: number;
};

type EmployeeTableProps = {
  rows: EmployeeRow[];
  onView?: (row:EmployeeRow) => void;
};

export default function EmployeeTable({ rows, onView}: EmployeeTableProps) {
  return (
    <div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-center">
          <thead>
            <tr className="bg-[#1279C3] text-white">
              <th className="px-4 py-3 rounded-l-xl font-medium text-left">
                Name
              </th>
              <th className="px-4 py-3 font-medium">Photo</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Position</th>
              <th className="px-4 py-3 font-medium">Account</th>
              <th className="px-4 py-3 font-medium">
                Bill <span className="text-xs">↕</span>
              </th>
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
                  
                  {/* Photo */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <img
                        src={row.imageUrl}
                        alt={row.name}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </div>
                  </td>


                  {/* Address */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    <div className="font-semibold text-sm">{row.name}</div>
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

                  {/* Position*/}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.position}
                  </td>

                  {/* Account*/}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.account}
                  </td>

                  {/* Bill */}
                  <td className="px-4 py-3 text-xs text-slate-700">
                    {row.bill}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="rounded-md border border-[#DDE4F0] px-4 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                        onClick ={() => onView?.(row)}>
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
