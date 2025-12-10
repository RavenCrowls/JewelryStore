import { useNavigate } from "react-router-dom";
import ProductNew, {
  type NewProductForm,
} from "../../../../components/Product/ProductNew/ProductNew";

export default function ProductAddPage() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = (data: NewProductForm) => {
    // TODO: call API create
    console.log("create product", data);
    navigate("/manager/product");
  };

  return (
    <div className="space-y-5 mt-3">
          <h2 className="text-xl font-semibold text-[#1279C3] ">
            Add New Product
          </h2>
      <ProductNew onCancel={handleCancel} onSave={handleSave} />
    </div>
  );
}
