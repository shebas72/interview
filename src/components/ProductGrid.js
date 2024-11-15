import { useState } from 'react';
import CartModal from './CartModal';
import Image from 'next/image';
import styles from '../styles/ProductGrid.module.css';
import { useCart } from '../context/CartContext';  // Import useCart from CartContext

export default function ProductGrid() {
  // Access products and addToCart function from the context
  const { products, addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    
    <>
    <div className={styles.grid}>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <Image
            src={product.image}
            alt={product.name}
            width={150}
            height={150}
          />
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Stock: {product.stock > 0 ? product.stock : "Out of stock"}</p>

          {product.stock > 0 && (
            <QuantitySelector
              product={product}
              addToCart={addToCart} // Use addToCart from context
            />
          )}
        </div>
      ))}
    </div>

    {/* Add the View Cart button and CartModal component */}
    <button onClick={toggleCartModal} className={styles.viewCartButton}>
      View Cart
    </button>
    <CartModal isOpen={isCartOpen} onClose={toggleCartModal} />
  </>
  );
}

function QuantitySelector({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (e) => {
    const qty = Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1));
    setQuantity(qty);
  };

  const handleAddToCart = () => {
    if (quantity > 0 && quantity <= product.stock) {
      addToCart(product.id, quantity);  // Call addToCart from context with product ID and quantity
      setQuantity(1);  // Reset quantity after adding to cart
      alert(`${product.name} added to cart! Quantity: ${quantity}`);
    }
  };

  return (
    <div>
      <label>
        Quantity:
        <input
          type="number"
          min="1"
          max={product.stock}
          value={quantity}
          onChange={updateQuantity}
          className={styles.quantityInput}
        />
      </label>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
