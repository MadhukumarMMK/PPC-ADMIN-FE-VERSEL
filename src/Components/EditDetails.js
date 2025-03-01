import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle 
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DetailsList = () => {
  const backendUrl = "https://ppc-backend.onrender.com/api/";
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backendUrl + "get-sample");
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-details/${id}`);
  };

  const openConfirmDialog = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${backendUrl}/delete-sample/${deleteId}`);
      setData((prevData) => prevData.filter((user) => user._id !== deleteId));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
    handleClose();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "80%",
        margin: "auto",
        mt: 4,
        borderRadius: "12px",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          my: 3,
          fontWeight: "bold",
          color: "#2B2D42",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Church People Data
      </Typography>

      {data.length === 0 ? (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            my: 3,
            color: "gray",
            fontStyle: "italic",
          }}
        >
          No Data Available
        </Typography>
      ) : (
        <Table>
          <TableHead
            sx={{
              background: "linear-gradient(90deg, #1e3c72, #2a5298)",
            }}
          >
            <TableRow>
              {["#", "Name", "Email", "Phone", "City", "Actions"].map((head, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "16px",
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((user, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(105, 105, 105, 0.1)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {index + 1}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user.email}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user.phone}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{user.city}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mx: 1 }}
                    onClick={() => handleEdit(user._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ mx: 1 }}
                    onClick={() => openConfirmDialog(user._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default DetailsList;
