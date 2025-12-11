import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductInfo from "../../../../components/Product/ProductInfo/ProductInfo";
import useProductDetail from "../../../../hooks/useProductDetail";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const filterRef = useRef<HTMLDivElement | null>(null);
  const { product, detail, imageUrls, error } = useProductDetail(id);

  const handleEdit = () => {
    if (product) navigate(`/manager/product/${product.productId}/edit`);
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
        <section className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <ProductInfo
            product={product}
            detail={detail ?? undefined}
            images={imageUrls}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          {detail?.gemstones && detail.gemstones.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1279C3]">Gemstone details</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#1279C3] text-white text-[12px] uppercase tracking-wide">
                      <th className="px-4 py-3 rounded-l-xl font-medium text-center align-middle">Name</th>
                      <th className="px-4 py-3 font-medium text-center align-middle">Weight (g)</th>
                      <th className="px-4 py-3 font-medium text-center align-middle">Size</th>
                      <th className="px-4 py-3 font-medium text-center align-middle">Color</th>
                      <th className="px-4 py-3 rounded-r-xl font-medium text-center align-middle">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.gemstones.map((gem) => (
                      <tr key={gem.id} className="even:bg-slate-50">
                      <td className="px-4 py-3 text-center align-middle text-slate-700">{gem.name}</td>
                      <td className="px-4 py-3 text-center align-middle text-slate-700">{gem.weight.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center align-middle text-slate-700">{gem.size ?? "-"}</td>
                      <td className="px-4 py-3 text-center align-middle text-slate-700">{gem.color ?? "-"}</td>
                      <td className="px-4 py-3 text-center align-middle">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            className="rounded-md border border-[#DDE4F0] px-3 py-1 text-xs font-medium text-[#1279C3] hover:bg-[#1279C3]/5"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-md border border-[#FACDC3] px-3 py-1 text-xs font-medium text-[#EB2F06] hover:bg-[#FACDC3]/40"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
