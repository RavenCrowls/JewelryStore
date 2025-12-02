import { useNavigate } from "react-router-dom";
import {  useRef } from "react";
import CustomerTable from "../../../../components/Customer/CustomerTable/CustomerTable";
import { type CustomerRow } from "../../../../components/Customer/CustomerTable/CustomerTable";
export const CustomerRows: CustomerRow[] = [
  {
    name: "Customer1",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    birthday: "21/01/1999",
    loyalty: 15961,
  },
  {
    name: "Customer1",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    birthday: "21/01/1999",
    loyalty: 15961,
  },
  {
    name: "Customer1",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    birthday: "21/01/1999",
    loyalty: 15961,
  },
  {
    name: "Customer1",
    address: "235 Tân Lập, Đông Hòa, Dĩ An, Bình Dương",
    phone:"0123456789",
    email: "em1@gmail.com",
    birthday: "21/01/1999",
    loyalty: 15961,
  },
];
export default function Customer() {
  const navigate = useNavigate();

 
  const filterRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 relative" ref={filterRef}>
                <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
                  Customer
                </h2>
            </div>
            <div className="justify-end">
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
                  Export
                </button>
            </div>
                
        </div>      
      <section className="bg-white rounded-2xl p-6 shadow-sm">
              <CustomerTable rows={CustomerRows} />
            </section>
    </div>
  );
}
