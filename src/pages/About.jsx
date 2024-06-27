import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        O nama
      </Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph>
          Naš tim je sastavljen od vrhunskih majstora koji se svakodnevno usavršavaju da bismo za vas stvarali magične slatkiše koji se pamte do kraja života.
        </Typography>
        <Typography variant="body1" paragraph>
          Da bismo ispunili sve vaše slatke maštarije, pratimo najnovije trendove, usavršavamo se i učimo od najboljih svetskih poslastičara.
        </Typography>
        <Typography variant="body1" paragraph>
          Na prvom mestu nam je zadovoljstvo, kao i sigurnost naših kupaca pa primenjujemo sistem bezbednosti hrane HACCP.
        </Typography>
        <Typography variant="body1" paragraph>
          I zato, torte, kolače i druge slatkiše pravimo u skladu sa vašim željama i potrebama, uz stručne savete naših poslastičara i dekoratera koji će vam u svakom trenutku objasniti sve što vas interesuje.
        </Typography>
        <Typography variant="body1" paragraph>
          Ukoliko ste ljubitelji domaćih ukusa kolača i torti, poslastičarnica Princess Anđela pravo je mesto za prepuštanje slatkim zadovoljstvima.
        </Typography>
        <Typography variant="body1" paragraph>
          Ko jednom dođe i proba našu slatku ponudu, vraća se po još!
        </Typography>
        <Typography variant="body1" paragraph>
          Za vas stvaramo jestiva umetnička dela i slatke uspomene. Posetite nas na adresi Makenzijeva 1 na Vračaru u ili jednostavno zavirite u naše slatko online carstvo i poručite – obećavamo da ćete se oduševiti.
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Vaša poslastičarnica „Princess Anđela“
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
