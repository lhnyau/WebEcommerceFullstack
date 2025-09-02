'use client'

import { useState, useEffect } from 'react'
import { getUser, setUser } from '@/utils/helper'
import { callAPI } from '@/utils/api-caller'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const EditProfilePage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    useEffect(() => {
        const loggedInUser = getUser()
        if (loggedInUser) {
            setUsername(loggedInUser.username || '')
            setEmail(loggedInUser.email || '')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const userId = getUser().id;
            const response = await callAPI(`/users/${userId}`, "PUT", { username, email });
            if (response && response.data) {
                setUser(response.data);
                setMessage('Thông tin đã được cập nhật thành công!');
                setTimeout(() => {
                    router.push('/my-profile');
                }, 2000);
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage(`Có lỗi xảy ra: ${error.message}. Vui lòng thử lại!`);
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/images/logo.png" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Chỉnh Sửa Thông Tin Cá Nhân</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Tên người dùng</label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Lưu thay đổi
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

export default EditProfilePage