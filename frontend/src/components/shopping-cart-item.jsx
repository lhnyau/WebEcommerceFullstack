import { formatCurrency } from "@/utils/helper"; 

const ShoppingCartItem = ({image, productName, category, price, amount, add, decrease, remove, productId}) => {
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src={image} className="w-[20em] h-[10em]"/>
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">{productName}</h2>
                    <p className="mt-1 text-xs text-gray-700">{category}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                        <button onClick={() => decrease(productId)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                        <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={amount} min="1" />
                        <button onClick={() => add(productId)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">{formatCurrency(price)}</p>
                        <button onClick={() => remove(productId, -amount)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartItem;