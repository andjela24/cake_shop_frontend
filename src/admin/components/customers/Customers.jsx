// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Avatar, CardHeader, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

const rows = [
  {
    name: "Milica Milić",
    email: "milica.milic@gmil.com",
    image:
      "https://img.freepik.com/free-photo/close-up-excited-person-portrait_23-2151186639.jpg?t=st=1720173686~exp=1720177286~hmac=95e507827938ce94fdb3c108edac86ce2f49aa19492c00255289faa022167281&w=1380",
  },
  {
    name: "Petar Petrović",
    email: "petar.petrovic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/confident-businessman-with-beard-smiling-camera-generated-by-ai_188544-33152.jpg?t=st=1720173845~exp=1720177445~hmac=9a0e3678d09d9c476a7fdc48f27efcb917555354db0aea890635ff37c67c91b5&w=1380",
  },
  {
    name: "Jovan Jovanović",
    email: "jovan.jovanovic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/blond-man-happy-expression_1194-2873.jpg?t=st=1720173914~exp=1720177514~hmac=2084f1e0e19c190ebbbeef373d142eb7b73af924cae407e837398918994af0e2&w=1380",
  },
  {
    name: "Isidora Isidorović",
    email: "isidora.isidorovic@gmial.com",
    image:
      "https://img.freepik.com/free-photo/front-view-lawyer-portrait_23-2151202433.jpg?t=st=1720173972~exp=1720177572~hmac=88809ef47663994c29c8482fcb3754d53dd6784590ae98d1b8e1c9b041efa837&w=1380",
  },
  {
    name: "Marijana Maeijanović",
    email: "marijana.marijanovic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/portrait-elegant-professional-businesswoman_23-2150917246.jpg?t=st=1720174078~exp=1720177678~hmac=c47ab626abce1d47d08426760f1c1b3ef6261f70ff70c43aa259bc5978a019ea&w=826",
  },
  {
    name: "Vuk Vuković",
    email: "vuk.vukovic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/male-bus-driver-posing-portrait_23-2151582415.jpg?t=st=1720513982~exp=1720517582~hmac=e875d2c9a375e7e17c84bee4f79fcc9152c92bcf92be1b83edd29e1166df3069&w=740",
  },
  {
    name: "Sima Simić",
    email: "sima.simic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/male-bus-driver-portrait_23-2151582488.jpg?t=st=1720514112~exp=1720517712~hmac=9cbb4d1357258cdecf7edf9836bfa0d26888d8758327882553fec717094e1041&w=740",
  },
  {
    name: "Iva Ivić",
    email: "iva.ivic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/international-day-education-celebration_23-2150930906.jpg?uid=R91655651&ga=GA1.1.360058317.1716372183&semt=ais_hybrid",
  },
];

const Customers = () => {
  const navigate = useNavigate();
  function handlePaginationChange(event, value) {
    console.log("Current page:", value);
  }
  return (
    <Box>
      <Card>
        <CardHeader
          title="All Customers"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id Korisnika</TableCell>
                <TableCell>Slika</TableCell>
                <TableCell>Ime i prezime</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(0, 10).map((item, index) => (
                <TableRow
                  hover
                  key={item.name}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {" "}
                    <Avatar alt={item.name} src={item.image} />{" "}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Card className="mt-2 felx justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default Customers;
