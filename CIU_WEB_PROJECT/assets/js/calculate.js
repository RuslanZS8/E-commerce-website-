
// Rendering Cart + Total Cost calculation


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
  
// Display Cart Items
function displayItems() {

	// Get cart from localStorage
	const storedCart = localStorage.getItem('cart3469');
	console.log(storedCart);
	console.log(storedCart.length);
	
	const container = document.getElementById('cart_items');

	if (storedCart.length > 2) {

		// Hide EmptyCart
		const emptyCart = document.getElementById('cart-empty');
		emptyCart.classList.add('hidden');

		// Show Cart
		const cart = document.getElementById('cart');
		cart.classList.remove('hidden');


		const localCart = JSON.parse(storedCart);

		console.log(localCart);

		localCart.forEach((cartItem, index) => {
			const itemDiv = document.createElement('div');
			itemDiv.className = 'cart_item';
			const isCartItemChecked = cartItem.checked ? 'checked' : '';

			// Create Item via innerHTML 
			itemDiv.innerHTML = `
				<label class="item_checkbox">
					<input type="checkbox" class="item_select" ${isCartItemChecked}>
				</label>

				<div class="item_img">
					<img src="assets/img/${cartItem.item.imageName}" alt="">
				</div>

				<div class="item_title item_inner">${cartItem.item.title}
					
					<button class="btn_delete" type="button" title="Delete"> 
						<img src="assets/img/delete.svg" alt="Delete">
					</button>
				</div>

				<div class="item_properties item_inner">
					${['6', '12', '36', 'none'].map((val) => `
						<label>
							<input type="radio" name="radio-${index}" value="${val}">
							
							${val === 'none' ? 'None' : `${val} months`}

						</label>`).join('')}
				</div>

				<div class="item_count item_inner">
					<select name="" class="quantity_select">

						${[1, 2, 3, 4, 5].map(quantity => `
							<option value="${quantity}" ${quantity === cartItem.quantity ? 'selected' : ''}> ${ quantity } items</option>
						`).join('')}

					</select>
				</div>

				<div class="item_cost item_inner">
				<span class="current-price">$${formatPrice(cartItem.item.discountPrice * cartItem.quantity)}</span>
				<span class="price-sale">$${formatPrice(cartItem.item.price * cartItem.quantity)}</span>
				</div>
			`;

			// Привязываем события к элементам
			const itemSelect = itemDiv.querySelector('.item_select');
			const quantitySelect = itemDiv.querySelector('.quantity_select');
			const radioButtons = itemDiv.querySelectorAll(`[name="radio-${index}"]`);
			const currentPriceElement = itemDiv.querySelector('.current-price');

			// Слушатель для изменения количества
			quantitySelect.addEventListener('change', (e) => {
				const newQuantity = parseInt(e.target.value);
				cartItem.quantity = newQuantity;

				// Обновление цены
				updatePrice(cartItem, currentPriceElement);

				// Обновление localStorage
				localCart[index].quantity = newQuantity;
				localStorage.setItem('cart3469', JSON.stringify(localCart));
			});

			// Слушатель для выбора срока оплаты
			radioButtons.forEach((radio) => {
				radio.addEventListener('change', (e) => {
				const period = e.target.value;
				updatePrice(cartItem, currentPriceElement, period);
				});
			});

			// Слушатель для чекбокса выбора item
			itemSelect.addEventListener('change', (e) => {
				localCart[index].checked = e.target.checked;
				console.log(localCart[index].checked);
				localStorage.setItem('cart3469', JSON.stringify(localCart))
			});

		container.appendChild(itemDiv);
		});
	} else {
		console.log("Cart is not found in localStorage");
	}
}

// Update Price
function updatePrice(cartItem, priceElement, paymentPeriod = 'none') {
	
	let price = cartItem.item.discountPrice * cartItem.quantity;

	if (paymentPeriod === '6') price /= 6;
	else if (paymentPeriod === '12') price /= 12;
	else if (paymentPeriod === '36') price /= 36;

	priceElement.textContent = `$${formatPrice(price)}/mo`;
}

function setDefaultItems() {
	let defaultItems = [
		{item: {id: 1, title: 'Hoka Clifton 9 Coastal Sky', imageName: '1.webp', price: 145.90, discountPrice: 95.90}, quantity: 1, checked: false},
		{item: {id: 2, title: 'Apple iPhone 15 512GB Black', imageName: '3.webp', price: 1199, discountPrice: 899}, quantity: 1, checked: false},
		{item: {id: 3, title: 'Yeezy boost 700 V2', imageName: '5.webp', price: 135.55, discountPrice: 92.35}, quantity: 1, checked: false},
		{item: {id: 4, title: 'Tesla Cybertruck', imageName: '10.webp', price: 106000, discountPrice: 105000}, quantity: 1, checked: false},
		{item: {id: 5, title: 'Sony PS5 Pro 2TB PlayStation Game Console', imageName: '8.webp', price: 999.99, discountPrice: 749.90}, quantity: 1, checked: false},
		{item: {id: 6, title: 'Tesla Model Y', imageName: '9.webp', price: 45990, discountPrice: 39990}, quantity: 1, checked: false},
	];
	localStorage.setItem('cart3469', JSON.stringify(defaultItems));
}

try {
	if (JSON.parse(localStorage.getItem('cart3469')) == null) {
		setDefaultItems();
	}
} catch(error) {
	setDefaultItems();
}

// Запускаем отображение товаров
displayItems();
  

