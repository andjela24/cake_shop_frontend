import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

const Achivement = () => {
  const theme = useTheme();

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: "0.25px" }}>
          Princess Andjela
        </Typography>
        <Typography variant="body2">
          Čestitamo na ostvarenom profitu 🥳{" "}
        </Typography>

        <Typography variant="h5" sx={{ my: 3.1, color: "primary.main" }}>
          3.214.714 RSD
        </Typography>
        <Button size="small" variant="contained" sx={{ color: "white.main" }}>
          Pregled prodaja
        </Button>
      </CardContent>
    </Card>
  );
};

export default Achivement;
