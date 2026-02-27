import { withI18n } from "../../../helper/with18n"

const index = () => {
  return (
    <div>index</div>
  )
}

export const getStaticProps = withI18n();
export default index