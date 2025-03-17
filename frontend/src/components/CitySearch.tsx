import React, { useState } from 'react';
import axios from 'axios';

interface CityResult {
  document_id: string;
  name: string;
  details: {
    parent_name: string;
    grandparent_name: string;
  };
}

interface CitySearchProps {
  onSelectCity: (cityId: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSelectCity }) => {
  const [destination, setDestination] = useState('');
  const [cityResults, setCityResults] = useState<CityResult[]>([]);

  const fetchCityId = async (destination: string) => {
    try {
      const response = await axios.get('https://api.makcorps.com/mapping', {
        params: {
          api_key: '67d0875938d0825a40cc632d',
          name: destination,
        },
      });
      setCityResults(response.data);
    } catch (error) {
      console.error('Error fetching city IDs:', error);
    }
  };

  const handleSearch = () => {
    if (destination.trim()) {
      fetchCityId(destination);
    } else {
      alert('Please enter a destination.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <input
        type="text"
        placeholder="Enter destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Search
      </button>

      {cityResults.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Select a City:</h3>
          <ul className="space-y-2">
            {cityResults.map((city) => (
              <li key={city.document_id}>
                <button
                  onClick={() => onSelectCity(city.document_id)}
                  className="w-full text-left bg-gray-100 p-2 rounded-md hover:bg-gray-200"
                >
                  {city.name} - {city.details.parent_name}, {city.details.grandparent_name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
