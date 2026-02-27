import nextI18NextConfig from "../next-i18next.config"
import "../styles/globals.css"
import Header from "../components/header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { appWithTranslation } from "next-i18next"
import Footer from "../components/footer/Footer";
import { SSRProvider } from "react-bootstrap";
import Script from "next/script";

const App = ({ Component, pageProps }) => {
  return (
      <SSRProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-BTGDVNLPHG" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BTGDVNLPHG');
          `}
        </Script>
        <div className="__next_content">
          <main className="__next_main">
            <Header />
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </SSRProvider>
  )
}

export default appWithTranslation(App, nextI18NextConfig)