import "react-calendar/dist/Calendar.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-calendar-timeline/lib/Timeline.css";
import "../styles/globals.scss";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#EC691A",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        style: {
          maxWidth: "160px",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer />
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
