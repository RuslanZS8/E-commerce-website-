let items = [
    {item: {id: 1, title: 'Hoka Clifton 9 Coastal Sky', imageName: '1.webp', price: 145.90, discountPrice: 95.90}, quantity: 1, checked: false},
    {item: {id: 2, title: 'Apple iPhone 15 512GB Black', imageName: '3.webp', price: 1199, discountPrice: 899}, quantity: 1, checked: false},
    {item: {id: 3, title: 'Yeezy boost 700 V2', imageName: '5.webp', price: 135.55, discountPrice: 92.35}, quantity: 1, checked: false},
    {item: {id: 4, title: 'Tesla Cybertruck', imageName: '10.webp', price: 106000, discountPrice: 105000}, quantity: 1, checked: false},
    {item: {id: 5, title: 'Sony PS5 Pro 2TB PlayStation Game Console', imageName: '8.webp', price: 999.99, discountPrice: 749.90}, quantity: 1, checked: false},
    {item: {id: 6, title: 'Tesla Model Y', imageName: '9.webp', price: 45990, discountPrice: 39990}, quantity: 1, checked: false},
];

// Format Item Price (19990.5 ->  19 990.50)
function formatPrice(price) {

    if (Number.isInteger(price)) {

        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    } else {

        let formattedPrice = price.toFixed(2);
        let parts = formattedPrice.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1];

        integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

        return integerPart + '.' + decimalPart;
    }
}


class Cart {

    constructor(cart = null) {
        if (cart == null) {
            this.cart = this.#getCartFromLocalStorage();
        } else {
            this.cart = cart;
        }
        
    }

    showCart() {
        console.log(this.cart);
    }

    saveCart(cart=null) {
        if (cart != null) {
            localStorage.setItem('cart3469', JSON.stringify(cart))
        } else {
            localStorage.setItem('cart3469', JSON.stringify(this.cart))
        }
    }

    getQuantityByItemId(itemId) {
        let cartItem = this.cart.find(cartItem => cartItem.item.id == itemId);
        if (cartItem != null) {
            return cartItem.quantity;
        } else {
            return 0;
        }
    }

    setChecked(item, checked) {
        let cartItemIndex = this.cart.findIndex(cartItem => cartItem.item.id == item.id);
        try {
            this.cart[cartItemIndex].checked = checked;
        } catch (error) {
            console.log('Error during setting checked status: ', error);
        }
    }

    addItemToCart(item) {
        // Getting an index of the item from the cart
        let cartItemIndex = this.cart.findIndex(cartItem => cartItem.item.id == item.id);
        this.cart[cartItemIndex].quantity += 1;
        this.cart[cartItemIndex].checked = true;
    
        // Reasign the cart in the localStorage
        this.saveCart();
    
        return this.cart[cartItemIndex].quantity;
    }
    
    removeItemFromCart(item) {
        // Getting an index of the item from the cart
        const cartItemIndex = this.cart.findIndex(cartItem => cartItem.item.id == item.id);
        if (this.cart[cartItemIndex].quantity - 1 == 0) {
            console.log('ok')
            this.cart[cartItemIndex].checked = false;
            this.saveCart();
            return 0;
        } else {
            this.cart[cartItemIndex].quantity -= 1;
        }

        let newQuantity = this.cart[cartItemIndex].quantity;

        // Reasign the cart in the localStorage
        this.saveCart();

        return newQuantity;
    }

    #getCartFromLocalStorage() {
        let cart;
        // Parsing the cart from the localStorage
        try {
            cart = JSON.parse(localStorage.getItem('cart3469'));
            if (cart == null) {
                // if there's no cart, create a new one
                cart = items;
            }
        } catch (error) {
            console.error('Error during reading cart from localStorage: ', error);
            // Create an empty cart to reasign the existing cart in the localStorage
            cart = items;
        }
        return cart;
    }
}

