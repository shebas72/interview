import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
const CartContext = createContext();

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch products from JSON file in the public folder
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/products.json');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const addToCart = (productId, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, stock: product.stock - quantity }
          : product
      )
    );

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const product = products.find((product) => product.id === productId);
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscountedTotal = () => {
    const total = calculateTotal();
    if (total > 200) return total * 0.85;
    if (total > 100) return total * 0.90;
    if (total > 50) return total * 0.95;
    return total;
  };

  const clearCart = () => {
    setCart([]);
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id);
        return cartItem
          ? { ...product, stock: product.stock + cartItem.quantity }
          : product;
      })
    );
  };

  return (
    <CartContext.Provider value={{  products,
        cart,
        addToCart,
        calculateTotal,
        calculateDiscountedTotal,
        clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
