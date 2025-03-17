import axios from 'axios'
import { City, Hotel } from '../types/index'



const API_KEY = '67d0875938d0825a40cc632d';
const BASE_URL = 'https://api.makcorps.com';
export const findCity = async (name: string): Promise<City[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/mapping`, {
            params: {
                'API_KEY': `${API_KEY}`,
                name
            }
        });

        console.log('City search response:', response.data);

        // Check if the response data is in the expected format
        if (response.data && Array.isArray(response.data)) {
            return response.data
        } else {
            console.warn('Unexpected response format:', response.data);
            return [];
        }

    } catch (error) {
        console.log('Error while fetching cities:', error);
        throw error;
    }
};


export const searchHotels = async (cityId: number,
    checkin: string,
    checkout: string,
    adults: number,
    children: number,
    pagination: number = 1,
    currency: string = 'USD'): Promise<Hotel[]> => {
    try {

        const response = await axios.get(`${BASE_URL}/city`, {
            params: {
                'API_KEY': '67d0875938d0825a40cc632d',
                cityid: cityId,
                checkin,
                checkout,
                adults,
                pagination,
                cur: currency,
                rooms: 1
            },
            headers: { 'API_KEY': '67d0875938d0825a40cc632d' }
        })
        return response.data
    } catch (error) {
        console.log(error);
        throw error;

    }
} 