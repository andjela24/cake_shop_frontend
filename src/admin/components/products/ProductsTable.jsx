import { Avatar, Box, Button, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Snackbar, Alert } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../redux/admin/product/Action";
import { getProducts } from "../../../redux/admin/product/Action";

const ProductsTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((store) => store.adminsProduct.products);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box width={"100%"}>
      <Card className="mt-2">
        <CardHeader
          title="Svi proizvodi"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Slika</TableCell>
                <TableCell>Naslov</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Kategorija</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Cena po KG</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Izmeni</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Obriši</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>
                    <Avatar alt={item.title} src={item.imageUrl} />
                  </TableCell>
                  <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.category.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.pricePerKilo} RSD</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => navigate(`/admin/product/update/${item.id}`)} variant="text">
                      Izmeni
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" onClick={() => handleDeleteProduct(item.id)}>
                      Obriši
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Proizvod je uspešno obrisan!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductsTable;
