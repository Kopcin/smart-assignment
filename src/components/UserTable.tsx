import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/userSlice";
import { RootState, AppDispatch } from "../app/store";
import Table from "./Table";
import {
  TextField,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Stack,
} from "@mui/material";

interface Filters {
  name: string;
  username: string;
  email: string;
  phone: string;
}

const UserTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, status, error } = useSelector(
    (state: RootState) => state.users
  );

  const [filters, setFilters] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === "failed") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">Error: {error}</Alert>
      </Box>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
      user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Stack spacing={2}>
          {["name", "username", "email", "phone"].map((field) => (
            <TextField
              key={field}
              fullWidth
              label={`Search by ${field}`}
              name={field}
              value={filters[field as keyof Filters]}
              onChange={handleFilterChange}
              margin="normal"
            />
          ))}
        </Stack>
      </Paper>
      <Table data={filteredUsers} />
    </Box>
  );
};

export default UserTable;
