export const Footer = () => {
    return <footer className="border-t border-slate-800 text-slate-400">
        <div className="w-full max-w-6xl mx-auto px-4 py-5 flex gap-16">
            <div className="">
                <p>© 2026 BlackMarqet</p>
                <p className="mt-1 text-sm">All rights reserved</p>
            </div>
            <div className="flex-1">
                <button
                    type="button"
                    // onClick={open}
                    className="cursor-pointer text-sm underline-offset-2 hover:underline"
                >
                    Om cookies
                </button>
            </div>
        </div>
    </footer>
}
