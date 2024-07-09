import { useState, useEffect, Fragment } from "react";
import { Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct, getCategories } from "../../../redux/admin/product/Action";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProductForm = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    title: "",
    pricePerKilo: "",
    decorationPrice: "",
    minWeight: "",
    maxWeight: "",
    minTier: "",
    maxTier: "",
    category: { id: "", name: "" },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [alertOpen, setAlertOpen] = useState(false); // State for displaying alert

  const product = useSelector((store) => store.adminsProduct.product);
  const categories = useSelector((store) => store.adminsProduct.categories); // Assume categories are fetched and stored here

  useEffect(() => {
    dispatch(getProductById(productId));
    dispatch(getCategories()); // Fetch categories on component mount
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setProductData({
        imageUrl: product.imageUrl || "",
        title: product.title || "",
        pricePerKilo: product.pricePerKilo || "",
        decorationPrice: product.decorationPrice || "",
        minWeight: product.minWeight || "",
        maxWeight: product.maxWeight || "",
        minTier: product.minTier || "",
        maxTier: product.maxTier || "",
        category: product.category || { id: "", name: "" }, // Ensure category is an object
      });
    }
  }, [product]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "category") {
  //     const selectedCategory = categories.find((cat) => cat.id === parseInt(value));
  //     setProductData((prevState) => ({
  //       ...prevState,
  //       category: selectedCategory || { id: "", name: "" },
  //     }));
  //   } else {
  //     setProductData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Selected category id:", value); // Dodajemo console.log ovde
    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat.id === parseInt(value));
      setProductData((prevState) => ({
        ...prevState,
        category: selectedCategory || { id: "", name: "" },
      }));
    } else {
      setProductData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedProduct = { ...productData,
  //     categoryId: productData.category.id, // Dodajte categoryId ovde
  //   productId: parseInt(productId)
  //     //  productId
      
  //     };
  //     console.log(updatedProduct.categoryId);
  //   dispatch(updateProduct(updatedProduct));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...productData,
      categoryId: productData.category.id,
      productId: parseInt(productId)
    };
    dispatch(updateProduct(updatedProduct))
      .then(() => {
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
          navigate("/admin/products"); // Preusmeravanje na /products putanju
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Handle error state or display error message
      });
  };

  return (
    <div className="px-20 py-0">
      <Typography variant="h3" sx={{ textAlign: "center", color: 'white.main' }} className="py-10 text-center">
        Izmeni proizvod
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
                value={productData.category.id}
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
              sx={{ p: 1.8, color: 'white.main' }}
              size="large"
              type="submit"
            >
              Izmeni proizvod
            </Button>
          </Grid>
        </Grid>
        <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="success">
          Proizvod je uspešno izmenjen!
        </Alert>
      </Snackbar>
      </form>
    </div>
  );
};

export default UpdateProductForm;
