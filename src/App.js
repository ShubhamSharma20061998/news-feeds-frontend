import React, { createContext, useReducer } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { categoryInitialState, feedsInitialState } from "./context/state/InitialStates";
import categoryReducer from "./context/reducer/categoryReducer";
import feedsReducer from "./context/reducer/feedsReducer";

export const FeedsContext = createContext();
export const CategoryContext = createContext();

const App = () => {
  const [feedsState, feedDispatch] = useReducer(feedsReducer, feedsInitialState);
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, categoryInitialState);
  return (
    <BrowserRouter>
      <FeedsContext.Provider value={{ feedsState, feedDispatch }}>
        <CategoryContext.Provider value={{ categoryState, categoryDispatch }}>
          <CustomRoutes />
        </CategoryContext.Provider>
      </FeedsContext.Provider>
    </BrowserRouter>
  );
};

export default App;
