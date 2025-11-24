import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip
} from "recharts";

const data = [
  { day: "01", thisWeek: 20, lastWeek: 35 },
  { day: "02", thisWeek: 45, lastWeek: 40 },
  { day: "03", thisWeek: 55, lastWeek: 52 },
  { day: "04", thisWeek: 38, lastWeek: 37 },
  { day: "05", thisWeek: 50, lastWeek: 43 },
  { day: "06", thisWeek: 42, lastWeek: 39 },
  { day: "07", thisWeek: 63, lastWeek: 52 },
];

export default function BillChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow mr-6">
      <h3 className="font-semibold text-lg">Bill</h3>
      <p className="text-3xl font-bold mt-2">120</p>
      <span className="text-red-600 text-sm">↓ 2.1% vs last week</span>

      <div className="h-52 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <Tooltip />
            <Line type="monotone" dataKey="thisWeek" stroke="#3498db" strokeWidth={3} />
            <Line type="monotone" dataKey="lastWeek" stroke="#bdc3c7" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
