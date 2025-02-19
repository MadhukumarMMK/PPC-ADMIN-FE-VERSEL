import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography 
} from "@mui/material";

const DetailsList = () => {
  const backendUrl = "https://ppc-backend.onrender.com/api/";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backendUrl + "get-sample");
        if (response.status === 200) {
          console.log(response.data);
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "80%",
        margin: "auto",
        mt: 4,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(8px)", // Glass effect
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
          {/* Table Head with Gradient */}
          <TableHead
            sx={{
             background: "linear-gradient(90deg, #1e3c72, #2a5298)", 
            }}
          >
            <TableRow>
              {["#", "Name", "Email", "Phone", "City"].map((head, index) => (
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

          {/* Table Body with Hover Effect */}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default DetailsList;
