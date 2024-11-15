import { useCart } from '../context/CartContext';
import styles from '../styles/CartModal.module.css';

export default function CartModal({ isOpen, onClose }) {
  const { cart, calculateTotal, calculateDiscountedTotal, clearCart } = useCart();

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    alert('Order confirmed! Thank you for shopping.');
    clearCart();
    onClose();
  };

  const originalTotal = calculateTotal();
  const discountedTotal = calculateDiscountedTotal();
  const discount = originalTotal - discountedTotal;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - Quantity: {item.quantity} - Original Price: ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Original Total: ${originalTotal.toFixed(2)}</p>
        <p>Discount Applied: ${discount.toFixed(2)}</p>
        <p>Final Total: ${discountedTotal.toFixed(2)}</p>
        <button className={styles.modalButton} onClick={handleConfirmOrder}>Confirm Order</button>
        <button className={styles.modalButton} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
