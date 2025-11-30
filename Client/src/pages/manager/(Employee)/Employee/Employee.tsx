import { useNavigate } from "react-router-dom";
import {  useRef } from "react";
import EmployeeTable from "../../../../components/Employee/EmployeeTable/EmployeeTable";
import { type EmployeeRow } from "../../../../components/Employee/EmployeeTable/EmployeeTable";
export const EmployeeRows: EmployeeRow[] = [
  {
    name: "Employee1",
    imageUrl: "/public/img/avt.png",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    position: "Manager",
    account: "em1@123",
    bill: 2,
  },
  {
    name: "Employee1",
    imageUrl: "/public/img/avt.png",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    position: "Manager",
    account: "em1@123",
    bill: 2,
  },
  {
    name: "Employee1",
    imageUrl: "/public/img/avt.png",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    position: "Manager",
    account: "em1@123",
    bill: 2,
  },
  {
    name: "Employee1",
    imageUrl: "/public/img/avt.png",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    position: "Manager",
    account: "em1@123",
    bill: 2,
  },
];
export default function Dashboard() {
  const navigate = useNavigate();

 
  const filterRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 relative" ref={filterRef}>
                <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
                  Employee
                </h2>
            </div>
            <div className="justify-end">
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition">
                  Add new product
                </button>
                {/* Export button */}
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
                  Export
                </button>
            </div>
                
        </div>      
      <section className="bg-white rounded-2xl p-6 shadow-sm">
              <EmployeeTable rows={EmployeeRows} />
            </section>
    </div>
  );
}
