import { useEffect, useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";


export default function ProductsForm({ base_url, product, handleSubmit, nameProp }) {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [imgUrl, setImgUrl] = useState("")
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState("")



    // Fetch categories
    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${base_url}/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log(localStorage.getItem('access_token'), "<<<< tokenn dari form");

            console.log('categories fetched:', data.categories);
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchCategories()
    }, []);

    useEffect(() => {
        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            setImgUrl(product.imgUrl);
            setCategoryId(product.categoryId);
        }
    }, [product]);

    return (
        <div className="space-y-10 divide-y divide-gray-900/10 max-w-screen-md ">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                <div className="px-4 sm:px-0">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">{nameProp} Form</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">This form is to add/edit products</p>
                </div>

                <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2" onSubmit={(e) => handleSubmit(e, name, description, price, imgUrl, stock, categoryId)}>
                    <div className="px-4 py-6 sm:p-8">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Product Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        id="name"
                                        name="name"
                                        placeholder="Enter Product Name"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={name}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Description
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setDescription(e.target.value)}
                                        id="description"
                                        name="description"
                                        placeholder="Enter Description"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={description}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setPrice(e.target.value)}
                                        id="price"
                                        name="price"
                                        placeholder="ex: 299000"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={price}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setStock(e.target.value)}
                                        id="street-address"
                                        name="street-address"
                                        placeholder="ex: 26"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={stock}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Image URL
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) => setImgUrl(e.target.value)}
                                        id="imgUrl"
                                        name="imgUrl"
                                        placeholder="Enter Image URL"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={imgUrl}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-full">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Category
                                </label>
                                <select
                                    onChange={(e) => setCategoryId(e.target.value)}
                                    id="categories"
                                    className="mt-2 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    value={categoryId}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(el => (
                                        <option key={el.id} value={el.id}>{el.name}</option>
                                    ))}
                                </select>
                            </div>


                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                        <Link to="/" type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {nameProp}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
