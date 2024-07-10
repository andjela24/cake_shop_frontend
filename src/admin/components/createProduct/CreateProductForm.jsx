import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  createProduct,
} from "../../../redux/admin/product/Action";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { useDispatch } from "react-redux";

const categories = [
  {
    id: 1,
    name: "Svadbene",
  },
  {
    id: 2,
    name: "Dečije",
  },
  {
    id: 3,
    name: "Svečane",
  },
  {
    id: 4,
    name: "Specijal",
  },
];

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [alertOpen, setAlertOpen] = useState(false);


  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const [productData, setProductData] = useState({
    imageUrl: "",
    title: "",
    pricePerKilo: "",
    decorationPrice: "",
    minWeight: "",
    maxWeight: "",
    minTier: "",
    maxTier: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setProductData((prevState) => ({
        ...prevState,
        categoryId: value,
      }));
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ data: productData, jwt }))
      .then(() => {
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
          navigate("/admin/products");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  return (
    <div className="px-20 py-0">
      <Typography
        variant="h3"
        sx={{ textAlign: "center", color: "white.main" }}
        className="py-10 text-center "
      >
        Kreiraj proizvod
      </Typography>
      <form onSubmit={handleSubmit} className="px-20 py-0 min-h-screen">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="URL slike"
              name="imageUrl"
              value={productData.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Naziv"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cena po KG"
              name="pricePerKilo"
              value={productData.pricePerKilo}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Cena dekoracije"
              name="decorationPrice"
              value={productData.decorationPrice}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Minimalna težina"
              name="minWeight"
              value={productData.minWeight}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Maksimalna težina"
              name="maxWeight"
              value={productData.maxWeight}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Minimalna spratnost"
              name="minTier"
              value={productData.minTier}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Maksimalna spratnost"
              name="maxTier"
              value={productData.maxTier}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Kategorija</InputLabel>
              <Select
                name="category"
                value={productData.categoryId}
                onChange={handleChange}
                label="Kategorija"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ p: 1.8, color: "white.main" }}
              className="py-20"
              size="large"
              type="submit"
            >
              Dodaj proizvod
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          Proizvod je uspešno kreiran!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateProductForm;
