import { useEffect, useState } from "react";
import { ProductService, ProductImageService } from "../services";
import type { ProductDetail } from "../services";
import type { ProductRow } from "../components/Product/ProductTable/ProductTable";

export default function useProductDetail(id?: string) {
  const [product, setProduct] = useState<ProductRow | null>(null);
  const [detail, setDetail] = useState<ProductDetail | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const load = async () => {
      if (!id) {
        setError("Missing product ID");
        setLoading(false);
        return;
      }

      const targetId = Number(id);
      if (Number.isNaN(targetId)) {
        setError("Invalid product ID");
        setLoading(false);
        return;
      }

      try {
        const [detailPayload, imagePayload] = await Promise.all([
          ProductService.fetchProductById(targetId, { signal: controller.signal }),
          ProductImageService.fetchProductImages(targetId, { signal: controller.signal }),
        ]);

        console.log(
          "Product detail payload:",
          JSON.stringify({ product: detailPayload, images: imagePayload }, null, 2),
        );

        setDetail(detailPayload);
        setImageUrls(imagePayload.map((img) => img.imageUrl));

        const row: ProductRow = {
          productId: detailPayload.id,
          id: `PR${detailPayload.id.toString().padStart(4, "0")}`,
          name: detailPayload.name,
          subtitle: detailPayload.material,
          imageUrl: imagePayload[0]?.imageUrl ?? "/img/placeholder.png",
          category: detailPayload.categoryName ?? "Unknown",
          price: detailPayload.price,
          quantity: detailPayload.quantity,
          currency: "VND",
        };

        setProduct(row);
        setError(null);
      } catch (err) {
        if ((err as any)?.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [id]);

  return {
    product,
    detail,
    imageUrls,
    error,
    loading,
  };
}
