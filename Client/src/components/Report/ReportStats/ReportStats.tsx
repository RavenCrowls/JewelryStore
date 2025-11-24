export default function ReportStats() {
  return (
    <div>
      {/* Revenue & Cost */}
      <div className="flex flex-wrap justify-between gap-8">
        {/* Revenue */}
        <div>
          <p className="text-sm font-semibold text-slate-600">Revenue</p>
          <p className="mt-1 text-2xl font-bold">79.852.000 VND</p>
          <p className="mt-1 text-xs text-green-600">
            ↑ 2.1% vs last week
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Sales from 1–7 Sep, 2024
          </p>
        </div>

        {/* Cost */}
        <div>
          <p className="text-sm font-semibold text-slate-600">Cost</p>
          <p className="mt-1 text-2xl font-bold">75.852.000 VND</p>
          <p className="mt-1 text-xs text-green-600">
            ↑ 2.1% vs last week
          </p>
          <p className="mt-1 text-[11px] text-slate-400">
            Sales from 1–7 Sep, 2024
          </p>
        </div>
      </div>

      {/* Chart (placeholder) */}
      <div className="mt-6 h-64 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
        Line chart: Revenue vs Cost
        {/* Sau này bạn thay bằng component chart thật (Recharts, Chart.js, ...) */}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-blue-500" />
          Revenue
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
          Cost
        </div>
      </div>
    </div>
  );
}
