import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Phone, Mail } from '@mui/icons-material';

const Contact = () => {
  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Kontakt
      </Typography>
      <Grid container spacing={4}>
        {/* Tekst sa leve strane */}
        <Grid item xs={12} md={6}>
          <Typography variant="body1" gutterBottom>
            Za porudžbine i sva dodatna pitanja možete nas kontaktirati putem telefona:
          </Typography>
          <ul className="list-disc list-inside mb-4">
            <li>060/123-4567</li>
            <li>061/234-5678</li>
            <li>011/2345-678</li>
          </ul>
          <Typography variant="body1" gutterBottom>
            ili putem mail adrese: <a href="mailto:prodaja@princessandjela.rs">prodaja@princessandjela.rs</a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Posetite našu FB stranicu: <a href="https://www.facebook.com/princessandjela">Poslastičarnica Princess Andjela</a> i Instagram profil <a href="https://www.instagram.com/princessandjela/">@princessandjela</a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Ukoliko želite da ostvarite saradnju sa nama, ponude nam možete poslati na adresu: <a href="mailto:ponude@princessandjela.rs">ponude@princessandjela.rs</a>, a sve ostalo možete poslati na adresu: <a href="mailto:info@princessandjela.rs">knjigovodstvo@princessandjela.rs</a>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Naša slatka radionica nalazi se u ulici Makenzijeva 1, Vračar, 11000 Beograd.
          </Typography>
        </Grid>
        {/* Google mapa sa desne strane */}
        <Grid item xs={12} md={6}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2725.0578168165202!2d20.465335149479177!3d44.80218688528776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a700a3e325803%3A0x4b04c0ab5f22270c!2sMakenzijeva%201%2C%20Beograd!5e0!3m2!1sen!2srs!4v1719485686523!5m2!1sen!2srs"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
          <Typography variant="body1" gutterBottom>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Contact;
