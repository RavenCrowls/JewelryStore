import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable, { type OrderRow } from "../../../../components/Order/OrderTable/OrderTable";
import { OrderService } from "../../../../services/order.service";

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN");
};

const toState = (status?: string) => {
  const s = (status ?? "").toLowerCase();
  if (s.includes("hoàn") || s.includes("thành")) return "success" as const;
  if (s.includes("chờ") || s.includes("pending")) return "pending" as const;
  return "failed" as const;
};

let orderCache: OrderRow[] = [];

export default function Order() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<OrderRow[]>(orderCache);
  const [error, setError] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await OrderService.fetchOrderSummary(0, 100, { signal: controller.signal });
        const mapped: OrderRow[] = data.map((o) => ({
          order: `OR${o.id.toString().padStart(4, "0")}`,
          customer: o.customerName || "",
          date: formatDate(o.dateCreated),
          total: o.totalPrice,
          currency: "VND",
          state: toState(o.status),
        }));
        orderCache = mapped;
        setRows(mapped);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load orders");
      }
    })();
    return () => controller.abort();
  }, []);

  const handleView = (row: OrderRow) => {
    navigate(`/manager/order/${row.order}`);
  };

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">Order</h2>
        </div>
      </div>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {error ? <div className="text-sm text-red-600">{error}</div> : <OrderTable rows={rows} onView={handleView} />}
      </section>
    </div>
  );
}

