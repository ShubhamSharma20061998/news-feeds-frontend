import { Container, Grid, Typography, Pagination } from "@mui/material";
import React, { memo, useState } from "react";
import FeedCards from "./feedscard/FeedCards";

const DisplayFeeds = ({ feedsState }) => {
  const [pageValue, setPageValue] = useState(1);
  const handlePaginationChange = (event, value) => {
    console.log(feedsState.length);
    setPageValue(value);
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
              <FeedCards {...el} />
            </Grid>
          );
        })}
        {Math.floor(feedsState.length / 12) > 0 && (
          <Grid item md={12}>
            <Pagination
              count={Math.floor(feedsState.length / 13)}
              page={pageValue}
              color="primary"
              onChange={handlePaginationChange}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default memo(DisplayFeeds);
