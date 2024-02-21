import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { memo, useCallback, useContext, useState } from "react";
import CategoryTextField from "./CategoryTextField";
import styles from "../../pages/Admin.module.css";
import axios from "axios";
import { CategoryContext } from "../../../App";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { handleLogout } from "../../../users/helpers/handleLogout";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

const CategoryListing = () => {
  const { categoryState, categoryDispatch } = useContext(CategoryContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [titleState, setTitleState] = useState("");
  const [urlState, setUrlState] = useState("");

  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "1rem",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const updateCategoryListing = useCallback(
    async (id, formData) => {
      try {
        const result = await axios.put(`http://localhost:3030/category/edit/${id}`, formData, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        });
        categoryDispatch({ type: "EDIT_CATEGORY", payload: result.data });
      } catch (err) {
        console.log(err);
      }
    },
    [categoryState.categorydata]
  );

  const deleteCategory = useCallback(
    async id => {
      try {
        const result = await axios.delete(`http://localhost:3030/category/remove/${id}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")).token,
          },
        });
        categoryDispatch({ type: "DELETE_CATEGORY", payload: result.data });
      } catch (error) {
        console.log(error);
      }
    },
    [categoryState.categorydata]
  );

  const handleAddCategory = async e => {
    e.preventDefault();
    const formdata = { title: titleState, url: urlState };
    try {
      const result = await axios.post("http://localhost:3030/category/create", formdata, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")).token,
        },
      });
      categoryDispatch({ type: "INSERT_CATEGORY", payload: result.data });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Paper elevation={2} className={styles.outterContainer}>
        <Typography variant="h4" textAlign={"center"} padding={"1rem 0"}>
          Category Listing
        </Typography>
        <Grid container className={styles.form_innerContainer}>
          {categoryState.categorydata.map((el, i) => {
            return <CategoryTextField {...el} updateCategoryListing={updateCategoryListing} deleteCategory={deleteCategory} key={i} />;
          })}
          <Grid item md={3}>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />} fullWidth className={styles.add_btn} onClick={handleOpen}>
              Add Category
            </Button>
          </Grid>
          <Grid item md={3}>
            <Button variant="contained" startIcon={<LogoutIcon />} fullWidth className={styles.logout_btn} onClick={() => handleLogout(navigate)}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {/* model */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2" marginBottom={"0.5rem"}>
                Add Category
              </Typography>
              <form onSubmit={handleAddCategory}>
                <TextField variant="outlined" fullWidth label="Title" className={styles.margin_Bottom} onChange={e => setTitleState(e.target.value)} />
                <TextField variant="outlined" fullWidth label="URL" onChange={e => setUrlState(e.target.value)} className={styles.margin_Bottom} />
                <Button variant="contained" fullWidth type="submit">
                  save
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default memo(CategoryListing);
