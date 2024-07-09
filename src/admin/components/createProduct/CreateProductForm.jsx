import { useState, useEffect, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

// import "./CreateProductForm.css";
import { useDispatch, useSelector } from "react-redux";
// import { createProduct } from "../../../redux/customers/product/Action";

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
  // const [productData, setProductData] = useState({
  //     imageUrl: "",
  //     brand: "",
  //     title: "",
  //     color: "",
  //     discountedPrice: "",
  //     price: "",
  //     discountPersent: "",
  //     size: initialSizes,
  //     quantity: "",
  //     topLavelCategory: "",
  //     secondLavelCategory: "",
  //     thirdLavelCategory: "",
  //     description: "",
  // });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [alertOpen, setAlertOpen] = useState(false); // State for displaying alert

  // const categories = useSelector((store) => store.adminsProduct.categories);

  useEffect(() => {
    dispatch(getCategories()); // Fetch categories on component mount
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
    // category: { id: "", name: "" },
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

  // const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setProductData((prevState) => ({
  //         ...prevState,
  //         [name]: value,
  //     }));
  // };

  // const handleSizeChange = (e, index) => {
  //     let { name, value } = e.target;
  //     name === "size_quantity" ? (name = "quantity") : (name = e.target.name);

  //     const sizes = [...productData.size];
  //     sizes[index][name] = value;
  //     setProductData((prevState) => ({
  //         ...prevState,
  //         size: sizes,
  //     }));
  // };

  // const handleAddSize = () => {
  //     const sizes = [...productData.size];
  //     sizes.push({ name: "", quantity: "" });
  //     setProductData((prevState) => ({
  //         ...prevState,
  //         size: sizes,
  //     }));
  // };

  // const handleRemoveSize = (index) => {
  //   const sizes = [...productData.size];
  //   sizes.splice(index, 1);
  //   setProductData((prevState) => ({
  //     ...prevState,
  //     size: sizes,
  //   }));
  // };

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
        // Handle error state or display error message
      });
    console.log(productData);
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
      <form
        onSubmit={handleSubmit}
        className="px-20 py-0 min-h-screen"
      >
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

          {/* {productData.size.map((size, index) => (
                        <Grid container item spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Size Name"
                                    name="name"
                                    value={size.name}
                                    onChange={(event) =>
                                        handleSizeChange(event, index)
                                    }
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Quantity"
                                    name="size_quantity"
                                    type="number"
                                    onChange={(event) =>
                                        handleSizeChange(event, index)
                                    }
                                    required
                                    fullWidth
                                />
                            </Grid>{" "}
                        </Grid>
                    ))} */}
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
            {/* <Button
              variant="contained"
              sx={{ p: 1.8 }}
              className="py-20 ml-10"
              size="large"
              onClick={()=>handleAddProducts(dressPage1)}
            >
              Add Products By Loop
            </Button> */}
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
