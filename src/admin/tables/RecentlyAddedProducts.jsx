import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

const recently_added = [
  {
    id: 1,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-berries-lemon_23-2150727488.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=sph",
    title: "Borovnica Limun Torta",
    price: "2300 RSD/KG",
    category: "Svečane"
  },
  {
    id: 2,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-strawberries_23-2150797874.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Jagodica Torta",
    price: "2100 RSD/KG",
    category: "Dečije"
  },
  {
    id: 3,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-biscuits_23-2150661165.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Oreo Torta",
    price: "2800 RSD/KG",
    category: "Specijal"
  },
  {
    id: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-fruits_23-2150727744.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Šarena Mrvica Torta",
    price: "2600 RSD/KG",
    category: "Dečije"
  },
  {
    id: 5,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-flowers-stand_23-2150797814.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Lešnik List Torta",
    price: "2700 RSD/KG",
    category: "Svadbene"
  },
  {
    id: 6,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-chocolate-cake-with-flowers_23-2150727568.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Čokoladna Jagoda Torta",
    price: "200 RSD/KG",
    category: "Svadbene"
  },
];

const RecentlyAddeddProducts = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title="Nedavno dodati proizvodi"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/products")}
            variant="caption"
            sx={{
              color: "primary.main",
              cursor: "pointer",
              paddingRight: ".8rem",
            }}
          >
            Vidi sve
          </Typography>
        }
        titleTypographyProps={{
          variant: "h5",
          sx: {
            lineHeight: "1.6 !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Slika</TableCell>
              <TableCell>Naslov</TableCell>
              <TableCell>Kategorija</TableCell>
              <TableCell>Cena po KG</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recently_added.slice(0, 5).map((item) => (
              <TableRow
                hover
                key={item.id}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
                <TableCell>
                  {" "}
                  <Avatar alt={item.title} src={item.imageUrl} />{" "}
                </TableCell>

                <TableCell
                  sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}
                >
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography
                      sx={{ fontWeight: 500, fontSize: "0.875rem !important" }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentlyAddeddProducts;
