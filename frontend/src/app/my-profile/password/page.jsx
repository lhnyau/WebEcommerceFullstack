'use client'

import { useState } from "react"
import { callAPI } from '@/utils/api-caller'
import { getToken } from '@/utils/helper'
import Link from 'next/link'

const PasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const [message, setMessage] = useState("")

    const onChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setMessage("Mật khẩu mới không khớp!")
            return
        }

        try {
            const token = getToken()
            const data = {
                currentPassword,
                password: newPassword,
                passwordConfirmation: confirmNewPassword
            }
            const res = await callAPI("/auth/change-password", "POST", data)
            if (res.status == 200) {
                setMessage("Đổi mật khẩu thành công!")
                setCurrentPassword("")
                setNewPassword("")
                setConfirmNewPassword("")
                // Cập nhật token mới nếu cần
            } else {
                setMessage(res.message || "Đổi mật khẩu thất bại. Vui lòng thử lại!")
            }
        } catch (error) {
            setMessage("Đổi mật khẩu thất bại. Vui lòng thử lại!")
            console.log(error)
        }
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/images/logo.png" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đổi Mật Khẩu</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu hiện tại</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="current-password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu mới</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="new-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirm-new-password" className="block text-sm font-medium leading-6 text-gray-900">Xác nhận mật khẩu mới</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                id="confirm-new-password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {message && (
                        <div className={`text-sm text-center ${message.includes('thành công') ? 'text-green-600' : 'text-red-600'}`}>
                            {message}
                        </div>
                    )}

                    <div>
                        <button
                            type="button"
                            onClick={onChangePassword}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Đổi mật khẩu
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    <Link href="/my-profile" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Quay lại hồ sơ
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default PasswordPage