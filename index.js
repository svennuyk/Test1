// index.js

// Importiere Styling
import './styles/main.css';

// Importiere Komponenten
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductList } from './components/ProductList';
import { ShoppingCart } from './components/ShoppingCart';

// Importiere Hilfsfunktionen
import { fetchProducts, addToCart, removeFromCart } from './utils/api';

class App {
  constructor() {
    this.products = [];
    this.cart = [];
    this.init();
  }

  async init() {
    this.attachEventListeners();
    await this.loadProducts();
    this.render();
  }

  attachEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      document.getElementById('toggleCart').addEventListener('click', this.toggleCart.bind(this));
    });

    window.addEventListener('hashchange', this.handleRouteChange.bind(this));
  }

  async loadProducts() {
    try {
      this.products = await fetchProducts();
    } catch (error) {
      console.error('Fehler beim Laden der Produkte:', error);
    }
  }

  handleRouteChange() {
    const hash = window.location.hash.slice(1);
    switch (hash) {
      case 'cart':
        this.renderCart();
        break;
      default:
        this.renderProductList();
    }
  }

  toggleCart() {
    const cartElement = document.getElementById('shoppingCart');
    cartElement.classList.toggle('hidden');
  }

  async addToCart(productId) {
    try {
      const result = await addToCart(productId);
      this.cart.push(result);
      this.updateCartDisplay();
    } catch (error) {
      console.error('Fehler beim Hinzufügen zum Warenkorb:', error);
    }
  }

  async removeFromCart(productId) {
    try {
      await removeFromCart(productId);
      this.cart = this.cart.filter(item => item.id !== productId);
      this.updateCartDisplay();
    } catch (error) {
      console.error('Fehler beim Entfernen aus dem Warenkorb:', error);
    }
  }

  updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = this.cart.length;

    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = this.cart.map(item => `
      <li>
        ${item.name} - ${item.price.toFixed(2)} €
        <button onclick="app.removeFromCart(${item.id})">Entfernen</button>
      </li>
    `).join('');
  }

  renderProductList() {
    const appElement = document.getElementById('app');
    appElement.innerHTML = ProductList(this.products, this.addToCart.bind(this));
  }

  renderCart() {
    const appElement = document.getElementById('app');
    appElement.innerHTML = ShoppingCart(this.cart, this.removeFromCart.bind(this));
  }

  render() {
    const appElement = document.getElementById('app');
    if (!appElement) {
      console.error('Element mit ID "app" nicht gefunden');
      return;
    }

    appElement.innerHTML = `
      ${Header()}
      <main id="mainContent"></main>
      ${Footer()}
    `;

    this.handleRouteChange();
    this.updateCartDisplay();
  }
}

// Initialisiere die App
const app = new App();

// Exportiere die App-Instanz für globalen Zugriff
window.app = app;