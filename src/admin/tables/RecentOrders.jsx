import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Chip,
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

const latest_orders = [
  {
    id: 1,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-berries-lemon_23-2150727488.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=sph",
    title: "Borovnica Limun Torta",
    price: "12820 RSD",
  },
  {
    id: 2,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-strawberries_23-2150797874.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Jagodica Torta",
    price: "7400 RSD",
  },
  {
    id: 3,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-biscuits_23-2150661165.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Oreo Torta",
    price: "14560 RSD",
  },
  {
    id: 4,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-fruits_23-2150727744.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Šarena Mrvica Torta",
    price: "21700 RSD",
  },
  {
    id: 5,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-cake-with-flowers-stand_23-2150797814.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Lešnik List Torta",
    price: "18400 RSD",
  },
  {
    id: 6,
    imageUrl:
      "https://img.freepik.com/free-photo/delicious-chocolate-cake-with-flowers_23-2150727568.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_user_ai_gen",
    title: "Čokoladna Jagoda Torta",
    price: "5900 RSD",
  },
];

const RecentOrders = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title="Nedavne porudžbine"
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

              <TableCell>Cena</TableCell>
              <TableCell>Porudžbina Id</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latest_orders.slice(0, 5).map((item, index) => (
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

                <TableCell>{item.price}</TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Chip
                    sx={{ color: "white" }}
                    label="Poručeno"
                    size="small"
                    color="success"
                    className="text-white"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default RecentOrders;
