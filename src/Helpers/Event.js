import Database from "../Core/Database";
import Cart from "./Cart";
import Renderer from "../Core/Renderer";

export default class Event {

    constructor() {
        this.events = {};
    }

    static cartButtonsLogic(event, id) {
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        const items = Cart.getCart();
        // get product from products
        let cartItem = Database.getProduct(id);
        cartItem.amount = 1;
        // add item product to the cart
        items.push(cartItem);
        // save cart in local storage
        Cart.saveCart(items);
        // set cart values
        Renderer.setCartValues(Cart.getCart());
        //show the cart
        Cart.showCart();
    }

}