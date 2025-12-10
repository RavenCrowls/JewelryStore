import { useEffect, useState } from "react";
import { UserService } from "../services/user.service";
import type { EmployeeRow } from "../components/Employee/EmployeeTable/EmployeeTable";

export function useEmployees(skip = 0, take = 100) {
  const [rows, setRows] = useState<EmployeeRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      try {
        const data = await UserService.fetchUserSummary(skip, take, { signal: controller.signal });
        const mapped: EmployeeRow[] = data.map((u) => ({
          name: u.fullName,
          imageUrl: u.imageUrl || "/img/avt.png",
          address: u.address ?? "",
          phone: u.phone,
          email: u.email,
          position: u.role ?? "",
          bill: u.bill ?? 0,
        }));
        setRows(mapped);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load employees");
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [skip, take]);

  return { rows, error, loading };
}
