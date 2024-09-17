import React from 'react';

export function ShoppingCart({ cart, removeFromCart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Ihr Warenkorb</h2>
      {cart.length === 0 ? (
        <p>Ihr Warenkorb ist leer.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xl font-bold">Gesamtsumme: {total.toFixed(2)} €</p>
            <button className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
              Zur Kasse
            </button>
          </div>
        </>
      )}
    </div>
  );
}