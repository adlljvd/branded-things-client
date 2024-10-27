import axios from 'axios';
import { useState, useEffect } from "react";
import { TrashIcon, PencilSquareIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import Toastify from 'toastify-js';

export default function HomePage({ base_url }) {
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');


    async function fetchProducts() {
        try {
            const { data } = await axios.get(`${base_url}/products`, {
                headers: {
                    Authorization: `Bearer ${localStorage.access_token}`
                }
            });
            console.log('Products fetched:', data);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function handleDelete(product) {
        try {
            await axios.delete(`${base_url}/products/${product.id}`, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            });
            fetchProducts();
            Toastify({
                text: `Successfully deleted product`,
                duration: 3000,
                style: { background: "#FF0000" },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                style: { background: "#FF0000" },
            }).showToast();
        }
    }

    async function handleUpload() {
        try {
            const formData = new FormData();
            formData.append('imgUrl', file);

            const { data } = await axios.patch(`${base_url}/products/${selectedProduct.id}/image`, formData, {
                headers: { Authorization: `Bearer ${localStorage.access_token}` }
            });

            fetchProducts();
            Toastify({
                text: data.message,
                duration: 3000,
                style: { background: "#008000" },
            }).showToast();
        } catch (error) {
            Toastify({
                text: error.response.data.message,
                duration: 3000,
                style: { background: "#FF0000" },
            }).showToast();
        }
    }

    return (
        <div className="px-2 sm:px-4 lg:px-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-6xl font-semibold leading-7 text-gray-900 mt-8 mb-8">Products</h1>
                    <p className="mt-2 text-sm text-gray-700">A list of all the products.</p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        to="/add"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add product
                    </Link>
                </div>
            </div>

            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">#</th>
                                        <th className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                        <th className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6">Image</th>
                                        <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Description</th>
                                        <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Price</th>
                                        <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Stock</th>
                                        <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Author</th>
                                        <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Upload Image</th>
                                        <th className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{product.id}</td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{product.name}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <img src={product.imgUrl} alt={product.name} className="h-16 w-16 object-contain" />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.description}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {product.price.toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.stock}</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.User.email}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div className="flex items-center space-x-2">
                                                    <label className="text-indigo-600 hover:text-indigo-900 cursor-pointer flex items-center space-x-1">
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                setFile(e.target.files[0]);
                                                                setSelectedProduct(product);
                                                            }}
                                                        />
                                                        <span className="cursor-pointer">Choose File</span>
                                                    </label>

                                                    <ArrowUpTrayIcon
                                                        className={`h-5 w-5 ${file && selectedProduct === product ? "cursor-pointer text-indigo-600 hover:text-indigo-900" : "cursor-not-allowed text-gray-400"}`}
                                                        onClick={() => {
                                                            if (file && selectedProduct === product) {
                                                                handleUpload();
                                                            } else {
                                                                Toastify({
                                                                    text: "Please select a file first",
                                                                    duration: 2000,
                                                                    style: { background: "#FF0000" },
                                                                }).showToast();
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <span className="inline-flex space-x-2 items-center">
                                                    <Link to={`/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                    </Link>
                                                    <a onClick={() => handleDelete(product)} className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                                                        <TrashIcon className="h-5 w-5" />
                                                    </a>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
