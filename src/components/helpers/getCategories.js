import axios from "axios";

export const getCategories = async categoryDispatch => {
  const category = await axios.get("http://localhost:3030/category/list");
  categoryDispatch({ type: "ADD_CATEGORIES", payload: category.data });
};
