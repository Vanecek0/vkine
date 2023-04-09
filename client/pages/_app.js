import nextI18NextConfig from "../next-i18next.config"
import "../styles/globals.css"
import Header from "../components/header/Header";
import { appWithTranslation } from "next-i18next"
import Footer from "../components/footer/Footer";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react"

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <SSRProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SSRProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)