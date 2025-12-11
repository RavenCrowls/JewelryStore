import { useState, useCallback } from "react";
import { ProductService, InventoryService, type UpdateProductDto } from "../services";

export type SaveProductInput = {
  name: string;
  material: string;
  description: string;
  price: string;
  quantity: string;
  categoryId?: string;
};

const parseNumber = (value: string): number => {
  const trimmed = value.trim();
  const hasComma = trimmed.includes(",");
  const hasDot = trimmed.includes(".");

  if (hasComma && !hasDot) {
    return Number(trimmed.replace(",", "."));
  }

  const normalized = trimmed.replace(/,/g, "");
  return Number(normalized);
};

export default function useUpdateProduct(productId?: string | number, fallbackCategoryId?: number) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = useCallback(
    async (data: SaveProductInput): Promise<boolean> => {
      const targetId = Number(productId);
      if (Number.isNaN(targetId)) {
        setError("Invalid product ID");
        return false;
      }

      try {
        setSaving(true);
        setError(null);

        const priceNumber = parseNumber(data.price);
        const quantityNumber = parseNumber(data.quantity);

        if (Number.isNaN(priceNumber) || Number.isNaN(quantityNumber)) {
          setError("Please enter valid numeric values for price and quantity.");
          setSaving(false);
          return false;
        }

        const payload: UpdateProductDto = {
          name: data.name,
          material: data.material,
          description: data.description,
          price: priceNumber,
          quantity: quantityNumber,
          categoryId: data.categoryId ? Number(data.categoryId) : fallbackCategoryId,
        };

        await ProductService.updateProduct(targetId, payload);
        await InventoryService.updateInventory(targetId, {
          productId: targetId,
          quantity: quantityNumber,
        });

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save product");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [productId, fallbackCategoryId],
  );

  return { save, saving, error };
}