// Display Items
async function displayItems() {
    const container = document.getElementById('items');

    let cart;

    try {
        cart = new Cart();
    } catch (error) {
        console.log('Error during cart initialization: ', error);
    }

    try {

		cart.showCart();
		
        // Создаем массив промисов для загрузки изображений
        const itemPromises = cart.cart.map(async (itemCart) => {
            
			// Load Images from Server
            const image = './assets/img/' + itemCart.item.imageName; 
            
            // Format Price
            const price = formatPrice(itemCart.item.price); 	
            const discountPrice = formatPrice(itemCart.item.discountPrice);

            const isItemChecked = itemCart.checked;
            const isAddToCartHidden = isItemChecked ? 'hidden' : '';
            const isItemBottonHidden = isItemChecked ? '' : 'hidden';

            // Create Item via innerHTML 
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <a id="itemId" data-item-id="${ itemCart.item.id }" href="#" title="${ itemCart.item.title }">
                    <img src="${ image }" alt="${ itemCart.item.title }" class="item-img">
                    <div class="item-info">
                        <div class="item-price">
                            $${ discountPrice }<span class="price-sale">$${ price }</span>
                        </div>
                        <div class="item-title">${ itemCart.item.title }</div>
                    </div>
                    <button type="button" id="addToCart-${ itemCart.item.id }" class="item-order accent_button ${ isAddToCartHidden }">
                        Add to cart
                    </button>

					<div id="item-botton-${ itemCart.item.id }" class="item-botton ${ isItemBottonHidden }" >
						<div class="item-counter">
							<button id="count-minus-${ itemCart.item.id }" type="button" class="count-minus"></button>
							<div id="quantityInCart_${ itemCart.item.id }" class="count-number">${ cart.getQuantityByItemId(itemCart.item.id) }</div>
							<button id="count-plus-${ itemCart.item.id }" type="button" class="count-plus"></button>
						</div>
						
						<a href="calculate.html" id="" class="go-cart accent_button" title="Go calculate">
							<img src="assets/img/cart.svg" alt="">
						</a>
					</div>
                </a>
            `;

            const addToCart = itemDiv.querySelector('#addToCart-' + itemCart.item.id);
            const itemBotton = itemDiv.querySelector('#item-botton-' + itemCart.item.id);

            addToCart.addEventListener('click', (e) => {
                e.preventDefault();
                cart.setChecked(itemCart.item, true);
                cart.saveCart();
                e.target.className = 'item-order accent_button hidden';
                itemBotton.className = 'item-botton';
            });

            return itemDiv; // Возвращаем элемент
        });

        // Ждем, пока все промисы завершатся
        const itemDivs = await Promise.all(itemPromises);

        // Добавляем все элементы в контейнер
        itemDivs.forEach(itemDiv => container.appendChild(itemDiv));

        // Adding eventListeners for plus and minus buttons
        cart.cart.forEach(item => {
            addPlusButtonEventListener(cart, item);
            addMinusButtonEventListener(cart, item);
        });

    } catch (error) {
        console.error('Error during displaying items:', error);
    }

}

function addPlusButtonEventListener(cart, itemCart) {
    const plus_button = document.getElementById('count-plus-' + itemCart.item.id);
    plus_button.addEventListener('click', (event) => {
        event.preventDefault(); // Fix preventing click
        let newQuantity = cart.addItemToCart(itemCart.item);
        updateItemQuantity(itemCart.item.id, newQuantity);
    });
}

function addMinusButtonEventListener(cart, itemCart) {
    const minus_button = document.getElementById('count-minus-' + itemCart.item.id);
    minus_button.addEventListener('click', (event) => {
        event.preventDefault(); // Fix preventing click
        let newQuantity = cart.removeItemFromCart(itemCart.item);
        if (newQuantity == 0) {
            const addToCart = document.getElementById('addToCart-' + itemCart.item.id);
            const itemBotton = document.getElementById('item-botton-' + itemCart.item.id);
            addToCart.className = 'item-order accent_button';
            itemBotton.className = 'item-botton hidden';
        } else {
            updateItemQuantity(itemCart.item.id, newQuantity);
        }
    });
}

function updateItemQuantity(itemId, quantity) {
    // Getting the cart element that displays the item's quantity
    const cartElement = document.getElementById('quantityInCart_' + itemId);
    // Set a new item's quantity
    cartElement.textContent = quantity;
}

displayItems();