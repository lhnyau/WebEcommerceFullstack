import { formatCurrency } from "@/utils/helper";

const FavoriteProductItem = ({ image, productName, category, price, isFavorite, addToFavorites, removeFromFavorites, productId }) => {
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={image} alt={productName} className="w-[20em] h-[10em] object-cover"/>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{productName}</h2>
                    <p className="mt-1 text-xs text-gray-700">{category}</p>
                </div>
                <div className="mt-4 flex flex-col justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">{formatCurrency(price)}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        {isFavorite ? (
                            <button 
                                onClick={() => removeFromFavorites(productId)} 
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                            >
                                Xóa khỏi yêu thích
                            </button>
                        ) : (
                            <button 
                                onClick={() => addToFavorites(productId)} 
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                            >
                                Thêm vào yêu thích
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FavoriteProductItem;