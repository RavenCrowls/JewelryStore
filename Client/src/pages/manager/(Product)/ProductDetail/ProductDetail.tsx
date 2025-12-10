import { useNavigate, useParams } from "react-router-dom";
import ProductInfo from "../../../../components/Product/ProductInfo/ProductInfo";
import { useRef} from "react";
import { useEffect, useState } from "react";
import { ProductService } from "../../../../services";
import type { ProductRow } from "../../../../components/Product/ProductTable/ProductTable";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const filterRef = useRef<HTMLDivElement | null>(null);
  const [product, setProduct] = useState<ProductRow | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const data = await ProductService.fetchProductPreview(0, 200, { signal: controller.signal });
        const mapped: ProductRow[] = data.map((p) => ({
          id: `PR${p.id.toString().padStart(4, "0")}`,
          name: p.name,
          subtitle: p.material,
          imageUrl: p.imageUrl || "/img/placeholder.png",
          category: p.categoryName,
          price: p.price,
          quantity: p.quantity,
          currency: "VND",
        }));
        const found = mapped.find((p) => p.id === id);
        setProduct(found ?? mapped[0] ?? null);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load product");
      }
    })();
    return () => controller.abort();
  }, [id]);

  const handleEdit = () => {
    if (product) navigate(`/manager/product/${product.id}/edit`);
  };

  const handleDelete = () => {
    if (product) {
      // TODO: call API delete nếu có
      console.log("delete product", product.id);
    }
  };

  return (
    
    
    <div className="space-y-5 mt-3">
      <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold text-[#1279C3] ">
            Product information
          </h2>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {product && (
        <ProductInfo
          product={product}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
