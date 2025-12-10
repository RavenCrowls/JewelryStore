import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PriceFilterPopup from "../../../../components/common/PriceFilterPopup/PriceFilterPopup";
import ProductTable from "../../../../components/Product/ProductTable/ProductTable";
import { type ProductRow } from "../../../../components/Product/ProductTable/ProductTable";

export const ProductRows: ProductRow[] = [
  {
    id: "PRO001",
    name: "Product 1",
    subtitle: "Gold, Amethyst",
    imageUrl: "/public/img/image1.png",
    category: "Necklace",
    price: 10000000,
    quantity: 2,
    currency: "VND",
  },
  {
    id: "PRO002",
    name: "Product 2",
    subtitle: "Silver, Emerald",
    imageUrl: "/public/img/image1.png",
    category: "Necklace",
    price: 8500000,
    quantity: 5,
    currency: "VND",
  },
  {
    id: "PRO003",
    name: "Product 3",
    subtitle: "Rose Gold, Diamond",
    imageUrl: "/public/img/image1.png",
    category: "Ring",
    price: 15000000,
    quantity: 1,
    currency: "VND",
  },
  {
    id: "PRO004",
    name: "Product 4",
    subtitle: "Gold, Ruby",
    imageUrl: "/public/img/image1.png",
    category: "Bracelet",
    price: 12000000,
    quantity: 3,
    currency: "VND",
  },
];

export default function Product() {
  const navigate = useNavigate();

  const [isDateOpen, setIsDateOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target as Node)
      ) {
        setIsDateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CLICK 1 DÒNG PRODUCT → TRANG DETAIL
  const handleViewProduct = (row: ProductRow) => {
    navigate(`/manager/product/${row.id}`);
  };

  // CLICK NÚT ADD NEW PRODUCT
  const handleAddNew = () => {
    navigate("/manager/product/add");
  };

  return (
    <div className="space-y-5 mt-3">
      {/* Hàng tiêu đề + nút */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold tracking-tight text-[#1279C3]">
            Product
          </h2>

          {/* nút 3 gạch */}
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
        <ProductTable
          rows={ProductRows}
          onRowClick={handleViewProduct} // ⬅ thêm prop này
        />
      </section>
    </div>
  );
}
