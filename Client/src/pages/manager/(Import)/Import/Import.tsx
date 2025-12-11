import { useNavigate } from "react-router-dom";
import ImportTable from "../../../../components/Import/ImportTable/ImportTable";
import ImportFilterBar from "../../../../components/Import/ImportFilterBar/ImportFilterBar";
import { useImports } from "../../../../hooks/useImports";
export default function Import() {
  const navigate = useNavigate();
  const { rows, error } = useImports(0, 100);

  const handleView = (row: { id: string }) => {
      // tuỳ route của bạn
      navigate(`/manager/import/${row.id}`);
    };

  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
        <div className="space-y-4">
                <ImportFilterBar />
        </div>   
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {error ? <div className="text-sm text-red-600">{error}</div> : <ImportTable rows={rows} onView={handleView} />}
      </section>
    </div>
  );
}
