
export class Item {
    /**
     * @param {int} id
     * @param {string} title
     * @param {string} imageName
     * @param {float} price
     * @param {float} discountPrice
     */
    constructor(id, title, imageName, price, discountPrice) {
        this.id = id;
        this.title = title;
        this.imageName = imageName;
        this.price = price;
        this.discountPrice = discountPrice;
    }
}

// export class CartItem  {
//     /**
//      * @param {Item} item
//      * @param {int} quantity
//      */
//     constructor(cartId, item, quantity) {
//         this.item = item;
//         this.quantity = quantity;
//     }
// }    