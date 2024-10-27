import { createBrowserRouter, redirect } from "react-router-dom";
import Toastify from 'toastify-js'
import LoginPage from "../views/LoginPage"
import BaseLayout from "../views/BaseLayout"
import AddUserPage from "../views/AddUserPage";
import Products from "../views/HomePage";
import Categories from "../views/Categories";
import AddPage from "../views/AddPage";
import EditPage from "../views/EditPage";

// Define your base URL for the API
const base_url = "https://codewear.adellajava.tech";

// Create the router
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage base_url={base_url} />,
        loader: () => {
            if (localStorage.access_token) {
                Toastify({
                    text: "You already logged in",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#EBF5E6",
                        color: "#2D6A4F"
                    }
                }).showToast();
                return redirect('/')
            }

            return null
        }
    },
    {
        element: <BaseLayout />,
        loader: () => {
            if (!localStorage.access_token) {
                Toastify({
                    text: "Please log in first!",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "#FDECEA",
                        color: "#B32626"
                    }
                }).showToast();
                return redirect('/login')
            }

            return null
        },
        children: [
            {
                path: "/",
                element: <Products base_url={base_url} />
            },
            {
                path: "/categories",
                element: <Categories base_url={base_url} />
            },
            {
                path: "/add-user",
                element: <AddUserPage base_url={base_url} />
            },
            {
                path: "/add",
                element: <AddPage base_url={base_url} />
            },
            {
                path: "/edit/:id",
                element: <EditPage base_url={base_url} />
            }
        ]

    },

]);

export default router;
