import Image from "next/image";

export default function PageLoader() {
    return (
        <div className="bg-gray-bg h-screen w-full flex justify-center items-center">
            <Image src="/logo.png" alt="logo" width={100} height={100} className="animate-zoom" />
        </div>
    )
}
