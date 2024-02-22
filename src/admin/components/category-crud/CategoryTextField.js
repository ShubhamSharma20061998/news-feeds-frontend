// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "../../pages/Admin.module.css";
import { Grid, TextField } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

// Component for Category Text Field
const CategoryTextField = props => {
  // Destructuring props
  const { _id, title, url, updateCategoryListing, deleteCategory } = props;

  // State variables
  const [stateTitle, setstateTitle] = useState("");
  const [stateUrl, setStateUrl] = useState("");
  const [isEdit, setIsEdit] = useState(true);

  // UseEffect to set initial state
  useEffect(() => {
    if (title) setstateTitle(title);
    if (url) setStateUrl(url);
  }, []);

  // Function to handle edit operation
  const handleEdit = () => {
    const formData = { title: stateTitle, url: stateUrl };
    updateCategoryListing(_id, formData);
    setIsEdit(true);
  };

  // Function to handle delete operation
  const handleDelete = () => {
    deleteCategory(_id);
  };

  // Render component
  return (
    <>
      <Grid item md={2}>
        <TextField variant="outlined" fullWidth value={stateTitle} onChange={e => setstateTitle(e.target.value)} disabled={isEdit} label="Title" />
      </Grid>
      <Grid item md={8}>
        <TextField label="URL" variant="outlined" fullWidth value={stateUrl} onChange={e => setStateUrl(e.target.value)} disabled={isEdit} />
      </Grid>
      <Grid item md={1}>
        {isEdit ? (
          // Edit button
          <IconButton aria-label="edit" className={styles.EditIcon} onClick={e => setIsEdit(false)}>
            <EditIcon />
          </IconButton>
        ) : (
          // Done button
          <IconButton aria-label="edit" className={styles.EditIcon} onClick={handleEdit}>
            <DoneIcon />
          </IconButton>
        )}
        // Delete button
        <IconButton aria-label="delete" className={styles.DeleteIcon} onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </>
  );
};

// Exporting the component
export default CategoryTextField;
