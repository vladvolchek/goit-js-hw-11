import axios from "axios";
import Notiflix from "notiflix";


export async function getPhoto(input, page) {
    const BASE_URL = 'https://pixabay.com/api/?';
    const API_KEY = '41182605-b5a57d702bdc50fdff12e1c79'

    
    const queryParams = new URLSearchParams ({
        key: `${API_KEY}`,
        q: String(input),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: '40'
    });
    
    const response = await axios.get(`${BASE_URL}${queryParams}`)
    return response.data
}