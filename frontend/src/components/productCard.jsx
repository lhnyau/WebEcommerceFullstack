import Link from "next/link";
import { formatCurrency } from "@/utils/helper"; 

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 mb-2">{product.category.name}</p>
      <p className="text-gray-900 font-bold">{formatCurrency(product.price)}</p>
      <Link href={`/product/${product.id}`} className="text-blue-500 hover:underline mt-4 block">Xem Chi Tiết</Link>
    </div>
  );
};

export default ProductCard;