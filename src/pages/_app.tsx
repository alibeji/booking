import "react-calendar/dist/Calendar.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "../components/Layout/Layout";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
