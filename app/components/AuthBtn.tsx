import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { Form, Link } from "react-router";

export const AuthBtn = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    return isLoggedIn ? (
        <Form action="/logout" method="post">
            <button type="submit" className="px-4 py-2 flex items-center gap-2 rounded text-white bg-slate-800 hover:bg-slate-700 transition-colors duration-150">
                Logout
                <IoLogOutOutline className="size-6" />
            </button>
        </Form>
    ) : (
        <Link
            to="/login"
            className="px-4 py-2 flex items-center gap-2 rounded text-white bg-slate-800 hover:bg-slate-700 transition-colors duration-150"
        >
            Login
            <IoLogInOutline className="size-6" />
        </Link>
    );
}