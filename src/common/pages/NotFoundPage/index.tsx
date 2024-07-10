import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Container>
  );
};

export default NotFoundPage;
