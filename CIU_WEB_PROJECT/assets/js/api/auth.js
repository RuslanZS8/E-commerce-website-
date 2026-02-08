import { makeRequest } from "./request.js";


// Login User

export async function loginUser(usernameOrEmail, password) {

	localStorage.removeItem('jwtToken'); // Remove old Token

	console.log('Start login user');

    try {

		const headers = {
			'Content-Type': 'application/json'
		};
		
		const body = {
            usernameOrEmail: usernameOrEmail,
            password: password,
        };

		// Make Request on Server
		const response = await makeRequest('/login', 'POST', headers, body);

		// Get Token
        const token = await response.text(); // Преобразовать ответ в строку
		localStorage.setItem('jwtToken', token);

		console.log(`Token: ${token}`);
		
    } catch (error) {
        console.error('Error during login:', error.message);
    }
}