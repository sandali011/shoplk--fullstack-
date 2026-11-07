import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";

function Cart() {
  const { cart, dispatch, totalPrice } = useCart();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleCheckout() {
    setShowConfirm(false);
    setOrderPlaced(true);
  }

  function finishOrder() {
    setOrderPlaced(false);
    dispatch({ type: "CLEAR" });
    navigate("/");
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-2xl text-gray-500 mb-4">Your Cart Is Empty 🛒</p>
        <Link to="/" className="text-indigo-600 hover:underline">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>

      <div className="bg-white rounded-xl shadow divide-y divide-gray-100">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 p-4">
            <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-contain" />

            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-500">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch({ type: "CHANGE_QTY", id: item.id, amount: -1 })}
                aria-label="Decrease quantity"
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer font-bold"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold">{item.qty}</span>
              <button
                onClick={() => dispatch({ type: "CHANGE_QTY", id: item.id, amount: 1 })}
                aria-label="Increase quantity"
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer font-bold"
              >
                +
              </button>
            </div>

            <p className="w-24 text-right font-semibold text-gray-800">
              ${(item.price * item.qty).toFixed(2)}
            </p>

            <button
              onClick={() => dispatch({ type: "REMOVE", id: item.id })}
              aria-label="Remove from cart"
              className="text-red-500 hover:text-red-700 cursor-pointer p-2 font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-2xl font-bold">
          Total: <span className="text-indigo-600">${totalPrice.toFixed(2)}</span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "CLEAR" })}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-700"
          >
            Clear Cart
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold cursor-pointer"
          >
            Checkout
          </button>
        </div>
      </div>

      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Your Order?</h2>
        <p className="text-gray-600 mb-6">
          Total Amount: <span className="font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowConfirm(false)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer"
          >
            Yes, Confirm
          </button>
        </div>
      </Modal>

      <Modal isOpen={orderPlaced} onClose={finishOrder}>
        <div className="text-center">
          <p className="text-5xl mb-3">🎉</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Your order is successful!</h2>
          <p className="text-gray-600 mb-6">Thank you for shopping with ShopLK.</p>
          <button
            onClick={finishOrder}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Cart;