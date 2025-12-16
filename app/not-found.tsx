
const NotFound = () => {
    return (
        <main className="grid h-screen place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-3xl font-semibold text-indigo-400 md:text-2xl">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Page not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700">Go back to home</a>
                </div>
            </div>
        </main>
    )
}

export default NotFound