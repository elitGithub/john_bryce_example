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
        Cart.saveCart([]);
        this.items = [];
        Renderer.setCartValues(Cart.getCart())
    }

    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        Cart.saveCart(this.items);
        Renderer.setCartValues(Cart.getCart());
        let button = Renderer.getSingleButton(id);
        if (button) {
            button.disabled = false;
            button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
            button.addEventListener('click', (event, id) => {
                event.target.innerText = "In Cart";
                event.target.disabled = true;
                const items = Cart.getCart();
                console.log(items);
                // get product from products
                if (items.find(item => item.id === id)) {
                    new Cart().increaseByOne(id);
                } else {
                    let cartItem = Database.getProduct(id);
                    cartItem.amount = 1;
                    // add item product to the cart
                    items.push(cartItem);
                    // save cart in local storage
                    Cart.saveCart(items);
                }

                // set cart values
                Renderer.setCartValues(Cart.getCart());
                //show the cart
                Cart.showCart();
            });
        }
    }

    increaseByOne(id) {
        const items = Cart.getCart();
        items.map(item => {
            if (item.id === id) {
                item.amount++;
            }
        });
        Cart.saveCart(items)
    }

    decreaseByOne(id) {
        const items = Cart.getCart();
        items.forEach(item => {
            if (item.id === id) {
                item.amount--;
            }
        });

        let cartItems = items.filter(item => item.amount > 0);
        Cart.saveCart(cartItems);
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