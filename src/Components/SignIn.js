import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";
import users from './users'

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const data = [
    {
        name : "admin",
        password : "ppc@1234"
    }
  ]

  const handleLogin = (e) => {
    e.preventDefault();

    data.map((element)=>{
      if(username === element.name && password === element.password){
        localStorage.setItem("isAuthenticated",true);
        navigate("/details");
      }
      else{
        alert("Invalid Credentials");
      }
    })
  };




  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Lock color="primary" />
          <Typography variant="h5">Admin Sign In</Typography>
        </Box>

        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;
