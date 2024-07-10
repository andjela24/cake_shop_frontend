import React, { useEffect, useState } from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../redux/auth/Action";

export default function LoginUserForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(null);
    const [errors, setErrors] = useState({});
    const auth = useSelector((store) => store.auth);
    
    const handleCloseSnakbar = () => setOpenSnackBar(false);

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, dispatch]);

    useEffect(() => {
        if (auth.user) {
            setLoginSuccess(true);
            setOpenSnackBar(true);
        } else if (auth.error) {
            setLoginSuccess(false);
            setOpenSnackBar(true);
        }
    }, [auth.user, auth.error]);
    
    const validate = (data) => {
        let tempErrors = {};
        if (!data.email) tempErrors.email = "Email je obavezan.";
        if (!data.password) tempErrors.password = "Šifra je obavezna.";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        if (validate(userData)) {
            dispatch(login(userData));
        }
    };

    return (
        <React.Fragment> 
            <form className="w-full" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="given-name"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Šifra"
                            fullWidth
                            autoComplete="given-name"
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                        style={{
                            backgroundColor: "#132743",
                        }}
                            className="w-full"
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0" }}
                        >
                            Uloguj se
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className="flex justify-center flex-col items-center">
                <div className="py-3 flex items-center">
                    <p className="m-0 p-0">Nemaš nalog?</p>
                    <Button
                        onClick={() => navigate("/register")}
                        className="ml-5"
                        size="small"
                    >
                        Registruj se
                    </Button>
                </div>
            </div>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={2000}
                onClose={handleCloseSnakbar}
            >
                <Alert
                    onClose={handleCloseSnakbar}
                    severity={loginSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {loginSuccess ? "Uspešno logovanje!" : "Neuspešno logovanje! Pokušajte ponovo."}
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}
