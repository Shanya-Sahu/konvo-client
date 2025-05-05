import Image from "next/image";

export default function Sidebar() {
    return (
        <div className="w-full max-w-[90px] bg-primary h-screen fixed top-0 left-0 flex justify-between items-center flex-col py-[20px]">
            <Image src="/logo.png" alt="logo" width={50} height={50} />

            <div>

            </div>
        </div>
    )
}
