import AuthProvider from '@/components/auth-provider';
import Footer from '@/components/footer';
import Header from '@/components/shared/header';
import React from 'react'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <AuthProvider>
      <div className='h-screen flex flex-col relative'>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  )
};