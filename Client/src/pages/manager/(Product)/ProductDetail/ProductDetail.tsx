import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import ProductInfo from "../../../../components/Product/ProductInfo/ProductInfo";
import { ProductRows } from "../Product/Product";
import { useRef} from "react";

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const filterRef = useRef<HTMLDivElement | null>(null);
  
  const product =
    useMemo(() => ProductRows.find((p) => p.id === id), [id]) ?? ProductRows[0];

  const handleEdit = () => {
    navigate(`/manager/product/${product.id}/edit`);
  };

  const handleDelete = () => {
    // TODO: call API delete nếu có
    console.log("delete product", product.id);
  };

  return (
    
    
    <div className="space-y-5 mt-3">
      <div className="flex items-center gap-3 relative" ref={filterRef}>
          <h2 className="text-xl font-semibold text-[#1279C3] ">
            Product information
          </h2>
      </div>
      <ProductInfo
        product={product}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
