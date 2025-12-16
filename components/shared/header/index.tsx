import { APP_NAME } from "@/lib/constants"
import Link from "next/link"
import UserButton from "./user-button"
import Image from "next/image"

const Header = async () => {

  return (
    <header className="text-white">
      <div className="wrapper flex-between">
        <div className="flex-center gap-1">
          <Image src={'/tree (2).png'} width={35} height={35} alt="christmas tree" />
          <Link href="/" className="text-2xl font-medium">{APP_NAME}</Link>
        </div>
        <div className="flex-center gap-5">
          <Link href="/dashboard">Dashboard</Link>
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default Header