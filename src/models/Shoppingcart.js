export class ShoppingCart {
    constructor(products) {
        this.products = products;
    }

    addProduct = (product) => {
        if (product === undefined) return;
        if (this.products.has(product._id)) { this.products.get(product._id).count += 1; }
        else { this.products.set(product._id, new ShoppingCartProduct(product, 1)); }
    }

    removeProduct = (id) => {
        if (!this.products.has(id)) return;
        const prod = this.products.get(id);
        if (prod.count > 1) prod.count -= 1;
        else this.products.delete(id);
    }

    removeAllProduct = (id) => { this.products.delete(id); }
}

export class ShoppingCartProduct {
    constructor(product, count) {
        this.product = product;
        this.count = count;
    }
}