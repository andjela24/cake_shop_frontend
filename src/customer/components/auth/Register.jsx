import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../redux/auth/Action";
import { useEffect, useState } from "react";

export default function RegisterUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null); // Stanje za uspeh/neuspeh registracije
  const { auth } = useSelector((store) => store);
  const handleClose = () => setOpenSnackBar(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user || auth.error) {
      setOpenSnackBar(true);
      setRegistrationSuccess(!!auth.user);
    }
  }, [auth.user, auth.error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      phoneNumber: data.get("phoneNumber"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log("user data", userData);
    dispatch(register(userData))
      .then(() => {
        setRegistrationSuccess(true); // Postavi stanje registracije na uspešno
        setTimeout(() => {
          setOpenSnackBar(false); // Zatvori Snackbar nakon 2 sekunde
          navigate("/login"); // Preusmeri korisnika na login stranicu
        }, 2000);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setRegistrationSuccess(false); // Postavi stanje registracije na neuspešno
      });
    setOpenSnackBar(true); // Prikaži Snackbar
  };
  
  

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [registrationSuccess, navigate]);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="Ime"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Prezime"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Broj telefona"
              fullWidth
              autoComplete="tel"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Šifra"
              fullWidth
              type="password"
              autoComplete="new-password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              style={{
                backgroundColor: "#393119",
              }}
              className="w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              Registruj se
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center ">
          <p className="m-0 p-0">Već imaš nalog?</p>
          <Button
            onClick={() => navigate("/login")}
            className="ml-5"
            size="small"
          >
            Uloguj se
          </Button>
        </div>
      </div>

      <Snackbar
    open={openSnackBar}
    autoHideDuration={2000}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={registrationSuccess ? "success" : "error"} sx={{ width: "100%" }}>
      {registrationSuccess === null ? "Obrada registracije..." : registrationSuccess ? "Uspešna registracija!" : "Neuspešna registracija! Pokušajte ponovo."}
    </Alert>
  </Snackbar>
    </div>
  );
}
