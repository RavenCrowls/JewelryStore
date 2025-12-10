const API_BASE_URL: string | undefined = (import.meta as any)?.env?.VITE_API_BASE_URL || undefined;

export type ImportDto = {
  id: number;
  supplierId: number;
  staffId?: number | null;
  dateCreated: string;
  totalPrice: number;
};

async function fetchImports(skip = 0, take = 100, options?: { signal?: AbortSignal }): Promise<ImportDto[]> {
  let url: string;
  if (API_BASE_URL) {
    const u = new URL("/api/imports", API_BASE_URL);
    u.searchParams.set("skip", String(skip));
    u.searchParams.set("take", String(take));
    url = u.toString();
  } else {
    url = `/api/imports?skip=${skip}&take=${take}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
    signal: options?.signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to fetch imports: ${res.status} ${res.statusText}${body ? ` - ${body}` : ""}`);
  }

  return (await res.json()) as ImportDto[];
}

export const ImportService = {
  fetchImports,
};
