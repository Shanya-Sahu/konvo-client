"use client";

export default function ResetPassword() {

    return (
        <div className="bg-[url('/chat-bg.jpg')] w-full min-h-screen flex justify-center items-center bg-contain bg-left bg-no-repeat bg-[#f3f3f3]">
            <div className="w-[800px] min-h-[500px] bg-white rounded-[20px] shadow-xl flex justify-center items-center">
                <div className="w-full max-w-md bg-white p-8 mx-auto">
                    <h2 className="text-2xl font-medium text-center mb-2">Reset Password                    </h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Reset Password with Kanvo.
                    </p>

                    <div className="text-[15px] leading-[22px] text-[#204260] bg-[#dcedfc] px-[20px] py-[12px] rounded-[4px] border border-[#b9dbf9] my-4 text-center w-full">
                        Enter your Email and instructions will be sent to you!
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                className="mt-1 w-full px-4 py-2 text-[15px] leading-[22px] placeholder:text-[15px] border border-gray-300 rounded-[4px] focus:ring-1 focus:ring-secondary focus:outline-0"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-secondary text-white py-2 rounded-md transition cursor-pointer"
                        >
                            Reset
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-600 mt-6">
                        Remember It ? {" "}
                        <a href="/sign-in" className="text-primary underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
