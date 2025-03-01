import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

function EditDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const backendUrl = "https://ppc-backend.onrender.com/api/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/get-single-sample/${id}`);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to load data.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
      const response = await axios.put(`${backendUrl}/edit-sample/${id}`, formData);
      if (response.status === 200) {
        alert("Details updated successfully!");
        navigate("/details");
      }
    } catch (err) {
      console.error("Error updating details:", err);
      alert("Failed to update details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: "12px" }}>
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold">
          Edit Details
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
              {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Update"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default EditDetails;
