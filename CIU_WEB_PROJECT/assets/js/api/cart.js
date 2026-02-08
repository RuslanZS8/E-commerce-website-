import { makeRequest } from "./request.js";

const ENDPOINT = '/cart';

// Implement this function later
async function addItemToCart(itemId) {
    try {
        // Create URL
        const url = ENDPOINT + '/add';

        // 
        const body = {
            'itemId': itemId,
            'quantity': 1
        };

        // Make Request on Server By URL
        const response = await makeRequest(url, "POST", {}, body);

    } catch (error) {
        console.error('Error during adding item to cart: ', error);
    }
}