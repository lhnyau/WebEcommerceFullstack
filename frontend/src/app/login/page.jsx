"use client";
import { callAPI } from '@/utils/api-caller';
import { isLogined, setToken, setUser } from '@/utils/helper';
import { useRouter } from 'next/navigation'
import Link from 'next/link'  
import { useEffect, useState } from 'react';
const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorText, setErrorText] = useState("")
    const router = useRouter()
    const onLoginClick = async() => {
        console.log("email vua nhap: " + email)
        console.log("password vua nhap: " + password)
        try {
            const data = {
                identifier: email,
                password
            }
            const res = await callAPI("/auth/local", "POST", data)
            console.log(res.data)
            setToken(res.data.jwt)
            const userRes = await callAPI("/users/me", "GET")
            setUser(userRes.data)
            console.log(res.data.jwt)
            router.replace("/")
        } catch (error) {
            setErrorText("Sai tài khoản hoặc mật khẩu!")
            console.log(error)
        }
     
            
    }
    useEffect(()=>{
        if (isLogined())
        {
            router.replace("/")
        }
    },[])
    return(
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="/images/logo.png" alt="Logo công ty" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Đăng nhập vào tài khoản của bạn</h2>
            </div>
        
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Địa chỉ email</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e)=>{setEmail(e.target.value); setErrorText("")}} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
        
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Mật khẩu</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"></a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={(e)=>{setPassword(e.target.value); setErrorText("")}} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <span style={{color: "red"}}>{errorText}</span>
                    <div>
                        <button onClick={()=>onLoginClick()} type="button" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng nhập</button>
                    </div>
                </form>
        
                <p className="mt-10 text-center text-sm text-gray-500">
                    Chưa có tài khoản?
                    <Link href="/login/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1">
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default LoginPage;
