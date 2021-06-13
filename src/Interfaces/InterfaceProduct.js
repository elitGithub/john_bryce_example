export class InterfaceProduct {
    constructor(product) {
        this.id = product.id;
        this.title = product.fields.title;
        this.price = product.fields.price;
        this.image = product.fields.image;
        this.amount = product['amount'] || 0;
    }
}
