import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import styles from "./FeedCards.module.css";

const FeedCards = ({ title, description, link, pubDate }) => {
  console.log(description);
  return (
    <Card className={styles.mainCard_container}>
      <CardContent>
        <Typography variant="h5" component="div">
          {`${title.slice(0, 30)} ...`}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {description.length > 0 && !description.includes("<") && !description[0]?.includes("<") ? `${description.slice(0, 50)}...` || `${description[0].slice(0, 50)}...` : ""}
        </Typography>
        <Typography variant="body2">{new Date(pubDate).toLocaleString()}</Typography>
      </CardContent>
      <CardActions>
        <Link to={link}>
          <Button size="small">Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default FeedCards;
