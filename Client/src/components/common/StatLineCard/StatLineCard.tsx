import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  Tooltip
} from "recharts";

type StatLineCardProps = {
  title: string;
  total: number | string;
  diffPercent: number;
  diffLabel?: string;
  isUp?: boolean;
  data: Array<{ [key: string]: any }>;
  currentKey: string;
  lastKey: string;
};

export function CompareLineChart({
  data,
  currentKey,
  lastKey,
}: {
  data: Array<{ [key: string]: any }>;
  currentKey: string;
  lastKey: string;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="day" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey={currentKey}
          stroke="#3498db"
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey={lastKey}
          stroke="#bdc3c7"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

const StatLineCard = ({
  title,
  total,
  diffPercent,
  diffLabel = "vs last week",
  isUp = false,
  data,
  currentKey,
  lastKey
}: StatLineCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow mr-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-2">{total}</p>
      <span
        className={`text-sm ${
          isUp ? "text-green-600" : "text-red-600"
        }`}
      >
        {isUp ? "↑" : "↓"} {diffPercent}% {diffLabel}
      </span>

      <div className="h-52 mt-4">
        <CompareLineChart
          data={data}
          currentKey={currentKey}
          lastKey={lastKey}
        />
      </div>
    </div>
  );
};

export default StatLineCard;