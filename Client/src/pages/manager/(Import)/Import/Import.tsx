import { useNavigate } from "react-router-dom";
import ImportTable from "../../../../components/Import/ImportTable/ImportTable";
import { type ImportRow } from "../../../../components/Import/ImportTable/ImportTable";
import ImportFilterBar from "../../../../components/Import/ImportFilterBar/ImportFilterBar";

const ImportRows: ImportRow[] = [
  {
    lot: "LOT1",
    supplier: "TNHH Supplier1",
    date: "07/09/2024",
    total: 100000000,
    currency: "VND",
    state: "pending",
  },
  {
    lot: "LOT1",
    supplier: "TNHH Supplier1",
    date: "07/09/2024",
    total: 100000000,
    currency: "VND",
    state: "success",
  },
  {
    lot: "LOT1",
    supplier: "TNHH Supplier1",
    date: "07/09/2024",
    total: 100000000,
    currency: "VND",
    state: "failed",
  },
];
export default function Import() {
  const navigate = useNavigate();

  const handleView = (row: ImportRow) => {
      // tuỳ route của bạn
      navigate(`/manager/import/${row.lot}`);
    };

  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="space-y-4">
                <ImportFilterBar />
        </div>   
      <section className="bg-white rounded-2xl p-6 shadow-sm">
          <ImportTable rows={ImportRows} onView={handleView}/>
      </section>
    </div>
  );
}
