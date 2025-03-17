import React, { useState } from 'react';
import CitySearch from './CitySearch';
import { HotelResults } from './HotelResults';
import axios from 'axios';

export const fetchHotels = async (
    cityId: string,
    checkIn: string,
    checkOut: string,
    adults: number,
    children: number
) => {
    try {
        const response = await axios.get('https://api.makcorps.com/city', {
            params: {
                api_key: '67d0875938d0825a40cc632d',
                cityid: cityId,
                pagination: 0,
                cur: 'USD',
                rooms: 1,
                adults: adults,
                children: children,
                checkin: checkIn,
                checkout: checkOut,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return [];
    }
};

const HotelSearchApp: React.FC = () => {
    const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [adults, setAdults] = useState<number>(1);
    const [children, setChildren] = useState<number>(0);
    const [roomType, setRoomType] = useState<string>('');
    const [hotels, setHotels] = useState([]);

    const handleCitySelection = (cityId: string) => {
        setSelectedCityId(cityId);
    };

    const handleSearchHotels = async () => {
        if (!selectedCityId || !checkIn || !checkOut) {
            alert('من فضلك، أكمل جميع البيانات');
            return;
        }
        try {
            const response = await fetchHotels(selectedCityId, checkIn, checkOut, adults, children);
            setHotels(response);
        } catch (error) {
            console.error('فشل في جلب الفنادق:', error);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Hotel Search App</h1>
            <CitySearch onSelectCity={handleCitySelection} />

            {selectedCityId && (
                <div className="mt-4 p-4 bg-white rounded-lg shadow-md">
                    <p>Selected City ID: {selectedCityId}</p>

                    <label>Check-In:</label>
                    <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="border p-2 rounded mb-2" />

                    <label>Check-Out:</label>
                    <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="border p-2 rounded mb-2" />

                    <label>Adults:</label>
                    <input type="number" min="1" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} className="border p-2 rounded mb-2" />

                    <label>Children:</label>
                    <input type="number" min="0" value={children} onChange={(e) => setChildren(parseInt(e.target.value))} className="border p-2 rounded mb-2" />

                    <label>Room Type:</label>
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)} className="border p-2 rounded mb-2">
                        <option value="">Any</option>
                        <option value="single">Single</option>
                        <option value="double">Double</option>
                        <option value="suite">Suite</option>
                    </select>

                    <button onClick={handleSearchHotels} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Search Hotels</button>
                </div>
            )}

            {hotels.length > 0 && <HotelResults hotels={hotels} />}
        </div>
    );
};

export default HotelSearchApp;
