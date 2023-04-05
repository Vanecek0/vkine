import nextI18NextConfig from "../next-i18next.config"
import "../styles/globals.css"
import Header from "../components/header/Header";
import { appWithTranslation } from "next-i18next"
import Footer from "../components/footer/Footer";
import { SSRProvider } from "react-bootstrap";

const App = ({ Component, pageProps }) => {
  return (
    <SSRProvider>
      <Header />
      {/*<Component {...pageProps} />*/}
      <Footer />
    </SSRProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)