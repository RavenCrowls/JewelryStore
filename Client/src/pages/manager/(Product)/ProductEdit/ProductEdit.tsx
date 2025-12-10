import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditProduct, {
  type ProductForm,
} from "../../../../components/Product/EditProduct/EditProduct";
import { ProductRows } from "../Product/Product";

export default function ProductEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const product =
    useMemo(() => ProductRows.find((p) => p.id === id), [id]) ?? ProductRows[0];

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
      <EditProduct product={product} onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
}
