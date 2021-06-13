import items from './products.json';
import {InterfaceProduct} from "../Interfaces/InterfaceProduct";

export default class Database {
    static getProducts() {
        const prodArray = [];
        // Magical Database stuff goes here

        // Note: this is a fake data source. Normally here I'd go to the backend to get my items and handle
        // all the sorting, filtering, etc. there. However this is a client-only demo so I am using the frontend for
        // all operations. This would also probably be an async function.
        items.items.forEach(item => {
            const product = new InterfaceProduct(item);
            prodArray.push(product);
        });
        Database.saveProducts(prodArray);
        return prodArray;
        // Magical Database stuff ends
    }

    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id === id);
    }

    static store(key, items) {
        localStorage.setItem(key, JSON.stringify(items));
    }

    static get(key) {
        return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    }
}