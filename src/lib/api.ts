    /*
    Asynchronous functions using fetch to interact with the Fake Store API endpoints
    Basic logging and error handling are included
    */
    import { Product, Category } from "./types"; // Import types

    const API_BASE_URL = "https://fakestoreapi.com";

    /*
     * Fetches all products from the Fake Store API.
     * @returns {Promise<Product[]>} A promise that resolves to an array of products.
     * @throws {Error} Throws an error if the network response is not ok.
     */
    export const getProducts = async (): Promise<Product[]> => {
      console.log("Fetching all products..."); // Log when fetching starts
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        console.error("Failed to fetch products:", response.status, response.statusText);
        throw new Error(`Failed to fetch products: ${response.statusText} (Status: ${response.status})`);
      }
      const data: Product[] = await response.json();
      console.log("Fetched products:", data.length); // Log number of products fetched
      return data;
    };

    /*
     * Fetches a single product by its ID.
     * @param {number | string} id - The ID of the product to fetch.
     * @returns {Promise<Product>} A promise that resolves to the product object.
     * @throws {Error} Throws an error if the network response is not ok or product not found.
     */
    export const getProductById = async (id: number | string): Promise<Product> => {
      console.log(`Fetching product with ID: ${id}...`);
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
         if (response.status === 404) {
             console.error(`Product with ID ${id} not found.`);
             throw new Error(`Product not found (ID: ${id})`);
         }
        console.error(`Failed to fetch product ${id}:`, response.status, response.statusText);
        throw new Error(`Failed to fetch product ${id}: ${response.statusText} (Status: ${response.status})`);
      }
       // Handle cases where API might return null for a valid request but non-existent ID
      const data: Product | null = await response.json();
       if (!data) {
          console.error(`Product data for ID ${id} is null or empty.`);
          throw new Error(`Product not found or data is empty (ID: ${id})`);
       }
      console.log(`Fetched product ${id}:`, data.title);
      return data;
    };

    /*
     * Fetches all available product categories.
     * @returns {Promise<Category[]>} A promise that resolves to an array of category strings.
     * @throws {Error} Throws an error if the network response is not ok.
     */
    export const getCategories = async (): Promise<Category[]> => {
      console.log("Fetching categories...");
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) {
        console.error("Failed to fetch categories:", response.status, response.statusText);
        throw new Error(`Failed to fetch categories: ${response.statusText} (Status: ${response.status})`);
      }
      const data: Category[] = await response.json();
      console.log("Fetched categories:", data);
      return data;
    };

    /*
     * Fetches products belonging to a specific category.
     * @param {string} category - The category name to filter by.
     * @returns {Promise<Product[]>} A promise that resolves to an array of products in that category.
     * @throws {Error} Throws an error if the network response is not ok.
     */
    export const getProductsByCategory = async (category: string): Promise<Product[]> => {
      console.log(`Fetching products for category: ${category}...`);
      const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
      if (!response.ok) {
        console.error(`Failed to fetch products for category ${category}:`, response.status, response.statusText);
        throw new Error(`Failed to fetch products for category ${category}: ${response.statusText} (Status: ${response.status})`);
      }
      const data: Product[] = await response.json();
      console.log(`Fetched ${data.length} products for category ${category}`);
      return data;
    };

    