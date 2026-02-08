import { Cart } from './cart.js';
import { displayItems } from './renderingShopping.js';

main();

async function main() {

    let cart = new Cart();

    let currentPath = window.location.pathname;
    let currentFileName = currentPath.split('/').pop();
    console.log('File name: ', currentFileName);

    if (currentFileName == 'index.html' || '/') {
        displayItems(cart);
    }
}