import { Button, Container, Grid, Typography } from "@mui/material"; // Import Material-UI components
import axios from "axios"; // Import axios for making HTTP requests
import React, { useCallback, useContext, useEffect, useState } from "react"; // Import necessary React components and hooks
import { CategoryContext, FeedsContext } from "../../App"; // Import context providers from your App component
import CategoryList from "../components/categoryList/CategoryList"; // Import CategoryList component
import DisplayFeeds from "../components/feeds/DisplayFeeds"; // Import DisplayFeeds component
import Spinner from "../../components/spinner/Spinner"; // Import Spinner component
import { useNavigate } from "react-router-dom"; // Import navigation hook
import { handleLogout } from "../helpers/handleLogout"; // Import logout helper function
import { getCategories } from "../../components/helpers/getCategories"; // Import helper function for fetching categories

const UserLandingPage = () => {
  const { categoryState, categoryDispatch } = useContext(CategoryContext); // Access category state and dispatch from context
  const { feedsState, feedDispatch } = useContext(FeedsContext); // Access feeds state and dispatch from context

  const navigate = useNavigate(); // Initialize navigation function

  const [categoryId, setCategoryId] = useState("65cf0d99556107f4bf1e06dc"); // Initialize state for selected category ID
  const handleCategoryChange = useCallback(
    id => {
      setCategoryId(id); // Update selected category ID when user selects a different category
    },
    [categoryId]
  );

  useEffect(() => {
    try {
      // Fetch and populate categories when component mounts
      getCategories(categoryDispatch);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        // Fetch feeds based on selected category ID
        const feeds = await axios.get(`http://localhost:3030/feeds/list/${categoryId}`);
        feedDispatch({ type: "ADD_FEEDS", payload: feeds.data });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [categoryId]); // Update feeds when selected category ID changes

  return (
    <div className="FeedsbackgroundImageContainer">
      <Container sx={{ padding: "1rem" }}>
        <Grid container>
          <Grid item md={2}>
            <Typography variant="h4">Categories</Typography>
            {feedsState.feeds.length === 0 ? <Spinner /> : <CategoryList category={categoryState.categorydata} handleCategoryChange={handleCategoryChange} />}
            <Button variant="contained" fullWidth onClick={() => handleLogout(navigate)}>
              Logout
            </Button>
          </Grid>
          <Grid item md={10}>
            {feedsState.feeds.length === 0 ? <Spinner /> : <DisplayFeeds feedsState={feedsState.feeds} />}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserLandingPage;
