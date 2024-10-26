import { createBrowserRouter } from "react-router-dom";
import Product from "../views/Product";
import Detail from "../views/Detail";

// Define your base URL for the API
const base_url = "https://codewear.adellajava.tech";

// Create the router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Product base_url={base_url} />
    },
    {
        path: "/detail/:id",
        element: <Detail base_url={base_url} />,
    },

]);

export default router;
