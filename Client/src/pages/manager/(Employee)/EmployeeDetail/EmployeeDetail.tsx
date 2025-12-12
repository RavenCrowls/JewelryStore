import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useEmployeeDetail } from "../../../../hooks/useEmployeeDetail";
import EmployeeProfile from "../../../../components/Employee/EmployeeProfile/EmployeeProfile";
import EmployeeProfileEdit from "../../../../components/Employee/EmployeeProfileEdit/EmployeeProfileEdit";
import { type Employee } from "../../../../components/Employee/EmployeeProfile/EmployeeProfile";
import { UserService } from "../../../../services/user.service";

// initialEmployee removed, handled in hook

export default function EmployeeDetail() {
  const filterRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();

  const { employee, loading, error } = useEmployeeDetail(id);

  // Reset password handler
  const handleResetPassword = async () => {
    if (!id) throw new Error("No employee ID");
    await UserService.resetPassword(Number(id), "12345678");
  };

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
            Employee Information
          </h2>
        </div>
      </div>

      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="text-center py-10 text-slate-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500">{error}</div>
        ) : (
          <EmployeeProfile employee={employee} onResetPassword={handleResetPassword} />
        )}
      </section>
    </div>
  );
}
