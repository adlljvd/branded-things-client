import ProductsForm from "../components/ProductsForm"
import Toastify from 'toastify-js'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function AddPage({ base_url }) {
    const navigate = useNavigate()


    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const body = { name, description, price: +price, imgUrl, stock: +stock, categoryId: +categoryId }
            console.log(body)
            const { data } = await axios.post(`${base_url}/products`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })
            console.log(localStorage.getItem('access_token'), "<<<< tokenn dari add page");

            navigate("/")
            Toastify({
                text: `Succedd add new product`,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#008000",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        } catch (error) {
            // console.log(error);

            Toastify({
                text: error.response.data.message,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#FF0000",
                },
                onClick: function () { } // Callback after click
            }).showToast();

        }
    }
    return (
        <>
            <ProductsForm base_url={base_url} handleSubmit={handleSubmit}
                nameProp="Add Product" />
        </>
    )

}