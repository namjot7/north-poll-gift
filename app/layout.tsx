import type { Metadata } from "next";
import "./globals.css";
import { APP_NAME } from "@/lib/constants";
import { Geist, Roboto } from 'next/font/google'

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
                </body>
        </html>
    );
}
