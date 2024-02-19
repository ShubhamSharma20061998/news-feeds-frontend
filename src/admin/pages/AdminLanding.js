import { Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import styles from "./Admin.module.css";
import CategoryListing from "../components/category-crud/CategoryListing";
import { getCategories } from "../../components/helpers/getCategories";
import { CategoryContext } from "../../App";

const AdminLanding = () => {
  const { categoryState, categoryDispatch } = useContext(CategoryContext);

  useEffect(() => {
    getCategories(categoryDispatch);
  }, []);
  return (
    <div className={styles.adminBackground}>
      <Container className={styles.main_container}>
        <CategoryListing category={categoryState.categorydata} />
      </Container>
    </div>
  );
};

export default AdminLanding;
