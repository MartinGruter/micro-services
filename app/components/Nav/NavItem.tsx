import { Link } from "react-router"

interface NavItemProps {
    to: string
    text: string
}

export const NavItem = ({ to, text }: NavItemProps) => {
    return <li>
        <Link to={to} className="px-3 py-2 rounded-md hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors duration-150">
            {text}
        </Link>
    </li>
}