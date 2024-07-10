// ** MUI Imports
import Grid from "@mui/material/Grid";
import AdminPannel from "../../styles/AdminPanelWrapper";
import Achivement from "../tables/Achievement";
import MonthlyOverview from "../tables/MonthlyOverview";
import WeeklyOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import CardStatsVertical from "../../styles/CardStatusVertical";
import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme } from "../theme/CustomTheme";
import RecentlyAddeddProducts from "../tables/RecentlyAddedProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";
import { BriefcaseVariantOutline, CurrencyUsd, HelpCircleOutline, Poll } from "mdi-material-ui";

const Dashboard = () => {
  return (
    <div className="!bg-[rgb(0,_0,_22)] p-4">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Achivement />
            </Grid>
            <Grid item xs={12} md={8}>
              <MonthlyOverview />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <WeeklyOverview />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TotalEarning />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats="869.721 RSD"
                    icon={<Poll />}
                    color="success"
                    trendNumber="+22%"
                    title="Nedeljnji profit"
                    subtitle="U odnosu na 678.382 RSD prošle nedelje"
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats="6200 RSD"
                    title="Povraćaj"
                    trend="negative"
                    color="secondary"
                    trendNumber="-15%"
                    subtitle="U padu 15% prethodni mesec"
                    icon={<CurrencyUsd />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats="862"
                    trend="positive"
                    trendNumber="27%"
                    title="Nove porudžbine"
                    subtitle="U toku ove nedelje"
                    icon={<BriefcaseVariantOutline />}
                  />
                </Grid>
                <Grid item xs={6}>
                  <CardStatsVertical
                    stats="15"
                    color="warning"
                    trend="negative"
                    trendNumber="-18%"
                    subtitle="U toku prethodne nedelje"
                    title="Upiti"
                    icon={<HelpCircleOutline />}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
            <CustomersTable />
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <RecentOrders />
            </Grid>
             <Grid item xs={12} md={12} lg={8}>
              <RecentlyAddeddProducts />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <SalesOverTime/>
            </Grid>
           
            <Grid item xs={12}>
              <CustomersTable />
            </Grid>
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;
