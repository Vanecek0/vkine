import nextI18NextConfig from "../next-i18next.config"
import Home from './home';
import {withTranslation} from "next-i18next"
import { SSRProvider } from "react-bootstrap";

const HomePage = ({children ,pageProps }) => {
  return (
    <SSRProvider>
      {/*<Home {...pageProps}>{children}</Home>*/}
    </SSRProvider>
  )
}

export default withTranslation()(HomePage, nextI18NextConfig);
