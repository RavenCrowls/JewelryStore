import { useEffect, useState } from "react";
import { ImportService, SupplierService } from "../services";
import type { ImportRow } from "../components/Import/ImportTable/ImportTable";
import { displayOrDash } from "../utils/display";

export function useImports(skip = 0, take = 100) {
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      try {
        const [imports, suppliers] = await Promise.all([
          ImportService.fetchImports(skip, take, { signal: controller.signal }),
          SupplierService.fetchSuppliers(0, 200, { signal: controller.signal }),
        ]);

        const supplierMap = new Map<number, string>();
        suppliers.forEach((s) => supplierMap.set(s.id, s.name));

        const mapped: ImportRow[] = imports.map((imp) => ({
          id: `IM${imp.id.toString().padStart(4, "0")}`,
          supplier: displayOrDash(supplierMap.get(imp.supplierId) ?? ""),
          date: displayOrDash(new Date(imp.dateCreated).toLocaleDateString("vi-VN")),
          total: imp.totalPrice,
          currency: "VND",
          creator: displayOrDash(imp.staffId ? `Staff #${imp.staffId}` : ""),
        }));
        setRows(mapped);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load imports");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [skip, take]);

  return { rows, error, loading };
}
