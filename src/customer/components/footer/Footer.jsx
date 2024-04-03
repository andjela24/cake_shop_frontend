import { Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Grid className='bg-black text-white mt-10 text-center' container color={'white' } sx={{ bgcolor: 'black', color: 'white', py: 3 }}>
      <Grid  item xs={12} sm={6} md={3}>
      <Typography className='pb-5' variant="h6" gutterBottom>
          Korisni linkovi
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          O Nama
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Blog
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Partneri
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Mapa sajta
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Kontakt
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Broj telefona
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Email
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          PIB
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          MB
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Društvene mreže
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Guides
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          API Status
        </Typography>
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3}>
        <Typography className='pb-5' variant="h6" gutterBottom>
          Legal
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Claim
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Privacy
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Terms
        </Typography>
      </Grid> */}
      <Grid className='pt-20' item xs={12} >
        <Typography variant="body2" component="p" align="center">
          &copy; 2023 Princess Anđela Tortice. Sva prava su zadržana.
        </Typography>
        <Typography variant="body2" component="p" align="center">
          Developed by Angelic Websites.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
