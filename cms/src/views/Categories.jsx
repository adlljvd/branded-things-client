import axios from 'axios';
import { useState, useEffect } from "react";


export default function Categories({ base_url }) {
    const [categories, setCategories] = useState([]);

    async function fetchCategories() {
        try {
            // const token = localStorage.getItem('access_token'); // Retrieve the token

            const { data } = await axios.get(`${base_url}/categories`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            console.log('Categories fetched:', data.categories);
            setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div className="px-2 sm:px-4 lg:px-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-6xl font-semibold leading-7 text-gray-900 mt-8 mb-8">Categories</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the categories.
                    </p>
                </div>

            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-4 lg:-mx-6">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-4 lg:px-6">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            #
                                        </th>
                                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">#{category.id}</td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {category.name}
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
