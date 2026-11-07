import { Link } from "react-router";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  
  const { dispatch } = useCart();

  function handleAdd() {
    dispatch({
      type: "ADD",
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      },
    });
  }

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-40 object-contain mb-3"
        />
        <h3 className="font-semibold text-gray-800 line-clamp-1 hover:text-indigo-600">
          {product.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-500 capitalize">{product.category}</p>

      <div className="mt-auto pt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-indigo-600">${product.price}</span>
       
        <button
          onClick={handleAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;