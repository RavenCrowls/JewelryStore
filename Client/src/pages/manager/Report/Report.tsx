import ReportFilterBar from "../../../components/Report/ReportFilterBar/ReportFilterBar";
import ReportStats from "../../../components/Report/ReportStats/ReportStats";
import ReportTable from "../../../components/Report/ReportTable/ReportTable";

export default function Report() {
  return (
    <div className="space-y-6 mt-3">
      {/* Thanh filter: search + date range + Monthly/Annually */}
      <ReportFilterBar />

      {/* Revenue / Cost + chart */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <ReportStats />
      </section>

      {/* Bảng Income and expenses */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <ReportTable />
      </section>
    </div>
  );
}
