import { Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <Grid
      className="bg-[#F8E8EE] mt-10"
      container
      color={"white"}
      sx={{
        bgcolor: "#F8E8EE",
        color: "white",
        py: 3,
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} sm={6} md={3}>
        <Typography className="pb-5" variant="h6" gutterBottom>
          KORISNIČKI SERVIS
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Uslovi korišćenja
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Dostava
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Najčešća pitanja
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Politika privatnosti
        </Typography>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Typography className="pb-5" variant="h6" gutterBottom>
          KONTAKT
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Broj telefona : +3816012345678
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Email: info@princessandjela.rs
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Adresa: Makenzijeva 1, Beograd
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          PIB: 1121234567
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className="pb-5" variant="h6" gutterBottom>
          Društvene mreže
        </Typography>
        <Typography variant="body2" component="div" gutterBottom>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <InstagramIcon />
            </Grid>
            <Grid item>Instagram</Grid>
          </Grid>
        </Typography>
        <Typography variant="body2" component="div" gutterBottom>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <FacebookIcon />
            </Grid>
            <Grid item>Facebook</Grid>
          </Grid>
        </Typography>
        <Typography variant="body2" component="div" gutterBottom>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <LinkedInIcon />
            </Grid>
            <Grid item>LinkedIn</Grid>
          </Grid>
        </Typography>
      </Grid>

      <Grid className="pt-20" item xs={12}>
        <Typography variant="body2" component="p" align="center">
          &copy; 2024 Princess Anđela Tortice. Sva prava su zadržana.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Developed by Angelic Websites.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
