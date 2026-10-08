import { data, Link } from "react-router";

export async function loader() {
    return data({}, 404);
}

export default function NotFound() {
    return (
        <main className="px-6 relative flex items-center justify-center overflow-hidden">
            <div className="max-w-sm w-full relative text-center">
                <div className="size-36 mb-10 mx-auto relative">
                    <div className="absolute inset-0 -rotate-6 rounded-full border-[3px] border-[#8a2e2a]/80" />
                    <div className="absolute inset-0 -rotate-6 flex flex-col items-center justify-center">
                        <span className="text-5xl font-semibold text-[#8a2e2a]">
                            404
                        </span>
                        <span className="mt-1 text-[9px] font-medium tracking-[0.2em] text-[#8a2e2a]">
                            NO RECORD FOUND
                        </span>
                    </div>
                </div>

                <h1 className="text-2xl font-medium">
                    This listing went dark.
                </h1>
                <p className="max-w-xs mx-auto mt-4 text-[15px] text-slate-400 leading-relaxed">
                    Maybe it never existed. Maybe someone made sure it wouldn't. Either
                    way, there's nothing here under that name.
                </p>

                <Link
                    to="/"
                    className="mt-10 px-6 py-3 inline-flex items-center rounded-sm border-2 border-slate-600 text-sm text-slate-400 font-medium transition-colors hover:bg-slate-800 hover:text-slate-100"
                >
                    Back to the market
                </Link>
            </div>
        </main >
    );
}