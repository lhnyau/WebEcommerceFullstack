import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "./context";
import { callAPI } from "@/utils/api-caller";
import { formatCurrency } from "@/utils/helper";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ProductComponent = ({ brand, productName, price, imageUrl, id }) => {
  const { setShoppingCart } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);

  const addToCart = async (productId) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount: 1,
      });
      setShoppingCart(res.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <Link href={"/products/" + id}>
          <img
            src={URL_SERVER + imageUrl}
            alt="Product"
            className="h-80 w-72 object-cover rounded-t-xl"
          />
        </Link>

        <div className="px-4 py-3 w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">{brand}</span>
          <p className="text-lg font-bold text-black truncate block capitalize">
            {productName}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              {formatCurrency(price)}
            </p>

            <button
              onClick={(e) => {
                addToCart(id);
                e.stopPropagation();
              }}
              className="ml-2 bg-white-400 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <div
          className="fixed bottom-[1%] right-[1%] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            className="flex-shrink-0 inline w-4 h-4 me-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1Z"></path>
          </svg>
          <p className="font-medium">Sản phẩm đã được thêm vào giỏ hàng!</p>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;