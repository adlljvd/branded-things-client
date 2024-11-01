import axios from 'axios'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import gearLoad from "../assets/loading.svg"

export default function Detail({ base_url }) {
    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({ name: '', description: '', price: 0, imgUrl: '', categoryId: 0 });
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    // Fetch categories
    async function fetchCategories() {
        try {
            const { data } = await axios.get(`${base_url}/pub/categories`);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchProduct() {
        try {
            setLoading(true);
            const { data } = await axios.get(`${base_url}/pub/products/${id}`);
            setProduct(data.product);
        } catch (error) {
            console.log("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, []);

    return (
        <div className="bg-white">
            {loading ? (
                <div className="mt-32 flex justify-center items-center">
                    <img src={gearLoad} alt="Loading..." />
                </div>
            ) : (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                    {/* Product details */}
                    <div className="lg:max-w-lg lg:self-end">
                        <nav aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-2">
                                <li>
                                    <div className="flex items-center text-sm">
                                        <Link to="/" className="font-medium text-gray-500 hover:text-gray-900"> {/* Link to Products */}
                                            All Products
                                        </Link>
                                        <svg
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            aria-hidden="true"
                                            className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                                        >
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center text-sm">
                                        {categories.map(el => (
                                            el.id === product.categoryId ? (
                                                <span className="font-medium text-gray-900" key={el.id}>
                                                    {el.name}
                                                </span>
                                            ) : null
                                        ))}
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <div className="mt-4">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                        </div>

                        <section aria-labelledby="information-heading" className="mt-4">
                            <h2 id="information-heading" className="sr-only">
                                Product information
                            </h2>

                            <div className="flex items-center">
                                {product.price !== undefined ? (
                                    <p className="text-lg text-gray-900 sm:text-xl">
                                        {product.price.toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}
                                    </p>
                                ) : (
                                    <p className="text-lg text-gray-900 sm:text-xl">Price not available</p>
                                )}
                            </div>

                            <div className="mt-4 space-y-6">
                                <p className="text-base text-gray-500">{product.description}</p>
                            </div>

                            <div className="mt-6 flex items-center">
                                <CheckIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-green-500" />
                                <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                            </div>
                        </section>
                    </div>

                    {/* Product image */}
                    <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
                        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                            <img alt={product.name} src={product.imgUrl} className="h-full w-full object-cover object-center" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

