import { useNavigate, useParams } from "react-router-dom";
import {  useRef } from "react";
import ImportInfo from "../../../../components/Import/ImportInfo/ImportInfo";
import ImportProductTable, { type ImportProductRow } from "../../../../components/Import/ImportInfo/ImportProductTable";
const rows: ImportProductRow[] = [
  {
    no: 1,
    name: "Product 1",
    subtitle: "Gold, Amethyst",
    imageUrl: "/img/image1.png",
    category: "Necklace",
    price: 10000000,
    quantity: 2,
    totalPrice: 20000000,
    currency: "VND",
  },
];


export default function ImportDetail() {
  const navigate = useNavigate();
  const { lot } = useParams<{ lot: string }>();
 
  const filterRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 relative" ref={filterRef}>
                <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
                  Import Detail
                </h2>
            </div>
            <div className="justify-end">
                <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
                  Export
                </button>
            </div>
                
        </div>      
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <ImportInfo
          lot={lot ?? "LIQ001"}
          supplier="Supllier1"
          staff="Employee1"
          dateCreated="02/12/2025"
          dateAccepted="05/12/2025"
          state="Waiting"
        />

      <ImportProductTable rows={rows} />
            </section>
    </div>
  );
}
