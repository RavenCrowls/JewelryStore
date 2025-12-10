import { useState } from "react";

type PriceFilterPopupProps = {
  isOpen: boolean;
  // cho phép truyền thêm class để chỉnh vị trí (top/left/right/bottom...)
  className?: string;
};

const MIN_PRICE = 0;
const MAX_PRICE = 10_000_000;

const formatPrice = (value: number) =>
  value.toLocaleString("en-US", { maximumFractionDigits: 0 });

export default function PriceFilterPopup({
  isOpen,
  className,
}: PriceFilterPopupProps) {
  const [category, setCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(4_800_000);
  const [maxPrice, setMaxPrice] = useState<number>(6_000_000);

  if (!isOpen) return null;

  // tính vị trí bubble theo %
  const minPosition =
    ((minPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100 || 0;
  const maxPosition =
    ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100 || 0;

  return (
    <div
      className={
        "absolute z-20 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-xs shadow-lg " +
        (className ?? "")
      }
    >
      <div className="flex w-72 flex-col gap-3 text-slate-700">
        {/* Category */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-32 rounded-full border border-slate-300 px-3 py-1 text-xs outline-none focus:border-blue-500"
          >
            <option value="all">All</option>
            <option value="bag">Bag</option>
            <option value="racket">Racket</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>

        {/* Min price */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-slate-500">Min price</span>

          <div className="relative mt-2">
            {/* bubble */}
            <div
              className="pointer-events-none absolute -top-6 flex -translate-x-1/2 items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{ left: `${minPosition}%` }}
            >
              {formatPrice(minPrice)}
            </div>

            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100_000}
              value={minPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMinPrice(Math.min(value, maxPrice)); // không vượt quá max
              }}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="mt-1 flex justify-between text-[11px] text-slate-500">
            <span>{formatPrice(MIN_PRICE)}</span>
            <span>{formatPrice(MAX_PRICE)}</span>
          </div>
        </div>

        {/* Max price */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-slate-500">Max price</span>

          <div className="relative mt-2">
            {/* bubble */}
            <div
              className="pointer-events-none absolute -top-6 flex -translate-x-1/2 items-center justify-center rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold text-white"
              style={{ left: `${maxPosition}%` }}
            >
              {formatPrice(maxPrice)}
            </div>

            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={100_000}
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value);
                setMaxPrice(Math.max(value, minPrice)); // không nhỏ hơn min
              }}
              className="w-full accent-blue-500"
            />
          </div>

          <div className="mt-1 flex justify-between text-[11px] text-slate-500">
            <span>{formatPrice(MIN_PRICE)}</span>
            <span>{formatPrice(MAX_PRICE)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
