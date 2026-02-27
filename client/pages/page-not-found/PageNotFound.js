import { withI18n } from "../../helper/with18n"

const PageNotFound = () => {
  return (
    <div className='PageNotFound'>
        <h1>404</h1>
        <h2>PAGE NOT FOUND</h2>
    </div>
  )
}

export const getStaticProps = withI18n();
export default PageNotFound;