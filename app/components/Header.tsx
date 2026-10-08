import { useRouteLoaderData } from "react-router";
import { AuthBtn } from "./AuthBtn";
import { NavItem } from "./Nav/NavItem";
import type { loader as rootLoader } from "~/root";

export const Header = () => {
    const rootData = useRouteLoaderData<typeof rootLoader>("root");
    const isLoggedIn = rootData?.isLoggedIn ?? false;

    return <header className="px-5 py-4 flex justify-between border-b border-slate-800">
        <div>
            <h3 className="font-['Changa One'] text-3xl font-bold">BlackMarqet</h3>
        </div>
        <nav className="flex items-center gap-4">
            <ul className="flex">
                <NavItem to="/" text="HOME" />
                <NavItem to="/products" text="PRODUCTS" />
            </ul>
            <AuthBtn isLoggedIn={isLoggedIn} />
        </nav>
    </header>;
}