const categoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORIES": {
      // Update the category data with the provided payload
      return { ...state, categorydata: action.payload };
    }
    case "INSERT_CATEGORY": {
      // Add a new category to the existing category data
      return {
        ...state,
        categorydata: [...state.categorydata, action.payload],
      };
    }
    case "EDIT_CATEGORY": {
      // Update an existing category based on the provided payload
      return {
        ...state,
        categorydata: state.categorydata.map(el => {
          if (el._id === action.payload._id) {
            return action.payload;
          } else {
            return el;
          }
        }),
      };
    }
    case "DELETE_CATEGORY": {
      // Remove a category from the existing category data
      return {
        ...state,
        categorydata: state.categorydata.filter(el => {
          return el._id !== action.payload._id;
        }),
      };
    }
    default: {
      // Return the current state if the action type is not recognized
      return { ...state };
    }
  }
};

export default categoryReducer;
