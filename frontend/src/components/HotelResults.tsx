import React from 'react';

interface Hotel {
    name: string;
    reviews?: {
      rating?: number;
      count?: number;
    };
    price1?: string;
    vendor1?: string;
}

export const HotelResults: React.FC<{ hotels: any[] }> = ({ hotels }) => {
  return (
    <div className="p-4">
      {hotels.length > 0 ? (
        hotels.map((hotel: Hotel, index: number) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h1 className="text-xl font-bold">{hotel.name}</h1>
            <h4 className="text-gray-600">Reviews: {hotel.reviews?.count || 'N/A'}</h4>
            <h5 className="text-gray-600">Rating: {hotel.reviews?.rating || 'N/A'}</h5>
            <h5 className="text-gray-600">Vendor: {hotel.vendor1 || 'N/A'}</h5>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};
