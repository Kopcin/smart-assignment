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
  IconButton,
  Snackbar,
  Slide,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSnackbarOpen(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [snackbarOpen]);

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
      [name as keyof Filters]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      username: "",
      email: "",
      phone: "",
    });
    setSnackbarMessage("Filters cleared!");
    setSnackbarOpen(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
        <Stack spacing={2}>
          {["name", "username", "email", "phone"].map((field) => (
            <Stack direction="row" alignItems="center" spacing={1} key={field}>
              <TextField
                key={field}
                fullWidth
                label={`Search by ${field}`}
                name={field}
                value={filters[field as keyof Filters]}
                onChange={handleFilterChange}
                margin="normal"
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setFilters((prevFilters) => ({
                            ...prevFilters,
                            [field]: "",
                          }))
                        }
                      >
                        <ClearIcon />
                      </IconButton>
                    ),
                  },
                }}
              />
            </Stack>
          ))}
          <Stack direction="row" justifyContent="flex-end">
            <IconButton color="primary" onClick={clearFilters}>
              Clear Filters
            </IconButton>
          </Stack>
        </Stack>
      </Paper>
      <Table data={filteredUsers} />
      <Snackbar
        key={snackbarMessage}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default UserTable;
