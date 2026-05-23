"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

export default function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);


    return (
        <div className="bg-[url('/chat-bg.jpg')] w-full min-h-screen flex justify-center items-center bg-contain bg-left bg-no-repeat bg-[#f3f3f3]">
            <div className="w-[800px] min-h-[650px] bg-white rounded-[20px] shadow-xl flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 mx-auto">
                    <h2 className="text-2xl font-medium text-center mb-10">Change Password                    </h2>

                    <div className="flex justify-center items-center flex-col w-full mb-6">
                        <Image src="/avatar.jpg" alt="profile" width={80} height={80} className="rounded-full p-1 border border-gray-200 mb-3" />
                        <p className="font-medium text-[15px]">Dushane Daniel
                        </p>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text">Old Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter old password"
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

                        <div>
                            <label className="block text-sm font-medium text-text">New Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
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

                        <div>
                            <label className="block text-sm font-medium text-text">Confirm New Password</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter confirm password"
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
                        <div className="flex justify-between w-full gap-4">
                            <button
                                type="submit"
                                className="w-1/2 bg-primary hover:bg-secondary text-white py-2 rounded-md transition cursor-pointer"
                            >
                                Save
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-gray-bg hover:bg-[#d1d1d4] text-text py-2 rounded-md transition cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
}
