import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function BaseLayout() {
    return (
        <>
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <Sidebar />

                {/* Main content area */}
                <div className="flex-1 p-8 bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </>
    )
}