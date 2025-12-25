import type { Metadata } from "next";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";
import { Geist, Roboto } from 'next/font/google'
import Image from "next/image";

// const geist = Roboto({
//     subsets: ['latin'],
// })

export const metadata: Metadata = {
    title: {
        template: `%s | ${APP_NAME}`,
        default: APP_NAME
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" >
            {/* className={geist.className} */}
            <body>
                {children}
                <Image
                    src='/bg-default.jpg' alt="main background image"
                    className="w-full absolute h-full top-0 left-0 -z-10 object-cover"
                    height={1920} width={1080} loading="eager"
                />
            </body>
        </html>
    );
}
