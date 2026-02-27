import { appWithTranslation } from 'next-i18next'
import nextI18NextConfig from '../next-i18next.config.js'
import "../styles/globals.css";
import Header from "../components/header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/footer/Footer";

const App = ({ Component, pageProps }) => {
  return (
      <div className="__next_content">
        <main className="__next_main">
          <Header />
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
  );
};

export default appWithTranslation(App, nextI18NextConfig);