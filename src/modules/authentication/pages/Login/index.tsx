import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Typography } from "@mui/material";
import ControlledTextField from "common/components/ControlledTextField";
import { useAlert } from "hooks/useAlert";
import { CreateUserUseCase } from "modules/authentication/domain/usecases/CreateUserUseCase";
import { LoginUseCase } from "modules/authentication/domain/usecases/LoginUseCase";
import { useAuth } from "modules/authentication/hooks/useAuth";
import { UserRepositoryImpl } from "modules/authentication/infra/UserRepositoryImpl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginForm, loginFormSchema } from "../Validators";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { showAlert } = useAlert();
  const userRepository = new UserRepositoryImpl();
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const loginUseCase = new LoginUseCase(userRepository);

  const [isSignUp, setIsSignUp] = useState(false);

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(loginFormSchema),
  });

  const handleLogin = handleSubmit(async (data) => {
    if (isSignUp) {
      try {
        const accessToken = await createUserUseCase.execute({
          email: data.email,
          password: data.password,
          name: data?.name!,
        });
        auth.initSession(accessToken);
        navigate("/pets");
      } catch {
        showAlert("Error creating user", "error");
      }
    } else {
      try {
        const accessToken = await loginUseCase.execute(data);
        auth.initSession(accessToken);
        navigate("/pets");
      } catch {
        showAlert("Error login", "error");
      }
    }
  });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Login"}
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          {isSignUp && (
            <ControlledTextField
              name="name"
              label="User Name"
              control={control}
            />
          )}
          <ControlledTextField name="email" label="Email" control={control} />
          <ControlledTextField
            name="password"
            label="Password"
            type="password"
            control={control}
          />
          {isSignUp ? (
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => setIsSignUp(false)}
                fullWidth
                variant="outlined"
                sx={{ mt: 3 }}
              >
                Cancel
              </Button>
            </Box>
          ) : (
            <>
              <Typography
                onClick={() => setIsSignUp(true)}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginLeft: 10,
                }}
                variant="body2"
              >
                Click to sign up
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}
