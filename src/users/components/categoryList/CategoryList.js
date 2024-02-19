import React, { memo, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const CategoryList = ({ category, handleCategoryChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index, id) => {
    setSelectedIndex(index);
    handleCategoryChange(id);
  };
  return (
    <Box>
      <List component="nav" aria-label="category">
        {category.map((el, index) => {
          return (
            <ListItemButton
              key={index}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index, el._id)}
            >
              <ListItemText primary={el.title} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default memo(CategoryList);
