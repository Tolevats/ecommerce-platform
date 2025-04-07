    // Defines the Product and Category types matching the API structure

    // Represents the structure of a product rating from the API.
    export interface ProductRating {
        rate: number;
        count: number;
      }
  
      // Represents the structure of a product object from the Fake Store API.
      export interface Product {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
        rating: ProductRating;
      }
  
      // Represents a category string.
      export type Category = string;
    