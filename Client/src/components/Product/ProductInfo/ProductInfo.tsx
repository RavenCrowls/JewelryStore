import { useState } from "react";
import type { ProductRow } from "../ProductTable/ProductTable";
import { ArrowDown } from "lucide-react";
import InfoRow from "../../common/InfoRow/InfoRow";

type ProductInfoProps = {
  product: ProductRow;
  images?: string[];
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ProductInfo({
  product,
  images,
  onEdit,
  onDelete,
}: ProductInfoProps) {
  // nếu không truyền images thì dùng lại imageUrl 2 lần cho đẹp
  const gallery =
    images && images.length > 0
      ? images
      : [product.imageUrl, product.imageUrl];

  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm">
      
      {/* 3 cột: thumbnail - ảnh lớn - info */}
      <div className="flex items-start gap-10">
        {/* LEFT: thumbnails */}
        <div className="flex flex-col gap-4 pt-2">
          {gallery.map((thumb, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImage(thumb)}
              className={`h-32 w-32 rounded-md overflow-hidden border bg-white transition ${
                selectedImage === thumb
                  ? "border-[#1279C3]"
                  : "border-slate-300 hover:border-slate-400"
              }`}
            >
              <img
                src={thumb}
                alt={`${product.name} thumb ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* CENTER: main image */}
        <div className="flex-1 flex justify-center pt-2">
          <div className="h-[420px] w-[420px] rounded-md overflow-hidden border border-slate-200 flex items-center justify-center bg-white">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* RIGHT: info – căn giữa cột, max-width giống trang edit */}
        <div className="flex-1 flex justify-center pt-2">
          <div className="w-full max-w-[520px] text-sm text-slate-700 space-y-2">
            {/* Tên sản phẩm */}
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {product.name}
            </h3>

            {/* Các dòng thông tin */}
            <InfoRow label="Category">
              <span>{product.category}</span>
            </InfoRow>

            <InfoRow label="Material">
              <span>18K Yellow Gold</span>
              <span className="ml-1 text-slate-500 font-normal">
                – Weight: <span className="font-medium">3.75g</span>
              </span>
            </InfoRow>

            <InfoRow label="Gemstone">
              <span>Moissanite</span>
              <button className="ml-2 text-xs text-blue-500 underline">
                Certificate
              </button>
            </InfoRow>

            <InfoRow label="Size">
              <span>50cm</span>
            </InfoRow>

            <InfoRow label="Carat weight">
              <span>0.05</span>
            </InfoRow>

            <InfoRow label="Color">
              <span>Colorless</span>
            </InfoRow>

            <InfoRow label="Shape">
              <span>Circle</span>
            </InfoRow>

            <InfoRow label="Purity">
              <span>IF</span>
            </InfoRow>

            <InfoRow label="Gemstone size">
              <span>3mm x 3mm</span>
            </InfoRow>

            {/* Description */}
            <InfoRow label="Description">
              <p className="text-xs leading-relaxed">
                Mặt dây chuyền nữ Heart-shape Reverse MDA3103 nổi bật với vẻ
                đẹp lãng mạn độc đáo mà khó có món trang sức nào mang lại
                được…{" "}
                <button className="text-blue-500">Xem thêm</button>
              </p>
            </InfoRow>

            {/* Giá + giảm giá + quantity */}
            <div className="mt-3 space-y-1">
              <div className="text-xl font-semibold text-slate-900">
                {product.price.toLocaleString("vi-VN")} VND
                <span className="ml-2 inline-flex items-center gap-1 rounded-lg bg-red-50 border border-red-200 px-3 py-1 text-[11px] text-red-500">
                  <ArrowDown className="w-4 h-4"/>
                  <span>15%</span>
                </span>
              </div>
              <div className="text-xs line-through text-slate-400">
                31,200,000 VND
              </div>

              <div className="mt-1">
                
              </div>

              <InfoRow label="Quantity">
                <span>{product.quantity}</span>
              </InfoRow>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-center gap-4">
              <button
                type="button"
                onClick={onDelete}
                className="min-w-[120px] rounded-md border border-red-200 bg-red-50 px-6 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={onEdit}
                className="min-w-[120px] rounded-md border border-[#1279C3] bg-[#E6F3FC] px-6 py-2 text-sm font-medium text-[#1279C3] hover:bg-[#d4e8f9]"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

