import React, { memo, useState } from "react";
import Box from "@mui/material/Box"; // Import Box component from Material-UI
import List from "@mui/material/List"; // Import List component from Material-UI
import ListItemButton from "@mui/material/ListItemButton"; // Import ListItemButton component from Material-UI
import ListItemText from "@mui/material/ListItemText"; // Import ListItemText component from Material-UI

const CategoryList = ({ category, handleCategoryChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Initialize state for selected index

  const handleListItemClick = (index, id) => {
    setSelectedIndex(index); // Update selected index when user clicks on a category
    handleCategoryChange(id); // Call the provided callback function with the selected category ID
  };

  return (
    <Box>
      <List component="nav" aria-label="category">
        {category.map((el, index) => {
          return (
            <ListItemButton key={index} selected={selectedIndex === index} onClick={() => handleListItemClick(index, el._id)}>
              <ListItemText primary={el.title} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default memo(CategoryList);
