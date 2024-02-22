import axios from "axios";

// Function to fetch categories and dispatch them to the state
export const getCategories = async categoryDispatch => {
  try {
    // Make an HTTP GET request to retrieve categories
    const response = await axios.get("http://localhost:3030/category/list");
    // Dispatch the retrieved categories to the state using the specified action type
    categoryDispatch({ type: "ADD_CATEGORIES", payload: response.data });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching categories:", error.message);
    // You can add additional error handling logic here if needed
  }
};
