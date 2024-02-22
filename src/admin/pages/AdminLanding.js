import { Container } from "@mui/material"; // Import Material-UI Container component
import React, { useContext, useEffect } from "react"; // Import necessary React components and hooks
import styles from "./Admin.module.css"; // Import CSS module for styling
import CategoryListing from "../components/category-crud/CategoryListing"; // Import CategoryListing component
import { getCategories } from "../../components/helpers/getCategories"; // Import helper function for fetching categories
import { CategoryContext } from "../../App"; // Import CategoryContext from your App component

const AdminLanding = () => {
  const { categoryState, categoryDispatch } = useContext(CategoryContext); // Access category state and dispatch from context

  useEffect(() => {
    // Fetch and populate categories when component mounts
    getCategories(categoryDispatch);
  }, []);

  return (
    <div className={styles.adminBackground}>
      <Container className={styles.main_container}>
        {/* Render the CategoryListing component with the fetched category data */}
        <CategoryListing category={categoryState.categorydata} />
      </Container>
    </div>
  );
};

export default AdminLanding;
