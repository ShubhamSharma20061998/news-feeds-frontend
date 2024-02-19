const categoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CATEGORIES": {
      return { ...state, categorydata: action.payload };
    }
    case "INSERT_CATEGORY": {
      return {
        ...state,
        categorydata: [...state.categorydata, action.payload],
      };
    }
    case "EDIT_CATEGORY": {
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
      return {
        ...state,
        categorydata: state.categorydata.filter(el => {
          return el._id !== action.payload._id;
        }),
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default categoryReducer;
