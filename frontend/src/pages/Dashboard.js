import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Paper,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cards = [
    {
      title: "Tasks",
      icon: <AssignmentIcon style={{ fontSize: 55, color: "#1976d2" }} />,
      path: "/tasks",
      description: "View and manage your tasks efficiently",
    },
    {
      title: "Profile",
      icon: <PersonIcon style={{ fontSize: 55, color: "#f57c00" }} />,
      path: "/profile",
      description: "View and update your personal details",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#c70f5fff" }}>
      {/* Top AppBar */}
      <AppBar position="static" sx={{ bgcolor: "#45061d60" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Easify
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "linear-gradient(135deg, #6a11cb, #2575fc)",
          color: "white",
          py: 6,
          px: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to Easify
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, opacity: 0.9 }}>
          Organize your work and stay productive ✨
        </Typography>
      </Box>

      <Box sx={{ p: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="primary">
            Dashboard
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Choose what you want to work on today.
          </Typography>
        </Paper>

        <Grid container spacing={4} justifyContent="center">
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: "20px",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 10,
                  },
                }}
              >
                <CardActionArea onClick={() => navigate(card.path)}>
                  <CardContent sx={{ py: 6 }}>
                    {card.icon}
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      {card.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
