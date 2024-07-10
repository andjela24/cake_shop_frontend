import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../redux/auth/Action";
import { useEffect, useState } from "react";

export default function RegisterUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const { auth } = useSelector((store) => store);
  const handleClose = () => setOpenSnackBar(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);

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

    const errors = validateForm(userData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    console.log("user data", userData);
    dispatch(register(userData))
      .then(() => {
        setRegistrationSuccess(true);
        setOpenSnackBar(true);
        setTimeout(() => {
          setOpenSnackBar(false);
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setRegistrationSuccess(false);
        setOpenSnackBar(true);
      });
  };

  const validateForm = (userData) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const nameRegex = /^[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+381\d{9,10}$/;

    if (!emailRegex.test(userData.email)) {
      errors.email = "Email format nije validan.";
    }
    if (!passwordRegex.test(userData.password)) {
      errors.password = "Šifra mora imati najmanje 8 karaktera, uključujući slova i brojeve.";
    }
    if (!nameRegex.test(userData.firstName)) {
      errors.firstName = "Ime mora imati najmanje 2 karaktera.";
    }
    if (!nameRegex.test(userData.lastName)) {
      errors.lastName = "Prezime mora imati najmanje 2 karaktera.";
    }
    if (!phoneRegex.test(userData.phoneNumber)) {
      errors.phoneNumber = "Broj telefona mora biti u formatu +381xxxxxxxxx.";
    }

    return errors;
  };

  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
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
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
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
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
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
              error={!!formErrors.phoneNumber}
              helperText={formErrors.phoneNumber}
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
              error={!!formErrors.email}
              helperText={formErrors.email}
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
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{ backgroundColor: "#132743" }}
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
        <div className="py-3 flex items-center">
          <p className="m-0 p-0">Već imaš nalog?</p>
          <Button onClick={() => navigate("/login")} className="ml-5" size="small">
            Uloguj se
          </Button>
        </div>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={registrationSuccess ? "success" : "error"} sx={{ width: "100%" }}>
          {registrationSuccess ? "Uspešna registracija!" : "Neuspešna registracija! Pokušajte ponovo."}
        </Alert>
      </Snackbar>
    </div>
  );
}
