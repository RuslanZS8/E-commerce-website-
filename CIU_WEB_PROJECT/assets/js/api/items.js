import { makeRequest } from './request.js';
import { Item } from '../entity/entities.js'

const ENDPOINT = '/items';


// 1. Fetch Items

export async function fetchItems() {
    try {

		// Make Request on Server
        const response = await makeRequest(ENDPOINT, 'GET');
		
		// Get Items
        let items = await response.json();

        // items.forEach(item => Item.fromJSON(item));

        return items;

    } catch (error) {
        console.error('Error during fetching items: ', error.message);
    }
}


// 2. Create Item

export async function createItem(jwt, newItem) {

    // Загрузка Image через HTML Input 
    const imageInput = document.querySelector('#imageInput');
    
    // Получаем Image File
    const imageFile = imageInput.files[0];

	// Приводим newItem в JSON формат
	newItem = new Blob([JSON.stringify(newItem)], { type: 'application/json' });

	// Создаем FormData для multipart/form-data запроса
	const formData = new FormData();

	// Add newItem
    formData.append('item', newItem);

	// Add Image File
	formData.append('image', imageFile);

    try {
		
        const headers = {
            'Authorization': 'Bearer ' + jwt
        };

		// Make Request on Server
        const response = await makeRequest(ENDPOINT, 'POST', headers, formData);

        return await response.json();

    } catch (error) {
        console.error('Error during creating item:', error);
    }
}