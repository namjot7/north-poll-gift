import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: 'Home'
}
const Home = () => {
    return (
        <div className="flex-center h-[80vh] text-center">
            <Image
                src={'/hero-bg.jpg'} alt="main background image"
                className="w-full h-screen absolute top-0 left-0 -z-10"
                width={1080} height={1920}
            />
            <div>
                <h1 className="text-4xl font-bold w-full">Decrease Stress during Christmas with Name</h1>
                <p className="text-gray-700 mt-3">The only tool you need during this</p>
                <button className="btn-default mt-5">Start Now</button>
            </div>
        </div>
    )
}

export default Home