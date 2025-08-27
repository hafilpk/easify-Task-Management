import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Tasks",
      icon: <AssignmentIcon style={{ fontSize: 50, color: "#1976d2" }} />,
      path: "/tasks",
      description: "View and manage your tasks",
    },
    {
      title: "Profile",
      icon: <PersonIcon style={{ fontSize: 50, color: "#f57c00" }} />,
      path: "/profile",
      description: "View and update your profile",
    },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      
      <Typography variant="h3" gutterBottom fontWeight="bold" color="primary">
        Easify
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Welcome back! Choose what you want to work on today.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "16px",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardActionArea onClick={() => navigate(card.path)}>
                <CardContent sx={{ textAlign: "center", py: 5 }}>
                  {card.icon}
                  <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
