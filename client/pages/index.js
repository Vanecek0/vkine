import Home from './home';
import { withI18n } from '../helper/with18n';

const HomePage = ({ children, pageProps }) => {
  return (
    <>
        <Home {...pageProps}>{children}</Home>
    </>
  )
}

export const getStaticProps = withI18n()
export default HomePage;
