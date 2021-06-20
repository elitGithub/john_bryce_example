import Router from "./Router";
import Database from './Database';
import Cart from "../Helpers/Cart";
import Event from "../Helpers/Event";

export default class Renderer {
    static homeView() {
        const heroHeader = document.createElement('header');
        heroHeader.className = 'hero';
        const banner = document.createElement('div');
        banner.className = 'banner';
        heroHeader.appendChild(banner);
        const headerTitle = document.createElement('h1');
        headerTitle.className = 'banner-title';
        headerTitle.innerText = 'Furniture Collection';
        banner.appendChild(headerTitle);
        const shopNowBtn = document.createElement('a');
        shopNowBtn.href = '/shop';
        shopNowBtn.className = 'banner-btn';
        shopNowBtn.innerText = 'Shop Now';
        shopNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            Router.rerender('/shop');
        });
        banner.appendChild(shopNowBtn);
        Renderer.setCartValues(Cart.getCart());
        return heroHeader;
    }

    static productsView() {
        const products = Database.getProducts();
        const section = document.createElement('section');
        section.className = 'products';
        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'section-title';
        section.appendChild(sectionTitle);

        const titleText = document.createElement('h2');
        titleText.innerText = 'Out Products';
        sectionTitle.appendChild(titleText);

        const productsCenter = document.createElement('div');
        productsCenter.className = 'products-center';
        section.appendChild(productsCenter);
        if (products && products.length > 0) {
            products.forEach(product => {
                const article = document.createElement('article');
                article.className = 'product';

                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';

                const productImg = document.createElement('img');
                productImg.src = product.image ?? '';
                productImg.alt = 'Very pretty';
                productImg.className = 'product-img';

                const bagBtn = document.createElement('button');
                bagBtn.className = 'bag-btn';
                bagBtn.setAttribute('data-id', product.id);

                const shoppingCartBtn = document.createElement('i');
                shoppingCartBtn.className = 'fas fa-shopping-cart';
                bagBtn.innerText = 'Add to Cart';
                bagBtn.appendChild(shoppingCartBtn);
                imgContainer.appendChild(productImg);
                imgContainer.appendChild(bagBtn);

                const productTitle = document.createElement('h3');
                productTitle.innerText = product.title;

                const productPrice = document.createElement('h4');
                productPrice.innerText = product.price;
                article.appendChild(imgContainer);
                article.appendChild(productTitle);
                article.appendChild(productPrice);
                productsCenter.appendChild(article);
            });
        }
        return section;
    }

    static addLogicToButtons() {
        const buttons = [...document.querySelectorAll(".bag-btn")];
        if (buttons) {
            Renderer.rerenderProductButtons();
        }
    }

    static setCartValues(cart) {
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        let tempTotal = 0;
        let itemsTotal = 0;
        Cart.cartContent().innerHTML = '';
        cart.map(item => {
            Renderer.updateCartContent(item);
            tempTotal += item.price * item.amount;
            itemsTotal += item.amount;
        });
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;
        Renderer.rerenderProductButtons();
    }

    static getSingleButton(id) {
        return Renderer.getButtons().find(button => button.dataset.id === id);
    }

    static getButtons() {
        return [...document.querySelectorAll(".bag-btn")];
    }

    static updateCartContent(item) {
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `<img src="${item.image}" alt="product" />
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                    <span class="remove-item" data-id="${item.id}">remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id="${item.id}"></i>
                    <p class="item-amount">${item.amount}</p>
                    <i class="fas fa-chevron-down" data-id="${item.id}"></i>
                </div>`;
        Cart.cartContent().appendChild(div);
    }

    static rerenderProductButtons() {
        Renderer.getButtons().forEach(button => {
            let id = button.dataset.id;
            let inCart = Cart.getCart().find(item => item.id === id);
            if (inCart) {
                button.innerText = '';
                button.innerText = "In Cart";
                button.disabled = true;
                return;
            } else {
                button.disabled = false;
                button.innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart`;
                button.addEventListener('click', (event) => {
                    let id = event.target.dataset.id;
                    event.target.innerText = "In Cart";
                    event.target.disabled = true;
                    const items = Cart.getCart();
                    // get product from products
                    console.log('i got here', id);
                    if (items.find(item => item.id === id)) {
                        new Cart().increaseByOne(id);
                        return;
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
        });
    }
}
