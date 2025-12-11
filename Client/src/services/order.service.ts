const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

export type OrderDto = {
  id: number;
  userId: number;
  staffId?: number | null;
  totalPrice: number;
  dateCreated: string;
  status: string;
  shippingAddress: string;
  phoneNumber: string;
};

export type OrderSummary = {
  id: number;
  customerName: string;
  totalPrice: number;
  dateCreated: string;
  status: string;
};

async function fetchOrders(skip = 0, take = 100, options?: { signal?: AbortSignal }): Promise<OrderDto[]> {
  let url: string;
  if (API_BASE_URL) {
    const u = new URL("/api/orders", API_BASE_URL);
    u.searchParams.set("skip", String(skip));
    u.searchParams.set("take", String(take));
    url = u.toString();
  } else {
    url = `/api/orders?skip=${skip}&take=${take}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    signal: options?.signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch orders: ${res.status} ${res.statusText}${body ? ` - ${body}` : ""}`);
  }

  return (await res.json()) as OrderDto[];
}

async function fetchOrderSummary(skip = 0, take = 100, options?: { signal?: AbortSignal }): Promise<OrderSummary[]> {
  let url: string;
  if (API_BASE_URL) {
    const u = new URL("/api/orders/summary", API_BASE_URL);
    u.searchParams.set("skip", String(skip));
    u.searchParams.set("take", String(take));
    url = u.toString();
  } else {
    url = `/api/orders/summary?skip=${skip}&take=${take}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    signal: options?.signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch order summary: ${res.status} ${res.statusText}${body ? ` - ${body}` : ""}`);
  }

  return (await res.json()) as OrderSummary[];
}

export const OrderService = {
  fetchOrders,
  fetchOrderSummary,
};
