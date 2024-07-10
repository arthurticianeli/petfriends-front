import { Container, Typography } from "@mui/material";

import React from "react";
import PetForm from "../components/PetForm";

const EditPet: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Edit Pet
      </Typography>
      <PetForm />
    </Container>
  );
};

export default EditPet;
