import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import EmployeeTable, { type EmployeeRow } from "../../../../components/Employee/EmployeeTable/EmployeeTable";
import { useEmployees } from "../../../../hooks/useEmployees";

export default function Employee() {
  const navigate = useNavigate();
  const { rows, error } = useEmployees(0, 100);

  const handleEmployeeInfo = (row: EmployeeRow) => {
    navigate(`/manager/employee/${row.name}`);
  };
  const handleEmployeeNew = () => {
    navigate(`/manager/employee/add`);
  };

  const filterRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">Employee</h2>
        </div>
        <div className="justify-end">
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
            onClick={() => handleEmployeeNew()}
          >
            Add new employee
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
          <EmployeeTable rows={rows} onView={handleEmployeeInfo} />
        )}
      </section>
    </div>
  );
}
