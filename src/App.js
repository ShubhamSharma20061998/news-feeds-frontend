import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { categoryInitialState, feedsInitialState } from "./context/state/InitialStates";
import categoryReducer from "./context/reducer/categoryReducer";
import feedsReducer from "./context/reducer/feedsReducer";

// Create a context for managing feeds
export const FeedsContext = createContext();
// Create a context for managing categories
export const CategoryContext = createContext();

const App = () => {
  // Initialize state for feeds using the feedsReducer
  const [feedsState, feedDispatch] = useReducer(feedsReducer, feedsInitialState);
  // Initialize state for categories using the categoryReducer
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, categoryInitialState);

  return (
    <BrowserRouter>
      {/* Provide the feeds state and dispatch functions to child components */}
      <FeedsContext.Provider value={{ feedsState, feedDispatch }}>
        {/* Provide the category state and dispatch functions to child components */}
        <CategoryContext.Provider value={{ categoryState, categoryDispatch }}>
          {/* Render your custom routes */}
          <CustomRoutes />
        </CategoryContext.Provider>
      </FeedsContext.Provider>
    </BrowserRouter>
  );
};

export default App;
