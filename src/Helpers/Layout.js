import logo from '../../public/images/logo.svg';
import Cart from "./Cart";
import Renderer from "../Core/Renderer";
import Database from "../Core/Database";

export default class Layout {

    constructor() {
        this.addCartOverlay();
    }

    navbar() {
        // TODO: this can be split into multiple simple functions.
        // Also: Yeah, frameworks make this easy...

        const navIconSpan = document.createElement('span');
        navIconSpan.className = 'nav-icon';

        const homeIcon = document.createElement('i');
        homeIcon.className = 'fas fa-home';
        homeIcon.addEventListener('click', () => {
            window.location.reload();
        });
        navIconSpan.appendChild(homeIcon);

        const img = document.createElement('img');
        img.src = logo;
        img.alt = 'store logo';

        const cartBtn = document.createElement('div');
        cartBtn.className = 'cart-btn';

        const cartItems = document.createElement('div');
        cartItems.className = 'cart-items';
        cartItems.innerText = '0'; // Default value

        const addToCart = document.createElement('span');
        addToCart.className = 'nav-icon';

        const myCartBtn = document.createElement('i');
        myCartBtn.className = 'fas fa-cart-plus';

        myCartBtn.addEventListener('click', Cart.showCart);

        const nav = document.createElement('nav');
        nav.className = 'navbar';

        const navbarCenter = document.createElement('div');
        navbarCenter.className = 'navbar-center';
        nav.appendChild(navbarCenter);
        navbarCenter.appendChild(navIconSpan);
        navbarCenter.appendChild(img);
        navbarCenter.appendChild(cartBtn);
        navIconSpan.appendChild(homeIcon);
        cartBtn.appendChild(addToCart);
        addToCart.appendChild(myCartBtn);
        cartBtn.appendChild(cartItems);

        return nav;
    }

    addCartOverlay() {
        const cart = new Cart();
        const cartOverlay = document.createElement('div');
        cartOverlay.className = 'cart-overlay';

        const cartDiv = document.createElement('div');
        cartDiv.className = 'cart';
        cartOverlay.appendChild(cartDiv);

        const closeCartSpan = document.createElement('span');
        closeCartSpan.className = 'close-cart';
        closeCartSpan.addEventListener('click', Cart.hideCart);

        const closeIcon = document.createElement('i');
        closeIcon.className = 'fas fa-window-close';
        closeCartSpan.appendChild(closeIcon);
        cartDiv.appendChild(closeCartSpan);

        const cartTitle = document.createElement('h2');
        cartTitle.innerText = 'your cart';
        cartDiv.appendChild(cartTitle);

        const cartContentDiv = document.createElement('div');
        cartContentDiv.className = 'cart-content';
        cartDiv.appendChild(cartContentDiv);

        const cartFooterDiv = document.createElement('div');
        cartFooterDiv.className = 'cart-footer';
        cartDiv.appendChild(cartFooterDiv);

        const footerContentH3 = document.createElement('h3');
        footerContentH3.innerHTML = 'your total : $ <span class="cart-total">0</span>';
        cartFooterDiv.appendChild(footerContentH3);

        const clearCartBtn = document.createElement('button');
        clearCartBtn.className = 'clear-cart banner-btn';
        clearCartBtn.innerText = 'clear cart';
        clearCartBtn.addEventListener('click', () => {
            cart.clearCart();
            Cart.hideCart()
        });
        cartFooterDiv.appendChild(clearCartBtn);

        document.body.appendChild(cartOverlay);

        Layout.addCartFunctionality();
    }

    static addCartFunctionality() {
        const cartContent = document.querySelector('.cart-content');
        const items = Cart.getCart();
        const cart = new Cart();
        cartContent.addEventListener('click', event => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target;
                let id = removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                cart.removeItem(id);
            } else if (event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target;
                let id = addAmount.dataset.id;

                items.forEach(item => {
                    if (item.id === id) {
                        item.amount++;
                    }
                });

                Cart.saveCart(items);
                Renderer.setCartValues(items);
                return;
            } else if (event.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = event.target;
                let id = lowerAmount.dataset.id;
                items.forEach(item => {
                    if (item.id === id) {
                        item.amount--;
                        if (item.amount < 1) {
                            cart.removeItem(id);
                        }
                    }
                });
                Cart.saveCart(items);
                Renderer.setCartValues(items);
                return;
            }
        });
    }
}