// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import { Avatar, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";

const rows = [
  {
    // age: 27,
    // status: 'current',
    // date: '09/27/2018',
    name: "Milica Milić",
    // salary: '$19586.23',
    email: "milica.milic@gmil.com",
    // designation: 'Human Resources Assistant',
    image:
      "https://img.freepik.com/free-photo/close-up-excited-person-portrait_23-2151186639.jpg?t=st=1720173686~exp=1720177286~hmac=95e507827938ce94fdb3c108edac86ce2f49aa19492c00255289faa022167281&w=1380",
  },
  {
    // age: 61,
    // date: '09/23/2016',
    // salary: '$23896.35',
    // status: 'professional',
    name: "Petar Petrović",
    email: "petar.petrovic@gmail.com",
    // designation: 'Nuclear Power Engineer',
    image:
      "https://img.freepik.com/free-photo/confident-businessman-with-beard-smiling-camera-generated-by-ai_188544-33152.jpg?t=st=1720173845~exp=1720177445~hmac=9a0e3678d09d9c476a7fdc48f27efcb917555354db0aea890635ff37c67c91b5&w=1380",
  },
  {
    // age: 59,
    // date: '10/15/2017',
    name: "Jovan Jovanović",
    // status: 'rejected',
    // salary: '$18991.67',
    email: "jovan.jovanovic@gmail.com",
    // designation: 'Environmental Specialist',
    image:
      "https://img.freepik.com/free-photo/blond-man-happy-expression_1194-2873.jpg?t=st=1720173914~exp=1720177514~hmac=2084f1e0e19c190ebbbeef373d142eb7b73af924cae407e837398918994af0e2&w=1380",
  },
  {
    // age: 30,
    // date: '06/12/2018',
    // status: 'resigned',
    // salary: '$19252.12',
    name: "Isidora Isidorović",
    email: "isidora.isidorovic@gmial.com",
    // designation: 'Sales Representative',
    image:
      "https://img.freepik.com/free-photo/front-view-lawyer-portrait_23-2151202433.jpg?t=st=1720173972~exp=1720177572~hmac=88809ef47663994c29c8482fcb3754d53dd6784590ae98d1b8e1c9b041efa837&w=1380",
  },
  {
    // age: 66,
    // status: 'applied',
    // date: '03/24/2018',
    // salary: '$13076.28',
    name: "Marijana Maeijanović",
    // designation: 'Operator',
    email: "marijana.marijanovic@gmail.com",
    image:
      "https://img.freepik.com/free-photo/portrait-elegant-professional-businesswoman_23-2150917246.jpg?t=st=1720174078~exp=1720177678~hmac=c47ab626abce1d47d08426760f1c1b3ef6261f70ff70c43aa259bc5978a019ea&w=826",
  },
  {
    age: 33,
    date: "08/25/2017",
    salary: "$10909.52",
    name: "Adeline Day",
    status: "professional",
    email: "hnisius4@gnu.org",
    designation: "Senior Cost Accountant",
  },
  {
    age: 61,
    status: "current",
    date: "06/01/2017",
    salary: "$17803.80",
    name: "Lora Jackson",
    designation: "Geologist",
    email: "ghoneywood5@narod.ru",
  },
  {
    age: 22,
    date: "12/03/2017",
    salary: "$12336.17",
    name: "Rodney Sharp",
    status: "professional",
    designation: "Cost Accountant",
    email: "dcrossman3@google.co.jp",
  },
];

const statusObj = {
  applied: { color: "info" },
  rejected: { color: "error" },
  current: { color: "primary" },
  resigned: { color: "warning" },
  professional: { color: "success" },
};

const CustomersTable = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader
        title="Novi korisnici"
        sx={{
          pt: 2,
          alignItems: "center",
          "& .MuiCardHeader-action": { mt: 0.6 },
        }}
        action={
          <Typography
            onClick={() => navigate("/admin/customers")}
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
        <Table sx={{ minWidth: 390 }} aria-label="table in dashboard">
          <TableHead>
            <TableRow>
              <TableCell>Profilna</TableCell>
              <TableCell>Ime</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 5).map((item) => (
              <TableRow
                hover
                key={item.name}
                sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
              >
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
  );
};

export default CustomersTable;
