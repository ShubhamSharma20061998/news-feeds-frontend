import { Button, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { CategoryContext, FeedsContext } from "../../App";
import CategoryList from "../components/categoryList/CategoryList";
import DisplayFeeds from "../components/feeds/DisplayFeeds";
import Spinner from "../../components/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../helpers/handleLogout";
import { getCategories } from "../../components/helpers/getCategories";

const UserLandingPage = () => {
  const { categoryState, categoryDispatch } = useContext(CategoryContext);
  const { feedsState, feedDispatch } = useContext(FeedsContext);

  const navigate = useNavigate();

  const [categoryId, setCategoryId] = useState("65cf0d99556107f4bf1e06dc");
  const handleCategoryChange = useCallback(
    id => {
      setCategoryId(id);
    },
    [categoryId]
  );

  useEffect(() => {
    try {
      getCategories(categoryDispatch);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      (async () => {
        const feeds = await axios.get(
          `http://localhost:3030/feeds/list/${categoryId}`
        );
        feedDispatch({ type: "ADD_FEEDS", payload: feeds.data });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [categoryId]);

  return (
    <div className="FeedsbackgroundImageContainer">
      <Container sx={{ padding: "1rem" }}>
        <Grid container>
          <Grid item md={2}>
            <Typography variant="h4">Categories</Typography>
            {feedsState.feeds.length === 0 ? (
              <Spinner />
            ) : (
              <CategoryList
                category={categoryState.categorydata}
                handleCategoryChange={handleCategoryChange}
              />
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={() => handleLogout(navigate)}
            >
              Logout
            </Button>
          </Grid>
          <Grid item md={10}>
            {feedsState.feeds.length === 0 ? (
              <Spinner />
            ) : (
              <DisplayFeeds feedsState={feedsState.feeds} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default UserLandingPage;
