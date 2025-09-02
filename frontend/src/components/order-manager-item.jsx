import { formatCurrency } from "@/utils/helper";
const OrderManagerItem = ({ products, totalPrice,phone, adress, orderDate, onCancel, onComplete }) => {
    // Format the order date (assuming 'orderDate' is a JavaScript Date object)
    const formattedDate = new Date(orderDate).toLocaleDateString();

    return (
        <div className="rounded-lg bg-white p-6 shadow-md mb-6 transition duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Ngày đặt hàng: {formattedDate}</h2>
                <p className="text-sm text-gray-700">Số điện thoại: {phone}</p>
                <p className="text-sm text-gray-700">Địa chỉ: {adress}</p>
                <h2 className="text-xl font-bold text-gray-900">Tổng tiền: {formatCurrency(totalPrice)}</h2>
                <div className="flex space-x-2">
                    
                    <button 
                        className="px-3 py-1 text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white" 
                        onClick={onComplete}>
                        Hoàn thành
                    </button>
                </div>
            </div>
            <div>
                {products.map((product, index) => (
                    <div key={index + product.name} className="flex items-center border-b py-4">
                        <img 
                            src={process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA + product.image[0].url}
                            alt={product.name}
                            className="w-16 h-16 object-cover mr-4 rounded"
                        />
                        <div className="flex-grow">
                            <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-700">{product.category.name}</p>
                        </div>
                        <div className="flex items-center">
                            <input
                                disabled={true}
                                className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                type="number"
                                value={product.amount}
                                min="1"
                            />
                            <p className="ml-4 text-sm">{formatCurrency(product.price)} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManagerItem;