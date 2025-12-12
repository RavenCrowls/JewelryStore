import InfoRow from "../../common/InfoRow/InfoRow"
import { useState } from "react";
import {Image} from "lucide-react"

export type NewProductForm = {
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
  imageUrl: string;
};

type ProductNewProps = {
  onCancel?: () => void;
  onSave?: (data: NewProductForm) => void;
};

export default function ProductNew({ onCancel, onSave }: ProductNewProps) {
  const [form, setForm] = useState<NewProductForm>({
    name: "",
    category: "",
    material: "",
    weight: "",
    gemstone: "",
    size: "",
    caratWeight: "",
    color: "",
    shape: "",
    purity: "",
    gemstoneSize: "",
    certificate: "",
    description: "",
    price: "",
    discount: "",
    imageUrl: "",
  });

  const handleChange =
    (field: keyof NewProductForm) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, imageUrl: url }));
  };

  const handleSaveClick = () => {
    onSave?.(form);
  };

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">

      <div className="flex gap-10 ">
        {/* LEFT big form */}
        <div className="flex-1 space-y-3 text-xs ">
          <InfoRow label="Name">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.name}
              onChange={handleChange("name")}
            />
          </InfoRow>

          <InfoRow label="Category">
            <select
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.category}
              onChange={handleChange("category")}
            >
              <option value="">Choose category</option>
              <option value="Necklace">Necklace</option>
              <option value="Ring">Ring</option>
              <option value="Bracelet">Bracelet</option>
            </select>
          </InfoRow>

          <InfoRow label="Material">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.material}
              onChange={handleChange("material")}
            />
          </InfoRow>

          <InfoRow label="Weight">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.weight}
              onChange={handleChange("weight")}
            />
          </InfoRow>

          <InfoRow label="Gemstone">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.gemstone}
              onChange={handleChange("gemstone")}
            />
          </InfoRow>

          <InfoRow label="Size">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.size}
              onChange={handleChange("size")}
            />
          </InfoRow>

          <InfoRow label="Carat weight">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.caratWeight}
              onChange={handleChange("caratWeight")}
            />
          </InfoRow>

          <InfoRow label="Color">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.color}
              onChange={handleChange("color")}
            />
          </InfoRow>

          <InfoRow label="Shape">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.shape}
              onChange={handleChange("shape")}
            />
          </InfoRow>

          <InfoRow label="Purity">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.purity}
              onChange={handleChange("purity")}
            />
          </InfoRow>

          <InfoRow label="Gemstone size">
            <input
              className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
              value={form.gemstoneSize}
              onChange={handleChange("gemstoneSize")}
            />
          </InfoRow>
        </div>

        {/* RIGHT: extra fields + image + buttons */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3 text-xs">
            <InfoRow label="Certificate">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
                value={form.certificate}
                onChange={handleChange("certificate")}
              />
            </InfoRow>

            <InfoRow label="Description">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
                value={form.description}
                onChange={handleChange("description")}
              />
            </InfoRow>

            <InfoRow label="Price">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
                value={form.price}
                onChange={handleChange("price")}
              />
            </InfoRow>

            <InfoRow label="Discount">
              <input
                className="w-full rounded border border-slate-300 px-3 py-1.5 outline-none focus:border-sky-500"
                value={form.discount}
                onChange={handleChange("discount")}
              />
            </InfoRow>
          </div>

          <div className="mt-6 flex justify-between items-end gap-6">
            {/* Upload ảnh */}
            <label className="h-40 w-40 border rounded-md flex flex-col items-center justify-center text-xs text-slate-500 cursor-pointer">
              {form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt="preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <>
                  <Image className="w-4 h-4" />
                  <span>Upload</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onCancel}
                className="min-w-[120px] rounded border border-red-200 bg-red-50 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveClick}
                className="min-w-[120px] rounded border border-emerald-200 bg-emerald-50 px-6 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-100"
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

