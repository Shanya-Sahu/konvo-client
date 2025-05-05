"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa6";


export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-[url('/chat-bg.jpg')] w-full min-h-screen flex justify-center items-center bg-contain bg-left bg-no-repeat bg-[#f3f3f3]">
            <div className="w-[800px] min-h-[650px] bg-white rounded-[20px] shadow-xl flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 mx-auto">
                    <h2 className="text-2xl font-medium text-center mb-2">Register Account</h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Get your free Kanvo account now.
                    </p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="mt-1 w-full px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                className="mt-1 w-full px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text">Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full pr-10 px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-gray-500">
                            By registering you agree to the Kanvo{" "}
                            <a href="#" className="text-primary underline">
                                Terms of Use
                            </a>
                        </p>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white py-2 rounded-md transition cursor-pointer"
                        >
                            Register
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-grow h-px bg-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">Sign up using</span>
                        <div className="flex-grow h-px bg-gray-300"></div>
                    </div>

                    <div className="flex justify-between space-x-4">
                        <button className="flex-1 flex items-center justify-center bg-blue-50 text-blue-600 py-2 rounded-md font-medium cursor-pointer">
                            <IoLogoFacebook className="text-md mr-2" />
                            Facebook
                        </button>
                        <button className="flex-1 flex items-center justify-center bg-red-50 text-red-600 py-2 rounded-md font-medium cursor-pointer">
                            <FaGoogle className="text-md mr-2" />
                            Google
                        </button>
                    </div>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Already have an account?{" "}
                        <a href="/sign-in" className="text-primary underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
