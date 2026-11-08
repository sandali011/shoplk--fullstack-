import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal"; 

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`https://dummyjson.com/products/${id}`);
  const { dispatch } = useCart();
  const [showAdded, setShowAdded] = useState(false); 

  if (loading) return <p className="text-center text-gray-500 py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">⚠️ {error}</p>;

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
    setShowAdded(true); 
  }

  return (
    <div>
      <button onClick={() => navigate(-1)} className="mb-6 text-indigo-600 hover:underline cursor-pointer">
        ← Go Back
      </button>

      <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-8">
        <img
          src={product.images?.[0] ?? product.thumbnail}
          alt={product.title}
          className="w-full h-80 object-contain"
        />

        <div className="flex flex-col gap-3">
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-yellow-500">⭐ {product.rating}</p>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-3xl font-bold text-indigo-600">${product.price}</p>
          
          <p className={product.stock > 0 ? "text-green-600" : "text-red-500"}>
            {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
          </p>

          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <Modal isOpen={showAdded} onClose={() => setShowAdded(false)}>
        <div className="text-center">
          <p className="text-5xl mb-3">✅</p>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Successfully Added!</h3>
          <p className="text-sm text-gray-600 mb-6">
            <span className="font-semibold text-gray-800">"{product.title}"</span> Product Added Successfully
          </p>
          <button
            onClick={() => setShowAdded(false)}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ProductDetails;