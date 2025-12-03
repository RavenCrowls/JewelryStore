import { useNavigate, useParams } from "react-router-dom";
import {  useRef } from "react";
import CustomerInfo from "../../../../components/Customer/CustomerInfo/CustomerInfo";
import CustomerPurchaseTable, { type CustomerPurchaseRow } from "../../../../components/Customer/CustomerInfo/CustomerPurchase";
const customer = {
  name: "Customer1",
  address: "123 ABC, HCM",
  phone: "0123456789",
  email: "c1@gmail.com",
  birthday: "21/01/1999",
  loyalty: 15961,
  accumulated: 2500000,
};


const purchaseRows: CustomerPurchaseRow[] = [
  {
    id: "LOT1",
    content: "Import product",
    date: "07/09/2024",
    total: 100000000,
    currency: "VND",
    loyalty: 1000,
  },
  {
    id: "B070924096523",
    content: "Sell product",
    date: "07/09/2024",
    total: 27000000,
    currency: "VND",
    loyalty: 1000,
  },
  {
    id: "B070924096524",
    content: "Sell product",
    date: "07/09/2024",
    total: 32000000,
    currency: "VND",
    loyalty: 1000,
  },
  {
    id: "F0709240001",
    content: "Rent fee",
    date: "07/09/2024",
    total: 15000000,
    currency: "VND",
    loyalty: 1000,
  },
];

export default function CustomerDetail() {
  const navigate = useNavigate();
  const { lot } = useParams<{ lot: string }>();
 
  const filterRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 relative" ref={filterRef}>
                <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
                  Customer Information
                </h2>
            </div>
                
        </div>      
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <CustomerInfo customer={customer} onDelete={() => console.log("deny")} />;

        <CustomerPurchaseTable rows={purchaseRows} /> 
        </section>
    </div>
  );
}
