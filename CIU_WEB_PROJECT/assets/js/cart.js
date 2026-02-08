import { displayItems } from './items.js';

function addItemToCart(event) {
	event.preventDefault() // Fix preventing click

    const button = event.target;
    const itemId = button.closest('#itemId').dataset.itemId;

    let cart;

    try {
        cart = JSON.parse(localStorage.getItem('cart'));
        if (cart == null) {
            cart = [];
        }
    } catch (error) {
        console.error('Error during reading cart from localStorage: ', error);
        cart = [];
    }

    const itemIndex = cart.findIndex(item => item.itemId == itemId);
    if (itemIndex != -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({
            'itemId': itemId,
            'quantity': 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

await displayItems();
addEventListeners();

function addEventListeners() {
    const buttons = document.querySelectorAll(".item-order");
    console.log(buttons)
    buttons.forEach(button => {
        button.addEventListener('click', addItemToCart);
    })
}



// document.getElementById('addToCard')