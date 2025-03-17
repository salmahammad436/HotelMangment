
export interface Hotel {
    geocode: {
      latitude: number;
      longitude: number;
    };
    telephone: string;
    name: string;
    hotelId: number;
    reviews: {
      rating: number;
      count: number;
    };
    vendor1: string | null;
    price1: number | null;
  }
  
  export interface City {
    id: number;
    name: string;
    
  }
  
  export interface SearchParams {
    cityId: number;
    checkin: string;
    checkout: string;
    adults: number;
    children: number;
    roomTypes: string[];
  }