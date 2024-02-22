const feedsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FEEDS": {
      // Update the feeds data with the provided payload
      return { ...state, feeds: action.payload };
    }
    default: {
      // Return the current state if the action type is not recognized
      return { ...state };
    }
  }
};

export default feedsReducer;
