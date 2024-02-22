import { Container, Grid, Typography, Pagination } from "@mui/material"; // Import Material-UI components
import React, { memo, useState } from "react"; // Import necessary React components and hooks
import FeedCards from "./feedscard/FeedCards"; // Import FeedCards component

const DisplayFeeds = ({ feedsState }) => {
  const [pageValue, setPageValue] = useState(1); // Initialize state for pagination

  const handlePaginationChange = (event, value) => {
    console.log(feedsState.length); // Log the total number of feeds
    setPageValue(value); // Update the current page value
  };

  return (
    <Container>
      <Typography variant="h4" textAlign={"center"}>
        {feedsState[0]?.category?.title}
      </Typography>
      <Grid container padding={"1rem"} spacing={2}>
        {feedsState.slice((pageValue - 1) * 13, 13 * pageValue).map((el, i) => {
          return (
            <Grid item md={4} key={i}>
              <FeedCards {...el} /> {/* Render individual feed cards */}
            </Grid>
          );
        })}
        {Math.floor(feedsState.length / 12) > 0 && (
          <Grid item md={12}>
            {/* Render pagination component */}
            <Pagination count={Math.floor(feedsState.length / 13)} page={pageValue} color="primary" onChange={handlePaginationChange} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default memo(DisplayFeeds);
