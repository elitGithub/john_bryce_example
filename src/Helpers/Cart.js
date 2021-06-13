import Database from "../Core/Database";
import Renderer from "../Core/Renderer";

export default class Cart {

    constructor() {
        this.items = Cart.getCart();
    }


    static hideCart() {
        const cartDOM = document.querySelector('.cart');
        const cartOverlay = document.querySelector('.cart-overlay');
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }

    static cartContent() {
        return document.querySelector('.cart-content');
    }

    clearCart() {
        this.items.forEach(item => this.removeItem(item.id));
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        Cart.saveCart(this.items);
        Renderer.setCartValues(this.items);
        let button = Renderer.getSingleButton(id);
        if (button) {
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
            button.addEventListener('click', (event) => Event.cartButtonsLogic(event, id));
        }
    }

    static showCart() {
        const cartDOM = document.querySelector('.cart');
        const cartOverlay = document.querySelector('.cart-overlay');
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }

    static saveCart(items) {
        Database.store('cart', items);
    }

    static getCart() {
        return Database.get('cart');
    }
}