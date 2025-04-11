// Define types used for authentication
export interface UserCredentials {
  email: string;
  password?: string;
}

export interface UserRegistrationData extends UserCredentials {
  name: string;
  // Could add other registration fields ...
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Could add other user properties like an avatar URL
}

// --- Mock DB (Simulated) ---
// In a real app, this data would come from my backend db
const mockUsers: User[] = [
  { id: "user-123", name: "Test User", email: "test@example.com" },
];
// Define a type for mockCredentials that allows indexing with any string (email)
type MockCredentials = {
  [key: string]: string; // Maps email to password
};

const mockCredentials: MockCredentials = {
  "test@example.com": "password123",
};
// --- End Mock DB ---

/*
 * Simulates a login API call.
 * @param {UserCredentials} credentials - User's email and password.
 * @returns {Promise<User>} A promise that resolves with the User object on success.
 * @throws {Error} Throws an error if login fails (wrong credentials, etc.).
 */
export const mockLogin = async (
  credentials: UserCredentials
): Promise<User> => {
  console.log("Mock API: mockLogin called with", credentials.email);
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

  const expectedPassword = mockCredentials[credentials.email];
  const user = mockUsers.find((u) => u.email === credentials.email);

  if (user && expectedPassword && credentials.password === expectedPassword) {
    console.log("Mock API: mockLogin successful for", credentials.email);
    return { ...user }; // Return a copy of the user object
  } else {
    console.error("Mock API: mockLogin failed for", credentials.email);
    throw new Error("Invalid email or password.");
  }
};

/*
 * Simulates a registration API call.
 * @param {UserRegistrationData} userData - User's registration details.
 * @returns {Promise<User>} A promise that resolves with the new User object.
 * @throws {Error} Throws an error if registration fails (e.g., email already exists).
 */
export const mockRegister = async (
  userData: UserRegistrationData
): Promise<User> => {
  console.log("Mock API: mockRegister called for", userData.email);
  await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate network delay

  // Check if email already exists (simple check)
  if (
    mockUsers.some((u) => u.email === userData.email) ||
    mockCredentials[userData.email]
  ) {
    console.error(
      "Mock API: mockRegister failed - email exists:",
      userData.email
    );
    throw new Error("Email address is already registered.");
  }

  // Simulate creating a new user
  const newUser: User = {
    id: `user-${Date.now()}`, // Simple unique ID generation
    name: userData.name,
    email: userData.email,
  };

  // Simulate saving to "database"
  mockUsers.push(newUser);
  mockCredentials[newUser.email] = userData.password!; // Store password (insecurely, just for mock!)

  console.log("Mock API: mockRegister successful for", userData.email, newUser);
  return { ...newUser }; // Return a copy
};

// Mock logout doesn't need an API call in this simulation
// export const mockLogout = async (): Promise<void> => { ... }
