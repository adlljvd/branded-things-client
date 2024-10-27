import { Link, useNavigate } from "react-router-dom";


export default function Card({ product }) {
    const navigate = useNavigate()
    function handleClick(id) {
        navigate(`/detail/${id}`)
    }
    return (
        <li
            key={product.id}
            className="inline-flex w-64 flex-col text-center lg:w-auto"
        >
            <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                    <img
                        alt={product.name}
                        src={product.imgUrl}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <div className="mt-6">
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    <h3 className="mt-1 font-semibold text-gray-900">
                        <Link to={`/detail/${product.id}`}>
                            <span className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p className="mt-1 text-gray-900">{product.price.toLocaleString('en-ID', { style: 'currency', currency: 'IDR' })}</p>
                </div>
            </div>

        </li >
    )
}
