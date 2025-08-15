import { Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material";
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
      title: "Projects",
      icon: <WorkspacesIcon style={{ fontSize: 50, color: "#2e7d32" }} />,
      path: "/projects",
      description: "Organize work into projects",
    },
    {
      title: "Profile",
      icon: <PersonIcon style={{ fontSize: 50, color: "#f57c00" }} />,
      path: "/profile",
      description: "View and update your profile",
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Easify
      </Typography>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card elevation={4}>
              <CardActionArea onClick={() => navigate(card.path)}>
                <CardContent style={{ textAlign: "center" }}>
                  {card.icon}
                  <Typography variant="h6" gutterBottom>
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
    </div>
  );
}
