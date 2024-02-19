const feedsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FEEDS": {
      return { ...state, feeds: action.payload };
    }
    default: {
      return { ...state };
    }
  }
};
export default feedsReducer;
