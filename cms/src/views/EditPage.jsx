import ProductsForm from "../components/ProductsForm"
import Toastify from 'toastify-js'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'
import { useState, useEffect } from "react";


export default function EditProduct({ base_url }) {
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const { id } = useParams()

    async function handleSubmit(e, name, description, price, imgUrl, stock, categoryId) {
        e.preventDefault()
        try {
            const body = { name, description, price, imgUrl, stock, categoryId }
            console.log(body, "<<<body edit")
            const { data } = await axios.put(`${base_url}/products/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            navigate("/")
            Toastify({
                text: `Succedd edit product`,
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

    async function fetchProduct() {
        try {
            const { data } = await axios.get(`${base_url}/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            })

            setProduct(data.products)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])


    return (
        <>
            <ProductsForm base_url={base_url} product={product} handleSubmit={handleSubmit}
                nameProp="Edit Product" />
        </>
    )

}