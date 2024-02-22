import React from "react";
import Card from "@mui/material/Card"; // Import Material-UI Card component
import CardActions from "@mui/material/CardActions"; // Import Material-UI CardActions component
import CardContent from "@mui/material/CardContent"; // Import Material-UI CardContent component
import Button from "@mui/material/Button"; // Import Material-UI Button component
import Typography from "@mui/material/Typography"; // Import Material-UI Typography component
import { Link } from "react-router-dom"; // Import Link component from react-router-dom
import styles from "./FeedCards.module.css"; // Import CSS module for styling

const FeedCards = ({ title, description, link, pubDate }) => {
  console.log(description); // Log the description (for debugging purposes)

  return (
    <Card className={styles.mainCard_container}>
      <CardContent>
        <Typography variant="h5" component="div">
          {`${title.slice(0, 30)} ...`} {/* Display truncated title */}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* Display truncated description */}
          {description.length > 0 && !description.includes("<") && !description[0]?.includes("<") ? `${description.slice(0, 50)}...` || `${description[0].slice(0, 50)}...` : ""}
        </Typography>
        <Typography variant="body2">{new Date(pubDate).toLocaleString()}</Typography>
      </CardContent>
      <CardActions>
        {/* Create a link to the specified URL */}
        <Link to={link}>
          <Button size="small">Read More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default FeedCards;
