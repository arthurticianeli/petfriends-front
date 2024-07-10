import { Box, Container, Typography } from "@mui/material";
import PetForm from "../components/PetForm";

export function CreatePet() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Add Pet
      </Typography>
      <Box>
        <PetForm />
      </Box>
    </Container>
  );
}
