import { useRef, useState } from "react";
import EmployeeProfile from "../../../../components/Employee/EmployeeProfile/EmployeeProfile";
import EmployeeProfileEdit from "../../../../components/Employee/EmployeeProfileEdit/EmployeeProfileEdit";
import { type Employee } from "../../../../components/Employee/EmployeeProfile/EmployeeProfile";

const initialEmployee: Employee = {
  avatarUrl: "/img/avt.png",
  name: "Employee1",
  address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
  phone: "0123456789",
  email: "em1@gmail.com",
  birthday: "1999-01-01", // với input type="date" dùng format YYYY-MM-DD
  position: "Manager",
  account: "em1@123",
};

export default function EmployeeDetail() {
  const filterRef = useRef<HTMLDivElement | null>(null);

  const [employee, setEmployee] = useState<Employee>(initialEmployee);
  const [draft, setDraft] = useState<Employee>(initialEmployee);
  const [isEditing, setIsEditing] = useState(false);

  // bấm nút Edit ở màn view
  const handleEdit = () => {
    setDraft(employee);      // copy dữ liệu hiện tại sang form
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(employee);      // reset về dữ liệu gốc
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: call API update ở đây nếu cần
    setEmployee(draft);      // cập nhật state chính
    setIsEditing(false);
  };

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
            Employee Information
          </h2>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
          Add new employee
        </button>

      </div>

      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {isEditing ? (
          <EmployeeProfileEdit
            value={draft}
            onChange={setDraft}
            onCancel={handleCancel}
            onSave={handleSave}
          />
        ) : (
          <EmployeeProfile
            employee={employee}
            onEdit={handleEdit}
            // onDelete / onResetPassword xử lý tương tự
          />
        )}
      </section>
    </div>
  );
}
