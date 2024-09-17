import React from 'react';

export function ProductList({ products, addToCart }) {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Unsere Produkte</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{product.price.toFixed(2)} €</span>
                <button 
                  onClick={() => addToCart(product.id)} 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  In den Warenkorb
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}