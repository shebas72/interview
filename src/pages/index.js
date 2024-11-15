import { useState } from 'react';
import fs from 'fs';
import path from 'path';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/header';

import Footer from '../components/footer';


export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(jsonData);

  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  return (
    <div>
      
      <ProductGrid products={products} onAddToCart={handleAddToCart} />
      {/* <h2>Cart Summary</h2> */}
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
   
    </div>
  );
}
