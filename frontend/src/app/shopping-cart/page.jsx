"use client"
import { useAppContext } from "@/components/context"
import ShoppingCartItem from "@/components/shopping-cart-item"
import { callAPI } from "@/utils/api-caller"
import { formatCurrency } from "@/utils/helper" 
import Link from "next/link"
import { useEffect, useState } from "react"

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA

const ShoppingCartPage = () => {
    const { shoppingCart, setShoppingCart } = useAppContext()
    const [totalPrice, setTotalPrice] = useState(0)
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        calcTotalPrice();
    }, [shoppingCart])

    const calcTotalPrice = () => {
        var sum = 0
        for (var i = 0; i < shoppingCart.length; i++) {
            sum += +shoppingCart[i].price * +shoppingCart[i].amount
        }
        setTotalPrice(sum)
    }

    const add = async (productId) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: 1 })
            setShoppingCart(res.data)
            calcTotalPrice()
        } catch (error) {
            console.error(error)
        }
    }

    const decrease = async (productId) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount: -1 })
            setShoppingCart(res.data)
            calcTotalPrice()
        } catch (error) {
            console.error(error)
        }
    }

    const remove = async (productId, amount) => {
        try {
            const res = await callAPI("/add-to-shopping-cart", "POST", { productId, amount })
            setShoppingCart(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    const onCheckout = async() => {
        try {
            const data = { address, phone }
            const res = await callAPI("/check-out", "POST", data)
            setShoppingCart([])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Giỏ hàng</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {shoppingCart.map((val, index) => (
                        <ShoppingCartItem
                            key={index}
                            productId={val.id}
                            add={add}
                            decrease={decrease}
                            remove={remove}
                            image={URL_SERVER + val.image[0].url}
                            productName={val.name}
                            price={val.price * val.amount}
                            category={val.category.name}
                            amount={val.amount}
                        />
                    ))}
                </div>
                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Địa chỉ" required />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Số điện thoại" required />
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Tổng cộng</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">{formatCurrency(totalPrice)}</p>
                            <p className="text-sm text-gray-700">Đã bao gồm VAT</p>
                        </div>
                    </div>
                    <button onClick={onCheckout} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Thanh toán</button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartPage