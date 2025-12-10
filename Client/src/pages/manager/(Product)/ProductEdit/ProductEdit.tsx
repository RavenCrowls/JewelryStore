import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProduct, {
  type ProductForm,
} from "../../../../components/Product/EditProduct/EditProduct";
import { ProductService } from "../../../../services";
import type { ProductRow } from "../../../../components/Product/ProductTable/ProductTable";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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


  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = (data: ProductForm) => {
    // TODO: call API update
    console.log("update product", id, data);
    navigate(`/manager/product/${id}`);
  };

  return (
    <div className="space-y-5 mt-3">
      <h2 className="text-xl font-semibold text-[#1279C3] ">
            Product Information
      </h2>
      {error && <div className="text-sm text-red-600">{error}</div>}
      {product && <EditProduct product={product} onCancel={handleCancel} onSave={handleSave} />}
    </div>
  );
}
