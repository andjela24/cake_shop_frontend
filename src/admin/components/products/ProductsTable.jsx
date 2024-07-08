import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  findProducts,
} from "../../../redux/customers/product/Action";
import {
  getProducts,
  productsPagable,
} from "../../../redux/admin/product/Action";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const searchParams = new URLSearchParams(location.search);

  // const { adminsProduct } = useSelector((store) => store);
  // const adminsProduct = useSelector((store) => store.adminsProduct);
  const products = useSelector((store) => store.adminsProduct.products);
  // const [filterValue, setFilterValue] = useState({
  //   category: "",
  //   sort: "",
  // });
  // const categoryValue = searchParams.get("category");
  // const minWeightValue = searchParams.get("minWeight");
  // const maxWeightValue = searchParams.get("maxWeight");
  // const minTierValue = searchParams.get("minTier");
  // const maxTierValue = searchParams.get("maxTier");

  // // query
  // const category = searchParams.get("category");
  // const sort = searchParams.get("sort");
  // const page = searchParams.get("pageNumber");

  // const handlePaginationChange = (event, value) => {
  //   searchParams.set("page", value - 1);
  //   const query = searchParams.toString();
  //   navigate({ search: `?${query}` });
  // };

  // useEffect(() => {
  //   setFilterValue({ category, sort });
  //   const data = {
  //     category: category || "Dečije",
  //     minWeight: minWeightValue || 1,
  //     maxWeight: maxWeightValue || 30,
  //     minTier: minTierValue || 1,
  //     maxTier: maxTierValue || 4,
  //     sort: sort || "price_low",
  //     pageNumber: page || 0,
  //     pageSize: 10,
  //   };
  //   dispatch(productsPagable(data));
  // }, [category, sort, page, products.deleteProduct]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // const handleFilterChange = (e, sectionId) => {
  //   console.log(e.target.value, sectionId);
  //   setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
  //   searchParams.set(sectionId, e.target.value);
  //   const query = searchParams.toString();
  //   navigate({ search: `?${query}` });
  // };

  const handleDeleteProduct = (productId) => {
    console.log("delete product ", productId);
    dispatch(deleteProduct(productId));
  };

  return (
    <Box width={"100%"}>
      {/* <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Kategorija</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.category}
                label="Category"
                onChange={(e) => handleFilterChange(e, "category")}
              >
                <MenuItem value={"dečije"}>Dečije</MenuItem>
                <MenuItem value={"svadbene"}>Svadbene</MenuItem>
                <MenuItem value={"svečane"}>Svečane</MenuItem>
                <MenuItem value={"specijal"}>Specijal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Sortiraj po ceni
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterValue.sort}
                label="Sortiraj po ceni"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>Cena rastuća</MenuItem>
                <MenuItem value={"price_low"}>Cena opadajuća</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card> */}
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
                    {" "}
                    <Avatar alt={item.titel} src={item.imageUrl} />{" "}
                  </TableCell>

                  <TableCell
                    sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: "0.875rem !important",
                        }}
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.category.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.pricePerKilo}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      onClick={() =>
                        navigate(`/admin/product/update/${item.id}`)
                      }
                      variant="text"
                    >
                      Izmeni
                    </Button>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="text"
                      onClick={() => handleDeleteProduct(item.id)}
                    >
                      Obriši
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      {/* <Card className="mt-2 border">
        <Pagination
          className="py-5 border w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />

        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={products.products?.totalPages}
            color="primary"
            className=""
            onChange={handlePaginationChange}
            // value={page}
          />
        </div>
      </Card> */}
    </Box>
  );
};

export default ProductsTable;
