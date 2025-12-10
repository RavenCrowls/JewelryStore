// src/components/Product/EditProduct/EditProduct.tsx
import React, { useState } from "react";
import type { ProductRow } from "../ProductTable/ProductTable";
import { Image } from "lucide-react";

export type ProductForm = {
  name: string;
  category: string;
  material: string;
  weight: string;
  gemstone: string;
  size: string;
  caratWeight: string;
  color: string;
  shape: string;
  purity: string;
  gemstoneSize: string;
  certificate: string;
  description: string;
  price: string;
  discount: string;
  mainImage: string;
  images: string[];
};

type EditProductProps = {
  product: ProductRow;
  onCancel?: () => void;
  onSave?: (data: ProductForm) => void;
};

export default function EditProduct({
  product,
  onCancel,
  onSave,
}: EditProductProps) {
  const [form, setForm] = useState<ProductForm>({
    name: product.name,
    category: product.category,
    material: "18K Yellow Gold",
    weight: "3.75g",
    gemstone: "Moissanite",
    size: "50cm",
    caratWeight: "0.05",
    color: "Colorless",
    shape: "Circle",
    purity: "IF",
    gemstoneSize: "3mm x 3mm",
    certificate: "link",
    description:
      "Mặt dây chuyền nữ Heart-shape Reverse MDA3103 nổi bật với vẻ đẹp lãng mạn độc đáo.",
    price: "31,200,000 VND",
    discount: "15%",
    mainImage: product.imageUrl,
    images: [product.imageUrl, product.imageUrl],
  });

  const inputClass =
    "w-full rounded border border-slate-300 px-3 py-1.5 text-xs outline-none " +
    "focus:border-[#1279C3] focus:ring-1 focus:ring-[#1279C3]/30";

  const smallInputClass =
    "w-24 rounded border border-slate-300 px-3 py-1.5 text-xs outline-none " +
    "focus:border-[#1279C3] focus:ring-1 focus:ring-[#1279C3]/30";

  const handleChange =
    (field: keyof ProductForm) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSaveClick = () => {
    onSave?.(form);
  };

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">

      {/* 3 cột: thumbnail - ảnh lớn - form */}
      <div className="flex items-start gap-10">
        {/* LEFT: thumbnails + Add */}
        <div className="flex flex-col gap-4 pt-2">
          {form.images.map((img, idx) => (
            <div
              key={idx}
              className="relative h-32 w-32 rounded-md overflow-hidden border border-slate-300 bg-white"
            >
              <img
                src={img}
                alt={`${form.name} ${idx}`}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 h-5 w-5 rounded-full bg-white text-xs text-red-500 border border-red-300 flex items-center justify-center"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== idx),
                  }))
                }
              >
                ✕
              </button>
            </div>
          ))}

          <label className="h-32 w-32 rounded-md border border-dashed border-slate-300 flex flex-col items-center justify-center text-xs text-slate-500 cursor-pointer bg-white">
            <Image className="w-6 h-6"/>
            <span>Add</span>
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* CENTER: main image */}
        <div className="flex-1 flex justify-center pt-2">
          <div className="h-[420px] w-[420px] rounded-md overflow-hidden border border-slate-200 flex items-center justify-center bg-white">
            <img
              src={form.mainImage}
              alt={form.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT: form – căn giữa, max-width ~520px */}
        <div className="flex-1 flex justify-center pt-2">
          <div className="w-full max-w-[520px] text-xs">
            <div className="space-y-3">
              <InfoRow label="Product name">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={handleChange("name")}
                />
              </InfoRow>

              <InfoRow label="Material">
                <div className="flex gap-3">
                  <input
                    className={inputClass}
                    value={form.material}
                    onChange={handleChange("material")}
                  />
                  <span className="self-center text-[11px] text-slate-600">
                    Weight
                  </span>
                  <input
                    className={smallInputClass}
                    value={form.weight}
                    onChange={handleChange("weight")}
                  />
                </div>
              </InfoRow>

              <InfoRow label="Gemstone">
                <div className="flex gap-3">
                  <input
                    className={inputClass}
                    value={form.gemstone}
                    onChange={handleChange("gemstone")}
                  />
                  <span className="self-center text-[11px] text-slate-600">
                    Shape
                  </span>
                  <input
                    className={smallInputClass}
                    value={form.shape}
                    onChange={handleChange("shape")}
                  />
                </div>
              </InfoRow>

              <InfoRow label="Category">
                <input
                  className={inputClass}
                  value={form.category}
                  onChange={handleChange("category")}
                />
              </InfoRow>

              <InfoRow label="Size">
                <input
                  className={inputClass}
                  value={form.size}
                  onChange={handleChange("size")}
                />
              </InfoRow>

              <InfoRow label="Carat weight">
                <input
                  className={inputClass}
                  value={form.caratWeight}
                  onChange={handleChange("caratWeight")}
                />
              </InfoRow>

              <InfoRow label="Color">
                <input
                  className={inputClass}
                  value={form.color}
                  onChange={handleChange("color")}
                />
              </InfoRow>

              <InfoRow label="Purity">
                <input
                  className={inputClass}
                  value={form.purity}
                  onChange={handleChange("purity")}
                />
              </InfoRow>

              <InfoRow label="Gemstone size">
                <input
                  className={inputClass}
                  value={form.gemstoneSize}
                  onChange={handleChange("gemstoneSize")}
                />
              </InfoRow>

              <InfoRow label="Certificate">
                <input
                  className={inputClass}
                  value={form.certificate}
                  onChange={handleChange("certificate")}
                />
              </InfoRow>

              <InfoRow label="Description">
                <textarea
                  rows={3}
                  className={
                    "w-full rounded border border-slate-300 px-3 py-1.5 text-xs outline-none " +
                    "focus:border-[#1279C3] focus:ring-1 focus:ring-[#1279C3]/30 resize-none"
                  }
                  value={form.description}
                  onChange={handleChange("description")}
                />
              </InfoRow>

              <InfoRow label="Price">
                <input
                  className={inputClass}
                  value={form.price}
                  onChange={handleChange("price")}
                />
              </InfoRow>

              <InfoRow label="Discount">
                <input
                  className={inputClass}
                  value={form.discount}
                  onChange={handleChange("discount")}
                />
              </InfoRow>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="min-w-[120px] rounded-md border border-red-200 bg-red-50 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="min-w-[120px] rounded-md border border-emerald-200 bg-emerald-50 px-6 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-28 text-left text-xs text-slate-700">{label}:</div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
