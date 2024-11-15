import { CartProvider } from '../context/CartContext';
import '../styles/ProductGrid.module.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
