const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

export type SupplierDto = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

async function fetchSuppliers(skip = 0, take = 100, options?: { signal?: AbortSignal }): Promise<SupplierDto[]> {
  let url: string;
  if (API_BASE_URL) {
    const u = new URL("/api/suppliers", API_BASE_URL);
    u.searchParams.set("skip", String(skip));
    u.searchParams.set("take", String(take));
    url = u.toString();
  } else {
    url = `/api/suppliers?skip=${skip}&take=${take}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    signal: options?.signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch suppliers: ${res.status} ${res.statusText}${body ? ` - ${body}` : ""}`);
  }

  return (await res.json()) as SupplierDto[];
}

export const SupplierService = {
  fetchSuppliers,
};
