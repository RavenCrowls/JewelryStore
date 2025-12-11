import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PriceFilterPopup from "../../../../components/common/PriceFilterPopup/PriceFilterPopup";
import ProductTable, { type ProductRow } from "../../../../components/Product/ProductTable/ProductTable";
import { ProductService } from "../../../../services";

let productCache: ProductRow[] = [];

export default function Product() {
  const navigate = useNavigate();
  const [isDateOpen, setIsDateOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [rows, setRows] = useState<ProductRow[]>(productCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        const data = await ProductService.fetchProductPreview(0, 100, { signal: controller.signal });
        const mapped: ProductRow[] = data.map((p) => ({
          productId: p.id,
          id: `PR${p.id.toString().padStart(4, "0")}`,
          name: p.name,
          subtitle: p.material,
          imageUrl: p.imageUrl || "/img/placeholder.png",
          category: p.categoryName,
          price: p.price,
          quantity: p.quantity,
          currency: "VND",
        }));
        productCache = mapped;
        setRows(mapped);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load products");
      }
    };
    load();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CLICK 1 DÒNG PRODUCT → TRANG DETAIL
  const handleViewProduct = (row: ProductRow) => {
    navigate(`/manager/product/${row.productId}`);
  };

  // CLICK NÚT ADD NEW PRODUCT
  const handleAddNew = () => {
    navigate("/manager/product/add");
  };

  return (
    <div className="space-y-5 mt-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">Product</h2>
          <button
            type="button"
            onClick={() => setIsDateOpen((prev) => !prev)}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 text-xs hover:bg-slate-50 transition"
          >
            ☰
          </button>

          {/* Popup price-range */}
          <PriceFilterPopup
            isOpen={isDateOpen}
            className="top-1 left-20"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition"
          >
            Add new product
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl border border-blue-500 bg-white px-4 py-2 text-xs font-medium text-blue-600 hover:bg-blue-50 transition ml-3">
            Export
          </button>
        </div>
      </div>
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        {error ? (
          <div className="text-red-600 text-sm">{error}</div>
        ) : (
          <ProductTable rows={rows} onRowClick={handleViewProduct} />
        )}
      </section>
    </div>
  );
}
