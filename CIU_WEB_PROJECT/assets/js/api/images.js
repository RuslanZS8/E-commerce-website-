import { makeRequest } from "./request.js";

const ENDPOINT = '/images';


// Load Image

export async function loadImage(imageName) {
    try {
		// Create URL
        const url = ENDPOINT + "/" + imageName;

		// Make Request on Server by URL
        const response = await makeRequest(url);

		// Get Response
        const blob = await response.blob();

		// Create Image
        const result = URL.createObjectURL(blob);

        return result;

    } catch (error) {
        console.error('Error during loading image:', error);
    }
}