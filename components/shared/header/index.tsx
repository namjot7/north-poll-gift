import { APP_NAME } from "@/lib/constants"
import Link from "next/link"
import UserButton from "./user-button"

const Header = async () => {

  return (
    <header className="bg-black/70 backdrop-blur-3xl text-white">
      <div className="wrapper flex-between">
        <Link href="/" className="text-xl font-medium">{APP_NAME}</Link>

        <div className="flex-center gap-5">
          <Link href="/dashboard">Dashboard</Link>
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export default Header