import {
    TagIcon,
    UsersIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Sidebar() {
    const navigate = useNavigate()

    function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            {/* Sidebar */}
            <nav className="w-64 px-6 bg-gray-100 border-r bg-white min-h-screen">
                <div className="flex h-16 shrink-0 items-center justify-center">
                    {/* Logo */}
                    <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                </div>
                <div className="sticky top-1 pt-3">
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                id="nav-product"
                            >
                                <ShoppingBagIcon className="h-6 w-6 mr-2" />
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/categories"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                id="nav-category"
                            >
                                <TagIcon className="h-6 w-6 mr-2" />
                                Categories
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/add-user"
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                id="nav-add-user"
                            >
                                <UserCircleIcon className="h-6 w-6 mr-2" />
                                Add User
                            </Link>
                        </li>
                    </ul>

                    <h6 className="px-3 mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase">
                        Account
                    </h6>
                    <ul className="space-y-2">
                        <li>
                            <a className="flex items-center p-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900">
                                <UsersIcon className="h-6 w-6 mr-2" />
                                Hey, <span id="username">Admin!</span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center p-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                id="nav-logout"
                                onClick={handleLogout}
                            >
                                <ArrowLeftStartOnRectangleIcon className="h-6 w-6 mr-2" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* End Sidebar */}
        </>

    )
}
