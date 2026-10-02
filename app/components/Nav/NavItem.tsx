import { Link } from "react-router"

interface NavItemProps {
    to: string
    text: string
}

export const NavItem = ({ to, text }: NavItemProps) => {
    return <li>
        <Link className="px-3 py-2 rounded-md hover:bg-slate-400 transition-colors duration-150" to={to}>{text}</Link>
    </li>
}