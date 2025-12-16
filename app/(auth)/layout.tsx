import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid grid-cols-2">
            <div className="flex-center h-screen ">
                {children}
            </div>
            <div className="m-14">
                <Image className="h-full w-full object-cover rounded-3xl" src="/bg-login.jpg" width={500} height={500} alt="mom giving a gift to her child" />
            </div>
        </div>
    )
};
