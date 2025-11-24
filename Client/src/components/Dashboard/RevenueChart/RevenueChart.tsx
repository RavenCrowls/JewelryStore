import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

const data = [
  { day: "01", thisWeek: 40, lastWeek: 25 },
  { day: "02", thisWeek: 55, lastWeek: 38 },
  { day: "03", thisWeek: 48, lastWeek: 32 },
  { day: "04", thisWeek: 60, lastWeek: 40 },
  { day: "05", thisWeek: 43, lastWeek: 28 },
  { day: "06", thisWeek: 50, lastWeek: 35 },
  { day: "07", thisWeek: 63, lastWeek: 45 },
];

export default function RevenueChart() {
  return (
    <div className="h-64 w-full px-6">  
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barGap={6}
          barCategoryGap="20%"
          margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
        >
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="thisWeek" fill="#3498db" radius={[6, 6, 0, 0]} />
          <Bar dataKey="lastWeek" fill="#dcdcdc" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

