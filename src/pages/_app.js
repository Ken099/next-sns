import { createGlobalStyle, ThemeProvider } from "styled-components";

import "../styles/reset.css";
import { Layout } from "../components/Layout/Layout";

const GlobalStyle = createGlobalStyle``;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
