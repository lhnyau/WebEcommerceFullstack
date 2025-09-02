'use client'

import Link from "next/link"
import { useState, useEffect } from 'react'
import { getUser } from '@/utils/helper'

const MyProfilePage = () => {
    const [user, setUser] = useState({
        username: '',
        email: ''
    })

    useEffect(() => {
        const loggedInUser = getUser()
        if (loggedInUser) {
            setUser({
                username: loggedInUser.username || '',
                email: loggedInUser.email || ''
            })
        }
    }, [])

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/images/logo.png" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Hồ Sơ Của Tôi</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Thông tin cá nhân</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Username</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.username}</dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.email}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="mt-6 flex flex-col space-y-4">
                    <Link 
                        href="/my-profile/edit-profile"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Chỉnh sửa thông tin cá nhân
                    </Link>
                    <Link 
                        href="/my-profile/password"
                        className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-indigo-600 shadow-sm border border-indigo-600 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Đổi mật khẩu
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MyProfilePage