// src/pages/manager/(Employee)/EmployeeAdd.tsx
import { useNavigate } from "react-router-dom";
import EmployeeAdd from "../../../../components/Employee/EmployeeAdd/EmployeeAdd";
import type { Employee } from "../../../../components/Employee/EmployeeProfile/EmployeeProfile";
import { useRef } from "react";

export default function EmployeeAddPage() {
  const navigate = useNavigate();
  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleSave = (employee: Employee) => {
    // TODO: call API create employee ở đây
    console.log("Create employee:", employee);

    // quay lại trang danh sách employee
    navigate("/manager/employee");
  };

  const handleCancel = () => {
    navigate(-1); // quay lại trang trước
  };

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
            Add New Employee
          </h2>
        </div>
      </div>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <EmployeeAdd onSave={handleSave} onCancel={handleCancel} />
      </section>
    </div>
  );
}
