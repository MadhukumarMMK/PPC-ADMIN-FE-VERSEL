import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  city: "",
};

function AddDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendUrl = "https://ppc-backend.onrender.com/api/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      console.log("Submitting Data:", formData);
      const response = await axios.post(backendUrl + "add-sample", formData);

      if (response.status === 201) {
        console.log("Response:", response.data);
        alert("Form submitted successfully!");
        navigate("/details");
        setFormData(initialFormState);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: "12px" }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Add Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
          />

          <Box textAlign="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Submit"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default AddDetails;
