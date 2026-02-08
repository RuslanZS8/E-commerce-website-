
const BASE_URL = 'http://192.168.1.49:8080'; // IP-адрес нашего Backend


export async function makeRequest(endpoint, method = 'GET', headers = {}, body = null) {
    // const token = localStorage.getItem('jwtToken');
	// const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};
	
    const fullHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
        // ...authHeader,
        ...headers,
    };
	
	console.log('Sengind request...');
	
	const fetchOptions = {
		method,
		headers: fullHeaders,
	};
	
	if (body) {
		fetchOptions.body = body instanceof FormData ? body : JSON.stringify(body);
		
		if (body instanceof FormData) delete fetchOptions.headers['Content-Type'];
	}
	
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
		
		if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
		
		return response;
		
	} catch (error) {
		console.error(`Request error ${method} ${endpoint}:`, error.message);
        throw error; // Пробрасываем ошибку для обработки в вызывающей функции
	}
}